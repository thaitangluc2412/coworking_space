package com.coworkingspace.backend.service;

import com.coworkingspace.backend.dto.ReservationDto;
import com.coworkingspace.backend.sdo.DateStatus;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface ReservationService {
	ReservationDto createReservation(ReservationDto reservationDto);
	String getFurthestValidDate(String roomId, String from) throws NotFoundException;

	List<DateStatus> getDateStatus(String roomId, int month, int year) throws NotFoundException;
}
