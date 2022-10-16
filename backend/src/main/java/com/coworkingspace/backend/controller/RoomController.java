package com.coworkingspace.backend.controller;

import com.coworkingspace.backend.dto.LoginRequestDto;
import com.coworkingspace.backend.dto.LoginResponseDto;
import com.coworkingspace.backend.dto.RoomCreateDto;
import com.coworkingspace.backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {

	@Autowired
	private RoomService roomService;

	@PostMapping
	public ResponseEntity<?> authenticate(@RequestBody RoomCreateDto roomCreateDto, @RequestPart("files") MultipartFile[] files) {
		roomService.createRoom(roomCreateDto, files);
		return new ResponseEntity<>("Success", HttpStatus.OK);
	}
}
