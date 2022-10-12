package com.coworkingspace.backend.controller;

import com.coworkingspace.backend.dto.CustomerDto;
import com.coworkingspace.backend.dto.CustomerResponseDto;
import com.coworkingspace.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	@PostMapping
	public ResponseEntity<Void> createCustomer(@RequestBody CustomerDto customerDto) {
		System.out.println("customerDto: " + customerDto.getCustomerName());
		customerService.createCustomer(customerDto);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	// @PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping
	public ResponseEntity<List<CustomerResponseDto>> getAllCustomer() {
		List<CustomerResponseDto> customerResponseDtos = customerService.getAllCustomers();
		return new ResponseEntity<>(customerResponseDtos, HttpStatus.OK);
	}
}
