package com.backend.foodProject;

import com.backend.foodProject.Service.AuthenticationService;
import com.backend.foodProject.database.ConnectToDatabase;
import com.backend.foodProject.entity.LoginRequest;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.mockito.ArgumentMatchers.anyString;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

class AuthenticationServiceTest {

    @Test
    void loginSuccess() {
        ConnectToDatabase mockConnect = Mockito.mock(ConnectToDatabase.class);
        Mockito.when(mockConnect.getLoginInfo(anyString(), anyString())).thenReturn(true);

        AuthenticationService authService = new AuthenticationService(mockConnect);
        LoginRequest request = new LoginRequest();
        request.setUsername("user");
        request.setPassword("pass");

        assertTrue(authService.login(request));
    }

    @Test
    void loginFailure() {
        ConnectToDatabase mockConnect = Mockito.mock(ConnectToDatabase.class);
        Mockito.when(mockConnect.getLoginInfo(anyString(), anyString())).thenReturn(false);

        AuthenticationService authService = new AuthenticationService(mockConnect);
        LoginRequest request = new LoginRequest();
        request.setUsername("user");
        request.setPassword("wrongpass");

        assertFalse(authService.login(request));
    }
}
