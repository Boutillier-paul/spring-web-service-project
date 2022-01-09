package com.api.chatapp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;


@Entity
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private UserEntity user;

    @JsonIgnore
    @ManyToOne
    private RoomEntity room;

    private String text;

    public MessageEntity() { super(); }

    public MessageEntity(UserEntity user, RoomEntity room, String text) {
        super();
        this.room = room;
        this.user = user;
        this.text = text;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return this.user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    @JsonIgnore
    public RoomEntity getRoom() { return room; }

    @JsonProperty
    public void setRoom(RoomEntity room) { this.room = room; }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String toString() { return this.user.getUsername() + ": " + this.text; }
}
