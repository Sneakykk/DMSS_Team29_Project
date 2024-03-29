package com.entity;

import com.projectgogetfood.*;


public class LoginPage
{
    private String userNameInput;
    private String passwordInput;

    public LoginPage ()
    {

    }

    public String getPasswordInput() {
        return passwordInput;
    }

    public String getUserNameInput() {
        return userNameInput;
    }

    public void setPasswordInput(String passwordInput) {
        this.passwordInput = passwordInput;
    }

    public void setUserNameInput(String userNameInput) {
        this.userNameInput = userNameInput;
    }

    public boolean loginSuccess()
    {
        try{
            ConnectToDatabase connectToDatabase = new connectToDatabase ();
            return connectToDatabase.getLoginInfo(userNameInput, passwordInput)
        }
        catch (Exception e)
        {
            System.out.println("Oops, there's an error: " + e.toString());
        }

    }
}