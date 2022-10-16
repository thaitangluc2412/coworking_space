package com.coworkingspace.backend.dto;

import com.coworkingspace.backend.dao.entity.Customer;
import com.coworkingspace.backend.dao.entity.ImageStorage;
import com.coworkingspace.backend.dao.entity.Price;
import com.coworkingspace.backend.dao.entity.RoomStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class RoomDto {
	private String id;
	private String customerId;
	private String priceId;
	private String roomStatusId;
	private String imageStorageId = "8f6gnEUDqrxvFDS";
	private String roomName;
	private String size;
	private String capacity;
	private String description;
	private List<ImageDto> images;
}