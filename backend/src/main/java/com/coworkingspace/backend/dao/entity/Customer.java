package com.coworkingspace.backend.dao.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "customer")
@Getter
@Setter
public class Customer {
	@Id
	@GenericGenerator(name = "id_gen", strategy = "com.coworkingspace.common.utils.GenerateUUID")
	@GeneratedValue(generator = "id_gen")
	@Column(name = "customer_id")
	private Integer customerId;

	@Column(name = "customer_name", nullable = false)
	private String customerName;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "phone_number")
	private String phoneNumber;

	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;
}
