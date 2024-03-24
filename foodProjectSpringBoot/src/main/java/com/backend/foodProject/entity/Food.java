package com.backend.foodProject.entity;

public class Food {

    private int itemId;
    private String itemName;
    private float itemPrice;
    private int storeID;

    public Food()
    {

    }

    public Food (int itemId, float itemPrice, String itemName)
    {
        this.itemId = itemId;
        this.itemPrice = itemPrice;
        this.itemName = itemName;
    }

    public float getItemPrice() {
        return itemPrice;
    }

    public int getItemId() {
        return itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public void setItemPrice(float itemPrice) {
        this.itemPrice = itemPrice;
    }
}