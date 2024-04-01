package com.backend.foodProject.entity;

public class LoginRequest {
    private String username;
    private String password;

    // Constructors, getters, and setters
    public LoginRequest() {}

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
