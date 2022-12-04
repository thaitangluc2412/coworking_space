package com.coworkingspace.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.coworkingspace.backend.dao.entity.Review;
import com.coworkingspace.backend.dto.ReviewDto;

@Mapper
public interface ReviewMapper {

	@Mapping(source = "customerId", target = "customer.id")
	@Mapping(source = "roomId", target = "room.id")
	Review reviewDtoToReview(ReviewDto reviewDto);

	ReviewDto reviewToReviewDto(Review review);
}
