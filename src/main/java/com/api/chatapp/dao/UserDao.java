package com.api.chatapp.dao;

import com.api.chatapp.models.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<UserEntity, Integer> {

    UserEntity findByUsername(String username);
}
