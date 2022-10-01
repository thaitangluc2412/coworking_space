package com.coworkingspace.backend.dao.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reservation_status")
@Getter
@Setter
public class ReservationStatus {

	@Id
	@Column(name = "reservation_status_id", nullable = false)
	private Integer reservationStatusId;

	@Column(name = "reservation_status_name", nullable = false)
	private String reservationStatusName;
}
