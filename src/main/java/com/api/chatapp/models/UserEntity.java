package com.api.chatapp.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String username;
    @JsonIgnore
    private String password;

    public UserEntity(){ super(); }

    public UserEntity(String username, String password){
        super();
        this.username = username;
        this.password = password;
    }

    public UserEntity(int id, String username, String password){
        super();
        this.username = username;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() { return password; }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }
}
