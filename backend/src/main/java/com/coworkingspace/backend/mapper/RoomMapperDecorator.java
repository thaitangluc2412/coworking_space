package com.coworkingspace.backend.mapper;

import com.coworkingspace.backend.dao.entity.Price;
import com.coworkingspace.backend.dao.entity.Room;
import com.coworkingspace.backend.dao.repository.ImageRepository;
import com.coworkingspace.backend.dto.RoomCreateDto;
import com.coworkingspace.backend.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

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

	@Override
	public Room roomCreateDtoToRoom(RoomCreateDto roomCreateDto){
		Price price = new Price(Double.parseDouble(roomCreateDto.getDayPrice()), Double.parseDouble(roomCreateDto.getMonthPrice()), Double.parseDouble(roomCreateDto.getYearPrice()));

		Room room = delegate.roomCreateDtoToRoom(roomCreateDto);

		room.setPrice(price);
		return room;
	}
}
