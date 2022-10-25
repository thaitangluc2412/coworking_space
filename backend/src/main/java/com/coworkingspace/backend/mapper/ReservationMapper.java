package com.coworkingspace.backend.mapper;

import com.coworkingspace.backend.dao.entity.Reservation;
import com.coworkingspace.backend.dto.ReservationDto;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ReservationMapper {

	@Mapping(source = "roomId", target = "room.id")
	@Mapping(source = "customerId", target = "customer.id")
	@Mapping(source = "reservationStatusId", target = "reservationStatus.id")
	@Mapping(source = "startDate", target = "startDate", dateFormat = "yyyy-MM-dd HH:mm")
	@Mapping(source = "endDate", target = "endDate", dateFormat = "yyyy-MM-dd HH:mm")
	Reservation reservationDtoToReservation(ReservationDto reservationDto);

	@InheritInverseConfiguration(name = "reservationDtoToReservation")
	ReservationDto reservationToReservationDto(Reservation reservation);
}
