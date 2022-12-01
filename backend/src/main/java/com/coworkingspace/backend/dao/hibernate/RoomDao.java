package com.coworkingspace.backend.dao.hibernate;

import java.util.List;

import com.coworkingspace.backend.dao.entity.Room;
import com.coworkingspace.backend.dto.RoomListDto;

public interface RoomDao {
	List<Room> getWithFilter(String typeRoomId, String provinceId, String roomName, String cityName);
}
