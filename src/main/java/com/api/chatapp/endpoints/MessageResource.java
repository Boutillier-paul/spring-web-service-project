package com.api.chatapp.endpoints;

import com.api.chatapp.dao.MessageDao;
import org.springframework.beans.factory.annotation.Autowired;

import com.api.chatapp.models.MessageEntity;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("messages")
public class MessageResource {

    @Autowired
    private MessageDao messageDao;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Iterable<MessageEntity> getMessages(){
        return messageDao.findAll();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveMessage(MessageEntity message) {

        return Response
                .status(Response.Status.CREATED)
                .entity(messageDao.save(message))
                .build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Optional<MessageEntity> getMessageById(@PathParam("id") int id) { return messageDao.findById(id); }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateMessageById(@PathParam("id") int id, MessageEntity message){

        Optional<MessageEntity> messageTemp = messageDao.findById(id);

        if(!messageTemp.isPresent()){

            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }
        
        message.setId(messageTemp.get().getId());

        return Response
                .status(Response.Status.OK)
                .entity(messageDao.save(message))
                .build();
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Optional<MessageEntity> deleteMessageById(@PathParam("id") int id){
        Optional<MessageEntity> message = messageDao.findById(id);
        messageDao.deleteById(id);
        return message;
    }

}
