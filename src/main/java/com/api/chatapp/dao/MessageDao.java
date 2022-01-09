package com.api.chatapp.dao;

import com.api.chatapp.models.MessageEntity;
import com.api.chatapp.models.RoomEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageDao extends CrudRepository<MessageEntity, Integer> {

    Iterable<MessageEntity> findByRoom(Optional<RoomEntity> room);
}
