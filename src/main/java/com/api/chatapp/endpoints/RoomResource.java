package com.api.chatapp.endpoints;

import com.api.chatapp.dao.MessageDao;
import com.api.chatapp.dao.RoomDao;
import com.api.chatapp.models.MessageEntity;
import com.api.chatapp.models.RoomEntity;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Path("rooms")
public class RoomResource {
    @Autowired
    private RoomDao roomDao;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Iterable<RoomEntity> getRooms(){ return roomDao.findAll(); }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveRoom(RoomEntity room) {
        return Response
                .status(Response.Status.OK)
                .entity(roomDao.save(room))
                .build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Optional<RoomEntity> getRoomById(@PathParam("id") int id) {
        return roomDao.findById(id);
    }

    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Optional<RoomEntity> deleteRoomById(@PathParam("id") int id){
        Optional<RoomEntity> room = roomDao.findById(id);
        roomDao.deleteById(id);
        return room;
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateRoomById(@PathParam("id") int id, RoomEntity room){

        Optional<RoomEntity> roomTemp = roomDao.findById(id);

        if(!roomTemp.isPresent()){

            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }

        room.setId(roomTemp.get().getId());

        return Response
                .status(Response.Status.OK)
                .entity(roomDao.save(room))
                .build();
    }
}