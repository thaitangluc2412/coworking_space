package com.coworkingspace.backend.service;

import com.coworkingspace.backend.dto.CustomerDto;
import com.coworkingspace.backend.dto.CustomerResponseDto;

import java.util.List;

public interface CustomerService {
	void createCustomer(CustomerDto customerDto);

	List<CustomerResponseDto> getAllCustomers();
}
