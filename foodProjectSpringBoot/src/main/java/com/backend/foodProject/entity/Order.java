package com.backend.foodProject.entity;

import java.time.LocalDateTime;


import jakarta.persistence.*;


@Entity
@Table(name = "orders")
public class Order {

    @Id
    @Column(name = "OrderID", columnDefinition = "int")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @Column(name = "EmployeeID")
    private String employeeId;

     @Column(name = "ItemName")
    private String itemName;
    
    @Column(name = "TimeOfOrder")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime timeOfOrder;

    @Column(name = "TotalBill")
    private float totalBill;

    @Column(name = "Quantity")
    private String quantity;

    // Constructors, getters, and setters
    // Constructor for JPA
    public Order() {
    }

    public Order(int orderId, String employeeId, String itemName, LocalDateTime timeOfOrder, float totalBill, String quantity) {
        this.orderId = orderId;
        this.employeeId = employeeId;
        this.itemName = itemName;
        this.timeOfOrder = timeOfOrder;
        this.totalBill = totalBill;
        this.quantity = quantity;
    }

    // Getters and setters
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public LocalDateTime getTimeOfOrder(){
        return timeOfOrder;
    }

    public void setTimeOfOrder(LocalDateTime timeOfOrder) {
        this.timeOfOrder = timeOfOrder;
    }

    public float getTotalBill() {
        return totalBill;
    }

    public void setTotalBill(float totalBill) {
        this.totalBill = totalBill;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

}
