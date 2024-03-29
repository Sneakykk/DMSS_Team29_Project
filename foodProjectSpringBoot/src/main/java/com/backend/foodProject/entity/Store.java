package com.backend.foodProject.entity;
import jakarta.persistence.*;

@Entity
public class Store {

    @Id
    @Column(name = "StoreID") // Specify the correct column name here
    private int storeId;

    @Column(name = "Name") // Specify the correct column name here
    private String storeName;

    public Store ()
    {

    }

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        storeId = storeId;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

}