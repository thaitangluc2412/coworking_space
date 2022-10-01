package com.coworkingspace.backend.dao.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "price")
public class Price {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "price_id", nullable = false)
	private Integer id;

	@Column(name = "day_price")
	private Double dayPrice;

	@Column(name = "month_price")
	private Double monthPrice;

	@Column(name = "year_price")
	private Double yearPrice;
}