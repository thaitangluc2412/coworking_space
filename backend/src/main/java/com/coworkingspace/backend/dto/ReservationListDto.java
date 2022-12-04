package com.coworkingspace.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationListDto {
	private String id;
	private String reservationStatusName;
	private String customerName;
	private String email;
	private String phoneNumber;
	private String roomId;
	private String roomName;
	private Double total;
	private String startDate;
	private String endDate;
	private List<ImageDto> images;
}
