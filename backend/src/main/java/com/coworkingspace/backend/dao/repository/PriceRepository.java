package com.coworkingspace.backend.dao.repository;

import com.coworkingspace.backend.dao.entity.Price;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepository extends JpaRepository<Price, String> {
}
