package com.coworkingspace.backend.service;

import com.coworkingspace.backend.dto.CustomerDto;
import com.coworkingspace.backend.dto.CustomerResponseDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface CustomerService {
	void createCustomer(CustomerDto customerDto);
	List<CustomerResponseDto> getAllCustomers();
	CustomerResponseDto getCurrentUser(HttpServletRequest request);
	void updateCustomer(CustomerDto customerDto);
	int getTotalCustomer();
}
