package com.coworkingspace.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class RoomCreateDto {
	private String id;
	private String customerId;
	private String priceId;
	private Double dayPrice;
	private Double monthPrice;
	private Double yearPrice;
	private String roomStatusId;
	private String roomTypeId;
	private String imageStorageId;
	private String roomName;
	private String address;
	private String city;
	private String size;
	private String capacity;
	private String description;
	private List<ImageDto> images;
	private LocalDateTime timeCreate;
	private LocalDateTime timeUpdate;
}
