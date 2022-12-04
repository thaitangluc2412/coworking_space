package com.coworkingspace.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coworkingspace.backend.dao.entity.RoomStatus;
import com.coworkingspace.backend.dto.ReviewDto;
import com.coworkingspace.backend.service.ReviewService;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;

	@PostMapping
	public ResponseEntity<ReviewDto> createReview(ReviewDto reviewDto) {
		reviewService.createReview(reviewDto);
		return new ResponseEntity<>(reviewDto, HttpStatus.OK);
	}

	@GetMapping("/rooms/{id}")
	public ResponseEntity<List<ReviewDto>> getByRoomId(String roomId){
		List<ReviewDto> reviewDtos = reviewService.findByRoomId(roomId);
		return new ResponseEntity<>(reviewDtos, HttpStatus.OK);
	}
}
