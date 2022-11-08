package com.coworkingspace.backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class RoomListDto {
	private String id;
	private Double dayPrice;
	private String roomTypeName;
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
