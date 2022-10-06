package com.coworkingspace.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponseDto {
	private String id;
	private String customerName;
	private String email;
	private String phoneNumber;
	private String roleId;
}
