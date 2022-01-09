package com.api.chatapp.models;

public class JwtResponse {

    private final String jwttoken;
    private final int id;

    public JwtResponse(String jwttoken, int id) {
        this.jwttoken = jwttoken;
        this.id = id;
    }

    public String getToken() {
        return this.jwttoken;
    }

    public int getId() { return this.id; }
}
