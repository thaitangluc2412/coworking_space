package com.coworkingspace.backend.service.impl;

import com.coworkingspace.backend.dao.entity.Customer;
import com.coworkingspace.backend.dao.repository.CustomerRepository;
import com.coworkingspace.backend.dto.CustomerDto;
import com.coworkingspace.backend.mapper.CustomerMapper;
import com.coworkingspace.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private CustomerMapper customerMapper;

	@Override
	public void createCustomer(CustomerDto customerDto) {
		Customer customer = customerMapper.customerDtoToCustomer(customerDto);
		customerRepository.save(customer);
	}
}
