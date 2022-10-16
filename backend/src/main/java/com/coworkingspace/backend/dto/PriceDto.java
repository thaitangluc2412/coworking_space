package com.coworkingspace.backend.dto;

import lombok.*;

import javax.persistence.Column;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class PriceDto {
	private String id;
	private Double dayPrice;
	private Double monthPrice;
	private Double yearPrice;
}
