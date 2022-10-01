package com.coworkingspace.backend.mapper;

import com.coworkingspace.backend.dao.entity.Customer;
import com.coworkingspace.backend.dto.CustomerDto;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface CustomerMapper {

	// @Mapping(source = "roleId", target = "role.roleId")
	Customer customerDtoToCustomer(CustomerDto customerDto);

	@InheritInverseConfiguration(name = "customerDtoToCustomer")
	CustomerDto customerToCustomerDto(Customer customer);
}
