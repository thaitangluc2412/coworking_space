package com.coworkingspace.backend.service.impl;

import com.coworkingspace.backend.dao.entity.Customer;
import com.coworkingspace.backend.dao.entity.Reservation;
import com.coworkingspace.backend.dao.entity.ReservationStatus;
import com.coworkingspace.backend.dao.entity.Room;
import com.coworkingspace.backend.dao.hibernate.ReservationDao;
import com.coworkingspace.backend.dao.repository.CustomerRepository;
import com.coworkingspace.backend.dao.repository.ReservationRepository;
import com.coworkingspace.backend.dto.ReservationDto;
import com.coworkingspace.backend.dto.ReservationListDto;
import com.coworkingspace.backend.mapper.ReservationMapper;
import com.coworkingspace.backend.sdo.DateStatus;
import com.coworkingspace.backend.service.EmailService;
import com.coworkingspace.backend.service.ReservationService;
import com.coworkingspace.backend.service.ReservationStatusService;
import com.coworkingspace.backend.service.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

@Service
public class ReservationServiceImpl implements ReservationService {

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	private ReservationMapper reservationMapper;
	@Autowired
	private ReservationDao reservationDao;
	@Autowired
	private ReservationStatusService reservationStatusService;
	@Autowired
	private RoomService roomService;
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private EmailService emailService;

	@Override
	public ReservationDto createReservation(ReservationDto reservationDto) {
		Reservation reservation = reservationMapper.reservationDtoToReservation(reservationDto);
		ReservationStatus reservationStatus = reservationStatusService.findByReservationStatusName("PENDING");
		reservation.setReservationStatus(reservationStatus);
		reservationDto.setReservationStatusId(reservation.getReservationStatus().getId());

		Reservation reservation1 = reservationRepository.save(reservationMapper.reservationDtoToReservation(reservationDto));

		Reservation reservation2 = reservationRepository.findById(reservation1.getId()).orElseThrow();

		Room room = roomService.findById(reservation2.getRoom().getId());
		Customer customer = customerRepository.findById(reservation2.getCustomer().getId()).orElseThrow();
		reservation2.setRoom(room);
		reservation2.setCustomer(customer);
		reservation2.setReservationStatus(reservationStatus);
		String emailSeller = room.getCustomer().getEmail();
		ReservationListDto reservationListDto = reservationMapper.reservationToReservationListDto(reservation2);

		Thread thread = new Thread(() -> {
			try {
				emailService.sendCreateReservationMail(reservationListDto, emailSeller);
			} catch (MessagingException | NotFoundException e) {
				throw new RuntimeException(e);
			}
		});
		thread.start();

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

	@Override
	public List<LocalDate> getAllInvalidDate(String roomId) throws NotFoundException {
		return reservationDao.getAllInvalidDates(roomId);
	}

	@Override public List<ReservationListDto> getByCustomerId(String customerId) {
		return reservationRepository.getByCustomerIdOrderByTimeCreateDesc(customerId).stream()
			.map(reservation -> reservationMapper.reservationToReservationListDto(reservation)).collect(
				Collectors.toList());
	}

	@Override public ReservationListDto getById(String id) {
		ReservationListDto reservationListDto = reservationMapper.reservationToReservationListDto(
			reservationRepository.getById(id));
		String emailOwner = reservationRepository.getById(id).getRoom().getCustomer().getEmail();
		reservationListDto.setEmailOwner(emailOwner);
		return reservationListDto;
	}

	@Override public ReservationListDto updateReservation(String id, String reservationStatsName, String email) throws MessagingException {
		Reservation reservation = reservationRepository.getById(id);
		ReservationListDto oldReservationListDto = reservationMapper.reservationToReservationListDto(reservation);
		reservation.setReservationStatus(reservationStatusService.findByReservationStatusName(reservationStatsName));
		reservationRepository.save(reservation);

		emailService.sendUpdateReservationMail(oldReservationListDto, reservationStatsName, email);
		return reservationMapper.reservationToReservationListDto(reservation);
	}

	@Override public List<ReservationListDto> getBySellerId(String sellerId) {
		return reservationDao.getBySellerId(sellerId).stream().map(reservation -> reservationMapper.reservationToReservationListDto(reservation)).collect(
			Collectors.toList());
	}
}
