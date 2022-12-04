package com.coworkingspace.backend.service;

import java.util.List;

import com.coworkingspace.backend.dto.ReviewDto;

public interface ReviewService {
	ReviewDto createReview(ReviewDto reviewDto);
	List<ReviewDto> findByRoomId(String roomId);
}
