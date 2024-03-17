package com.entity;

public class User {
    private String username;
    private String fullName;
    private int userId;
    private List<Order> orderHistory;
    private myCart cart;

    public User()
    {

    }

    public User(String username, String fullName, int userId)
    {
        this.userId = userId;
        this.username = username;
        this.fullName = fullName;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public List<Order> getOrderHistory() {
        return orderHistory;
    }

    public void setOrderHistory(List<Order> orderHistory) {
        this.orderHistory = orderHistory;
    }

    public myCart getCart() {
        return cart;
    }

    public void setCart(myCart cart) {
        this.cart = cart;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}