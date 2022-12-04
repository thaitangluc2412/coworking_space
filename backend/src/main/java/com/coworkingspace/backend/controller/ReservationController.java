package com.coworkingspace.backend.controller;

import com.coworkingspace.backend.dto.ReservationDto;
import com.coworkingspace.backend.dto.ReservationListDto;
import com.coworkingspace.backend.dto.RoomCreateDto;
import com.coworkingspace.backend.sdo.DateStatus;
import com.coworkingspace.backend.service.ReservationService;
import com.coworkingspace.backend.service.impl.ReservationServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@AllArgsConstructor
public class ReservationController {

	private ReservationService reservationService;

	@PostMapping
	public ResponseEntity<ReservationDto> createReservations(@RequestBody ReservationDto reservationDto) throws NotFoundException {
		ReservationDto reservationDto1 = reservationService.createReservation(reservationDto);
		return new ResponseEntity<>(reservationDto1, HttpStatus.OK);
	}

	@GetMapping("/furthest_valid_date/{roomId}")
	public ResponseEntity<String> getFurthestValidDate(@PathVariable String roomId, @RequestParam String from) throws NotFoundException {
			System.out.println("# Date : " + from);
			String furthestValidDate = reservationService.getFurthestValidDate(roomId, from);
			return new ResponseEntity<>(furthestValidDate,HttpStatus.OK);
	}

	@GetMapping("/date_status/{roomId}")
	public ResponseEntity<List<DateStatus>> getDateStatus(@PathVariable String roomId, @RequestParam int month, @RequestParam int year) throws NotFoundException {
		List<DateStatus> dateStatus = reservationService.getDateStatus(roomId, month, year);
		return new ResponseEntity<>(dateStatus, HttpStatus.OK);
	}

	@GetMapping("/get_invalid_date/{roomId}")
	public ResponseEntity<?> getAllInvalidDates(@PathVariable String roomId) throws NotFoundException {
		List<LocalDate> dates = new ArrayList<>(reservationService.getAllInvalidDate(roomId));
		return new ResponseEntity<>(dates, HttpStatus.OK);
	}

	@GetMapping("/by-customer/{customerId}")
	public ResponseEntity<List<ReservationListDto>> getByCustomerId(@PathVariable String customerId){
		List<ReservationListDto> reservationListDtos = reservationService.getByCustomerId(customerId);
		return new ResponseEntity<>(reservationListDtos, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ReservationListDto> getById(@PathVariable String id){
		ReservationListDto reservationListDto = reservationService.getById(id);
		return new ResponseEntity<>(reservationListDto, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ReservationListDto> updateReservation(@PathVariable String id, @RequestParam String reservationStatusName){
		ReservationListDto reservationListDto = reservationService.updateReservation(id, reservationStatusName);
		return new ResponseEntity<>(reservationListDto, HttpStatus.OK);
	}

	@GetMapping("/get-by-seller-id/{id}")
	public ResponseEntity<List<ReservationDto>> getBySellerId(@PathVariable String id){
		List<ReservationDto> reservationDtos = reservationService.getBySellerId(id);
		return new ResponseEntity<>(reservationDtos, HttpStatus.OK);
	}
}
