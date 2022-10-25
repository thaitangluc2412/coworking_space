package com.coworkingspace.backend.dao.hibernate;

import com.coworkingspace.backend.sdo.DateStatus;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationDao {
	List<DateStatus> getDateStatus(String roomId, int month, int year) throws NotFoundException;
	String getFurthestValidDate(String roomId, String from) throws NotFoundException;
}