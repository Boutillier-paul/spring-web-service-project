package com.api.chatapp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;


@Entity
public class RoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String description;
    @OneToMany(fetch=FetchType.EAGER, mappedBy="room", cascade=CascadeType.ALL, orphanRemoval = true)
    private Collection<MessageEntity> messages;

    public RoomEntity() { super(); }

    public RoomEntity(String name, String description) {
        super();
        this.name = name;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<MessageEntity> getMessages() {
        return this.messages;
    }

    public void removeMessage(MessageEntity message) { this.messages.remove(message); }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }
}
