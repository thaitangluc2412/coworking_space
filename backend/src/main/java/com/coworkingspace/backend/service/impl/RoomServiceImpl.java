package com.coworkingspace.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.coworkingspace.backend.common.utils.PathUtils;
import com.coworkingspace.backend.configuration.CloudinaryConfig;
import com.coworkingspace.backend.dao.entity.Image;
import com.coworkingspace.backend.dao.entity.ImageStorage;
import com.coworkingspace.backend.dao.entity.Room;
import com.coworkingspace.backend.dao.hibernate.RoomDao;
import com.coworkingspace.backend.dao.repository.RoomRepository;
import com.coworkingspace.backend.dto.ImageDto;
import com.coworkingspace.backend.dto.RoomCreateDto;
import com.coworkingspace.backend.dto.RoomListDto;
import com.coworkingspace.backend.mapper.ImageMapper;
import com.coworkingspace.backend.mapper.RoomMapper;
import com.coworkingspace.backend.service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class RoomServiceImpl implements RoomService {
	private final String FOLDER_PATH = "rooms";
	private Cloudinary cloudinary;
	private CloudinaryConfig cloudinaryConfig;
	private RoomRepository roomRepository;
	private RoomMapper roomMapper;
	private ImageMapper imageMapper;
	private RoomDao roomDao;

	@Transactional
	@Override
	public void createRoom(RoomCreateDto roomCreateDto, MultipartFile[] files) {
		try {
			List<ImageDto> imageDtos = new ArrayList<>();
			imageDtos.addAll(saveImage(files));
			Thread thread = new Thread(() -> {
				roomCreateDto.setImages(imageDtos);
				Room room = null;
				try {
					room = roomMapper.roomCreateDtoToRoom(roomCreateDto);
				} catch (NotFoundException e) {
					throw new RuntimeException(e);
				}
				roomRepository.save(room);
			});
			thread.start();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<RoomCreateDto> getAll() {
		return roomRepository.findAll()
				.stream()
				.map(room -> {
					try {
						return roomMapper.roomToRoomCreateDto(room);
					} catch (NotFoundException e) {
						throw new RuntimeException(e);
					}
				})
				.collect(
						Collectors.toList());
	}

	@Override
	public Room findById(String id){
		return roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found room"));
	}

	@Override
	public RoomListDto findByRoomId(String id) {
		return roomMapper.roomToRoomListDto(findById(id));
	}

	@Override
	public List<RoomListDto> findByCustomerId(String id) {
		return roomRepository.getByCustomerIdAndEnableIsTrue(id).stream().map(room -> roomMapper.roomToRoomListDto(room)).collect(Collectors.toList());
	}

	@Override
	public void deleteRoom(String id){
		Room room = findById(id);
		room.setEnable(false);
		roomRepository.save(room);
	}

	@Override
	public RoomCreateDto updateRoom(String id,
	                                RoomCreateDto roomCreateDto,
	                                MultipartFile[] files) throws NotFoundException {
		Room room = findById(id);
		roomCreateDto.setId(id);
		boolean needUpdate = files != null;
		if (needUpdate) {
			deleteFolderCloudinary(room);
			List<ImageDto> imageDtos = new ArrayList<>();
			imageDtos.addAll(saveImage(files));
			roomCreateDto.setImages(imageDtos);
		} else {
			roomCreateDto.setImages(room.getImageStorage()
					                        .getImages()
					                        .parallelStream()
					                        .map(en -> imageMapper.imageToImageDto(en))
					                        .collect(
							                        Collectors.toList()));
		}
		roomCreateDto.setImageStorageId(room.getImageStorage().getId());
		roomRepository.save(roomMapper.roomCreateDtoToRoom(roomCreateDto));
		return roomCreateDto;
	}

	@Override
	public List<RoomListDto> getWithFilter(String typeRoomId, String provinceId, String roomName, String cityName, String minPrice, String maxPrice) {
		return roomDao.getWithFilter(typeRoomId, provinceId, roomName, cityName, minPrice, maxPrice).stream().map(room -> roomMapper.roomToRoomListDto(room)).collect(Collectors.toList());
	}

	public void deleteFolderCloudinary(Room room) {
		if (room.getImageStorage() != null) {
			ImageStorage imageStorage = room.getImageStorage();
			if (imageStorage.getImages() != null) {
				List<Image> images = imageStorage.getImages();
				if (images.size() > 0) {
					String folderPath = PathUtils.getParentFolder(images.get(0).getUrl());
					try {
						System.out.println("folder Path : " + folderPath);
						cloudinary.api().deleteResourcesByPrefix(folderPath, Map.of());
						cloudinary.api().deleteFolder(folderPath, Map.of());
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

	private List<ImageDto> saveImage(MultipartFile[] files) {
		UUID uuid = UUID.randomUUID();
		String uuidAsString = uuid.toString();
		final String path = String.format("%s/%s", FOLDER_PATH, uuidAsString);
		final String folderPath = PathUtils.decoratePath(path);
		int[] idx = new int[1];
		idx[0] = 0;
		List<ImageDto> imageDtos = new ArrayList<>();
		if (files == null) { return Collections.emptyList(); }
		Arrays.asList(files).stream().forEach(file -> {
			String fileName = "image_" + idx[0];
			try {
				Map ret = cloudinary.uploader()
						.upload(
								file.getBytes(),
								ObjectUtils.asMap(
										"folder",
										cloudinaryConfig.getCloudPath() + folderPath,
										"public_id",
										fileName
								)
						);
				imageDtos.add(new ImageDto(null, ret.get("url").toString(), fileName));
				++idx[0];
			} catch (Exception e) {
				e.printStackTrace();
			}
		});
		return imageDtos;
	}
}
