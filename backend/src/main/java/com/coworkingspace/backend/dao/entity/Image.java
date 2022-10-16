package com.coworkingspace.backend.dao.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "image")
public class Image {
	@Id
	@GenericGenerator(name = "id_gen", strategy = "com.coworkingspace.backend.common.utils.GenerateUUID")
	@GeneratedValue(generator = "id_gen")
	@Column(name = "image_id", nullable = false)
	private String id;

	@Lob
	@Column(name = "url", nullable = false)
	private String url;

	@Column(name = "thumbnail", nullable = false)
	private String thumbnail;

	// @ManyToOne(fetch = FetchType.LAZY, optional = false)
	// @JoinColumn(name = "image_storage_id", nullable = false)
	// private ImageStorage imageStorage;
}