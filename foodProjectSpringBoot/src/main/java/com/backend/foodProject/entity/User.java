package com.backend.foodProject.entity;

import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name="EMPLOYEES")
public class User {

    @Id
    @Column(name = "EmployeeID")
    private int employeeId;

    @Column(name = "Username")
    private String username;

    @Column(name = "FirstName")
    private String firstName;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "Pwd")
    private String pwd;

    @Transient
    @OneToMany(mappedBy = "user")
    private Cart cart;

    public User() {
    }

    public User(int employeeId, String firstName, String lastName, String username, String pwd) {
        this.employeeId = employeeId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pwd = pwd;
    }

    // Getters and setters for all fields

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}
