package com.coworkingspace.backend.mapper;

import com.coworkingspace.backend.dao.entity.Room;
import com.coworkingspace.backend.dto.RoomCreateDto;
import com.coworkingspace.backend.dto.RoomDto;
import org.mapstruct.DecoratedWith;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

@Mapper
@DecoratedWith(RoomMapperDecorator.class)
public interface RoomMapper {

	@Mapping(source = "customerId", target = "customer.id")
	@Mapping(source = "priceId", target = "price.id")
	@Mapping(source = "roomStatusId", target = "roomStatus.id")
	@Mapping(source = "imageStorageId", target = "imageStorage.id")
	Room roomDtoToRoom(RoomDto roomDto);

	@InheritInverseConfiguration(name = "roomDtoToRoom")
	RoomDto roomToRoomDto(Room room);

	@Mapping(source = "customerId", target = "customer.id")
	@Mapping(source = "priceId", target = "price.id")
	@Mapping(source = "roomStatusId", target = "roomStatus.id")
	@Mapping(source = "imageStorageId", target = "imageStorage.id")
	Room roomCreateDtoToRoom(RoomCreateDto roomCreateDto) throws NotFoundException;

	@InheritInverseConfiguration(name = "roomCreateDtoToRoom")
	RoomCreateDto roomToRoomCreateDto(Room room) throws NotFoundException;
}
