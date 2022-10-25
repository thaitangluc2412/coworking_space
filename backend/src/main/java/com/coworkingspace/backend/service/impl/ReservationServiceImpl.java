package com.coworkingspace.backend.service.impl;

import com.coworkingspace.backend.dao.entity.Reservation;
import com.coworkingspace.backend.dao.hibernate.ReservationDao;
import com.coworkingspace.backend.dao.repository.ReservationRepository;
import com.coworkingspace.backend.dto.ReservationDto;
import com.coworkingspace.backend.mapper.ReservationMapper;
import com.coworkingspace.backend.sdo.DateStatus;
import com.coworkingspace.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	private ReservationMapper reservationMapper;

	@Autowired
	private ReservationDao reservationDao;

	@Override
	public ReservationDto createReservation(ReservationDto reservationDto) {
		Reservation reservation = reservationMapper.reservationDtoToReservation(reservationDto);
		reservationRepository.save(reservationMapper.reservationDtoToReservation(reservationDto));
		return reservationMapper.reservationToReservationDto(reservation);
	}

	@Override
	public String getFurthestValidDate(String roomId, String from) throws NotFoundException {
		return reservationDao.getFurthestValidDate(roomId, from);
	}

	@Override
	public List<DateStatus> getDateStatus(String roomId, int month, int year) throws NotFoundException {
		return reservationDao.getDateStatus(roomId, month, year);
	}
}
