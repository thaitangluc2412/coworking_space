package com.coworkingspace.backend.dao.repository;

import com.coworkingspace.backend.dao.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
