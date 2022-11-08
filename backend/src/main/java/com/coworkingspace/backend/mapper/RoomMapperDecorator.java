package com.coworkingspace.backend.mapper;

import com.coworkingspace.backend.common.utils.ImageStorageUtils;
import com.coworkingspace.backend.common.utils.PriceUtils;
import com.coworkingspace.backend.dao.entity.ImageStorage;
import com.coworkingspace.backend.dao.entity.Price;
import com.coworkingspace.backend.dao.entity.Room;
import com.coworkingspace.backend.dao.repository.ImageRepository;
import com.coworkingspace.backend.dto.ImageDto;
import com.coworkingspace.backend.dto.PriceDto;
import com.coworkingspace.backend.dto.RoomCreateDto;
import com.coworkingspace.backend.dto.RoomListDto;
import com.coworkingspace.backend.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import java.util.List;

public abstract class RoomMapperDecorator implements RoomMapper {
	@Autowired
	@Qualifier("delegate")
	private RoomMapper delegate;

	@Autowired
	private ImageMapper imageMapper;

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private PriceMapper priceMapper;

	@Autowired
	private PriceService priceService;

	@Override
	public Room roomCreateDtoToRoom(RoomCreateDto roomCreateDto) throws NotFoundException {
		Room room = delegate.roomCreateDtoToRoom(roomCreateDto);
		Price price = PriceUtils.createOrUpdatePrice(
				room.getPrice(),
				new PriceDto(
						roomCreateDto.getId(),
						roomCreateDto.getDayPrice(),
						roomCreateDto.getMonthPrice(),
						roomCreateDto.getYearPrice()
				)
		);

		room.setPrice(price);
		ImageStorage imageStorage = ImageStorageUtils.createOrUpdateImageStorageWithImages(
				room.getImageStorage(),
				roomCreateDto.getImages(),
				imageMapper
		);
		room.setImageStorage(imageStorage);

		return room;
	}

	@Override
	public RoomCreateDto roomToRoomCreateDto(Room room) throws NotFoundException {
		RoomCreateDto roomCreateDto = delegate.roomToRoomCreateDto(room);

		List<ImageDto> imageDtos = ImageStorageUtils.getImageDtos(
				imageRepository,
				roomCreateDto.getImageStorageId(),
				imageMapper
		);
		roomCreateDto.setImages(imageDtos);
		roomCreateDto.setDayPrice(room.getPrice().getDayPrice());
		roomCreateDto.setMonthPrice(room.getPrice().getMonthPrice());
		roomCreateDto.setYearPrice(room.getPrice().getYearPrice());
		return roomCreateDto;
	}

	@Override
	public RoomListDto roomToRoomListDto(Room room){
		RoomListDto roomListDto = delegate.roomToRoomListDto(room);
		List<ImageDto> imageDtos = ImageStorageUtils.getImageDtos(
				imageRepository,
				room.getImageStorage().getId(),
				imageMapper
		);
		roomListDto.setImages(imageDtos);

		return roomListDto;
	}
}
