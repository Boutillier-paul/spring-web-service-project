package com.api.chatapp.endpoints;

import com.api.chatapp.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;

import com.api.chatapp.models.UserEntity;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

@Path("users")
public class UserResource {

    @Autowired
    private UserDao userDao;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Iterable<UserEntity> getUsers(){
        return userDao.findAll();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Optional<UserEntity> getUserById(@PathParam("id") int id) {
        return userDao.findById(id);
    }
}
