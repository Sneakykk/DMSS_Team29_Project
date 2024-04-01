package com.backend.foodProject;

import com.backend.foodProject.entity.LoginRequest;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class LoginRequestTest {

    @Test
    void testLoginRequestGettersAndSetters() {
        LoginRequest request = new LoginRequest();
        request.setUsername("testUser");
        request.setPassword("testPass");

        assertEquals("testUser", request.getUsername());
        assertEquals("testPass", request.getPassword());
    }
}
