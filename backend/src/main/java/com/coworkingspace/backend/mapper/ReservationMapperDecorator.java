package com.coworkingspace.backend.mapper;

import com.coworkingspace.backend.dao.entity.Reservation;
import com.coworkingspace.backend.dto.ReservationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public abstract class ReservationMapperDecorator implements ReservationMapper{
	@Autowired
	@Qualifier("delegate")
	private ReservationMapper delegate;

	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	@Override
	public Reservation reservationDtoToReservation(ReservationDto reservationDto){
		Reservation reservation = delegate.reservationDtoToReservation(reservationDto);
		return reservation;
	}
}
