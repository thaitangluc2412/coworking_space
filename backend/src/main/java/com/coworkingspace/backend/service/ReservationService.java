package com.coworkingspace.backend.service;

import com.coworkingspace.backend.dto.ReservationDto;
import com.coworkingspace.backend.dto.ReservationListDto;
import com.coworkingspace.backend.sdo.DateStatus;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import java.time.LocalDate;
import java.util.List;

import javax.mail.MessagingException;

public interface ReservationService {
	ReservationDto createReservation(ReservationDto reservationDto) throws NotFoundException;
	String getFurthestValidDate(String roomId, String from) throws NotFoundException;
	List<DateStatus> getDateStatus(String roomId, int month, int year) throws NotFoundException;
	List<LocalDate> getAllInvalidDate(String roomId) throws NotFoundException;
	List<ReservationListDto> getByCustomerId(String customerId);
	ReservationListDto getById(String id);
	ReservationListDto updateReservation(String id, String reservationStatsName, String email) throws MessagingException;
	List<ReservationListDto> getBySellerId(String sellerId);
}
