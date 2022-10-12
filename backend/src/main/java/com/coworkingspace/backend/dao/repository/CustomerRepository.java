package com.coworkingspace.backend.dao.repository;

import com.coworkingspace.backend.dao.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	Optional<Customer> findByEmail(String email);
}
