package com.coworkingspace.backend.dao.repository;

import java.util.List;

import com.coworkingspace.backend.dao.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {
	List<Reservation> getByCustomerIdOrderByTimeCreateDesc(String id);
	Reservation getById(String id);
}
