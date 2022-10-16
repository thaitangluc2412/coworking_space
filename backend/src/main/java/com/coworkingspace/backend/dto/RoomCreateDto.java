package com.coworkingspace.backend.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class RoomCreateDto {
	private String id;
	private String customerId;
	private String dayPrice;
	private String monthPrice;
	private String yearPrice;
	private String roomStatusId;
	private String imageStorageId = "8f6gnEUDqrxvFDS";
	private String roomName;
	private String size;
	private String capacity;
	private String description;
	private List<ImageDto> images;
}
