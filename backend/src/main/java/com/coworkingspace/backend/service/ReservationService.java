package com.coworkingspace.backend.service;

import com.coworkingspace.backend.dto.ReservationDto;
import com.coworkingspace.backend.sdo.DateStatus;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import java.time.LocalDate;
import java.util.List;

public interface ReservationService {
	ReservationDto createReservation(ReservationDto reservationDto) throws NotFoundException;
	String getFurthestValidDate(String roomId, String from) throws NotFoundException;
	List<DateStatus> getDateStatus(String roomId, int month, int year) throws NotFoundException;
	List<LocalDate> getAllInvalidDate(String roomId) throws NotFoundException;
}
