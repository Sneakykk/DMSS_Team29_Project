package com.entity;

import java.util.*;
public class Order {

    private int orderId;
    private Date timestamp;
    private String username;
    private int userID;
    private float totalBill;

    public Order()
    {

    }

    //for new orders
    public Order (int orderId, String username, int userID)
    {
        this.orderId = orderId;
        this.userID = userID;
        this.username = username;
    }

    public Order (Date timestamp, float totalBill, int orderId, String username, int userID)
    {
        this.orderId = orderId;
        this.userID = userID;
        this.username = username;
        this.timestamp = timestamp;
        this.totalBill = totalBill
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public float getTotalBill() {
        return totalBill;
    }

    public void setTotalBill(float totalBill) {
        this.totalBill = totalBill;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public Order getOrder()
    {
        return this;
    }

    public float calculateTotalBill()
    {
        return totalBill;
    }
}