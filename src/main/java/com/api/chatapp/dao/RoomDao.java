package com.api.chatapp.dao;

import com.api.chatapp.models.RoomEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomDao extends CrudRepository<RoomEntity, Integer> {
}
