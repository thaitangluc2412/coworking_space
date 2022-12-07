package com.coworkingspace.backend.service.impl;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.coworkingspace.backend.common.sdo.Email;
import com.coworkingspace.backend.common.sdo.EmailProperty;
import com.coworkingspace.backend.dao.entity.Reservation;
import com.coworkingspace.backend.dto.ReservationListDto;
import com.coworkingspace.backend.mapper.ReservationMapper;
import com.coworkingspace.backend.service.EmailService;
import com.coworkingspace.backend.service.RoomService;
import com.github.difflib.text.DiffRowGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

	public static final String CREATE_EMAIL_TEMPLATE = "create-email.html";
	public static final String UPDATE_EMAIL_TEMPLATE = "update-email.html";
	public static final String EMAIL_SUBJECT = "[easy-reporting] Update for %s";

	private final DiffRowGenerator diffRowGenerator;
	private final JavaMailSender emailSender;
	private final SpringTemplateEngine templateEngine;

	@Value("#{'${coworkingspace.fe.url}' + '/'}")
	private String homeUrl;

	@Override public void sendEmail(Email email) throws MessagingException {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(
			message,
			MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
			StandardCharsets.UTF_8.name()
		);

		helper.setTo(email.getTo());
		helper.setSubject(email.getSubject());
		helper.setCc(email.getCc().toArray(new String[0]));

		Context context = new Context();
		context.setVariables(email.getProperties());
		String html = templateEngine.process(email.getTemplate(), context);
		helper.setText(html, true);
//		ClassPathResource logo = new ClassPathResource("static/images/logo.png");
//		helper.addInline("logo", logo);
		emailSender.send(message);
	}

	@Override public void sendCreateReservationMail(ReservationListDto reservationListDto, String emailSeller) throws MessagingException, ChangeSetPersister.NotFoundException {
		EmailProperty emailProperty = new EmailProperty();
		emailProperty.setProperty("issueName", "reservationListDto.getIssueName()");
		emailProperty.setProperty("creatorName", "reservationListDto.getCreatorName()");
		emailProperty.setProperty("updateByName", "reservationListDto.getUpdateByName()");
		emailProperty.setProperty("assigneeName", "reservationListDto.getAssigneeName()");
		emailProperty.setProperty("timeCreate", reservationListDto.getStartDate() + "00:00:00");
		emailProperty.setProperty("timeUpdate", reservationListDto.getEndDate() + "00:00:00");
		emailProperty.setProperty("location", "reservationListDto.getLocation()");
		emailProperty.setProperty("priority", "reservationListDto.getPriority()");
		emailProperty.setProperty("category", "reservationListDto.getCategory()");
		emailProperty.setProperty("homeUrl", homeUrl);
		emailProperty.setProperty("issueUrl", "reservationListDto.getUrl()");
		emailProperty.setProperty("status", "reservationListDto.getStatus()");
		emailProperty.setProperty("description", "reservationListDto.getDescription()");

		sendEmail(Email.builder()
			.to(emailSeller)
			.cc(Collections.emptyList())
			.properties(emailProperty.getProperties())
			.subject(String.format(EMAIL_SUBJECT, reservationListDto.getRoomName()))
			.template(CREATE_EMAIL_TEMPLATE)
			.build());
	}

	@Override public void sendUpdateReservationMail(ReservationListDto oldReservationDto, ReservationListDto newReservationDto) throws MessagingException {

	}
}
