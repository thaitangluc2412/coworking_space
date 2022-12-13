package com.coworkingspace.backend.controller;

import com.coworkingspace.backend.dto.CustomerDto;
import com.coworkingspace.backend.dto.CustomerResponseDto;
import com.coworkingspace.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	@PostMapping
	public ResponseEntity<Void> createCustomer(@RequestBody CustomerDto customerDto) {
		customerService.createCustomer(customerDto);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	// @PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping
	public ResponseEntity<List<CustomerResponseDto>> getAllCustomer() {
		List<CustomerResponseDto> customerResponseDtos = customerService.getAllCustomers();
		return new ResponseEntity<>(customerResponseDtos, HttpStatus.OK);
	}
	@GetMapping("/me")
	public ResponseEntity<CustomerResponseDto> getCurrentUser(HttpServletRequest request) {
		CustomerResponseDto customerResponseDto = customerService.getCurrentUser(request);
		return ResponseEntity.status(HttpStatus.OK).body(customerResponseDto);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Void> updateCustomer(@RequestBody CustomerDto customerDto){
		customerService.updateCustomer(customerDto);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	// Get total customer for admin page
	@GetMapping("/total")
	public ResponseEntity<?> getTotalCustomer() {
		int total = customerService.getTotalCustomer();
		return ResponseEntity.ok(total);
	}
}
