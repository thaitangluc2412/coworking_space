package com.coworkingspace.backend.dao.repository;

import com.coworkingspace.backend.dao.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
	Optional<Room> findById(String id);
	List<Room> getByRoomTypeId(String id);
	List<Room> getByCustomerIdAndEnableIsTrue(String id);
}
