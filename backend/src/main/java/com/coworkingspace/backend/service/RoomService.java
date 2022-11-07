package com.coworkingspace.backend.service;

import com.coworkingspace.backend.dao.entity.Room;
import com.coworkingspace.backend.dto.RoomCreateDto;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RoomService {
	void createRoom(RoomCreateDto roomCreateDto,  MultipartFile[] files);
	List<RoomCreateDto> getAll();
	Room findById(String id) throws NotFoundException;
	RoomCreateDto updateRoom(String id, RoomCreateDto roomCreateDto, MultipartFile[] files) throws NotFoundException;

	List<RoomCreateDto> getByRoomTypeId(String id);
}
