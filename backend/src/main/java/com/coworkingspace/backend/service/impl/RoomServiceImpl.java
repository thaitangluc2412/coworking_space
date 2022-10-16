package com.coworkingspace.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.coworkingspace.backend.common.utils.PathUtils;
import com.coworkingspace.backend.configuration.CloudinaryConfig;
import com.coworkingspace.backend.dao.entity.Room;
import com.coworkingspace.backend.dao.repository.RoomRepository;
import com.coworkingspace.backend.dto.ImageDto;
import com.coworkingspace.backend.dto.RoomCreateDto;
import com.coworkingspace.backend.mapper.RoomMapper;
import com.coworkingspace.backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class RoomServiceImpl implements RoomService {
	private final String FOLDER_PATH = "rooms";

	private Cloudinary cloudinary;

	private CloudinaryConfig cloudinaryConfig;
	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private RoomMapper roomMapper;

	@Transactional
	@Override
	public void createRoom(RoomCreateDto roomCreateDto, MultipartFile[] files) {
		try {
			List<ImageDto> imageDtos = new ArrayList<>();
			imageDtos.addAll(saveImage(files));
			roomCreateDto.setImages(imageDtos);
			Room room = roomMapper.roomCreateDtoToRoom(roomCreateDto);
			roomRepository.save(room);
		} catch (Exception e) {
			e.printStackTrace();
		}
		Room room = roomMapper.roomCreateDtoToRoom(roomCreateDto);
		roomRepository.save(room);
	}

	private List<ImageDto> saveImage(MultipartFile[] files) {
		final LocalDateTime now = LocalDateTime.now();
		final String path = String.format("%s/%s", FOLDER_PATH, now.getNano());
		final String folderPath = PathUtils.decoratePath(path);

		int[] idx = new int[1];
		idx[0] = 0;
		List<ImageDto> imageDtos = new ArrayList<>();
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
