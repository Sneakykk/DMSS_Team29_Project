package com.backend.foodProject.Service;

import com.backend.foodProject.database.ConnectToDatabase;
import com.backend.foodProject.entity.LoginRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
    private final ConnectToDatabase connectToDatabase;

    @Autowired
    public AuthenticationService(ConnectToDatabase connectToDatabase) {
        this.connectToDatabase = connectToDatabase;
    }

    public boolean login(LoginRequest loginRequest) {
        try {
            return connectToDatabase.getLoginInfo(loginRequest.getUsername(), loginRequest.getPassword());
        } catch (Exception e) {
            logger.error("Login error: ", e);
            return false;
        }
    }
}
