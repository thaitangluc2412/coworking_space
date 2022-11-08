package com.coworkingspace.backend.controller;

import com.coworkingspace.backend.dto.RoomCreateDto;
import com.coworkingspace.backend.dto.RoomListDto;
import com.coworkingspace.backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {

	@Autowired
	private RoomService roomService;

	@PostMapping
	public ResponseEntity<RoomCreateDto> createRoom(@RequestPart RoomCreateDto roomCreateDto,
	                                                  @RequestPart("files") MultipartFile[] files) {
		roomService.createRoom(roomCreateDto, files);
		return new ResponseEntity<>(roomCreateDto, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<RoomCreateDto>> getAllRoom() {
		List<RoomCreateDto> rooms = roomService.getAll();
		return new ResponseEntity<>(rooms, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<RoomCreateDto> updateRoom(@PathVariable String id,
	                                                      @RequestPart RoomCreateDto roomCreateDto,
	                                                      @RequestPart("files") MultipartFile[] files) throws NotFoundException {
		RoomCreateDto roomCreateDto1 = roomService.updateRoom(id, roomCreateDto, files);
		return ResponseEntity.status(HttpStatus.OK).body(roomCreateDto1);
	}

	@GetMapping("/roomType/{id}")
	public ResponseEntity<List<RoomListDto>> getByRoomTypeId(@PathVariable String id) {
		List<RoomListDto> rooms = roomService.getByRoomTypeId(id);
		return new ResponseEntity<>(rooms, HttpStatus.OK);
	}
}
