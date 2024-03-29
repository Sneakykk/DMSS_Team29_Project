package com.backend.foodProject.entity;

import java.util.List;

public class Dashboard {
    public int numberOfStores;
    public List<String> storeNames;
    public String userFullName;

    public Dashboard ()
    {

    }

    public int getNumberOfStores() {
        return numberOfStores;
    }

    public void setNumberOfStores(int numberOfStores) {
        this.numberOfStores = numberOfStores;
    }

    public List<String> getStoreNames() {
        return storeNames;
    }

    public void setStoreNames(List<String> storeNames) {
        this.storeNames = storeNames;
    }

    public String getUserFullName() {
        return userFullName;
    }

    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }

    public void displayStores()
    {

    }

    public void displayWelcomeMessage()
    {
        String welcome = "Welcome " + userFullName;
    }
}