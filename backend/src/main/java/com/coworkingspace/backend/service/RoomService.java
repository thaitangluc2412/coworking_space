package com.coworkingspace.backend.service;

import com.coworkingspace.backend.dto.RoomCreateDto;
import org.springframework.web.multipart.MultipartFile;

public interface RoomService {
	void createRoom(RoomCreateDto roomCreateDto,  MultipartFile[] files);
}
