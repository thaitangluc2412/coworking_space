package com.coworkingspace.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
	private Integer customerId;
	private String customerName;
	private String email;
	private String password;
	private String phoneNumber;
	private Integer roleId;
}
