package com.backend.foodProject.entity;
import java.util.*;
import jakarta.persistence.*;

@Entity
@Table(name = "Employee")
public class User {
    @Id
    private int userId;
    private String username;
    private String fullName;
    private String password;
    // private List<Order> orderHistory;
    @Transient
    @OneToMany(mappedBy = "user")
    private Cart cart;

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

    // public List<Order> getOrderHistory() {
    //     return orderHistory;
    // }

    // public void setOrderHistory(List<Order> orderHistory) {
    //     this.orderHistory = orderHistory;
    // }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
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