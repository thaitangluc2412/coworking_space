package com.coworkingspace.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coworkingspace.backend.dao.repository.ReviewRepository;
import com.coworkingspace.backend.dto.ReviewDto;
import com.coworkingspace.backend.mapper.ReviewMapper;
import com.coworkingspace.backend.service.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;

	@Autowired
	private ReviewMapper reviewMapper;

	@Override public ReviewDto createReview(ReviewDto reviewDto) {
		reviewRepository.save(reviewMapper.reviewDtoToReview(reviewDto));
		return reviewDto;
	}

	@Override public List<ReviewDto> findByRoomId(String roomId) {
		return reviewRepository.findByRoomId(roomId).stream().map(review -> reviewMapper.reviewToReviewDto(review)).collect(Collectors.toList());
	}
}
