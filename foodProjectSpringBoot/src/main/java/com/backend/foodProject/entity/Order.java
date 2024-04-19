package com.backend.foodProject.entity;

import java.time.LocalDateTime;
import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import jakarta.persistence.*;


@Entity
@Table(name = "orders")
public class Order {

    @Id
    @Column(name = "OrderID", columnDefinition = "int")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @Column(name = "EmployeeID")
    private int employeeId;

     @Column(name = "ItemName")
    private String itemName;
    
    @Column(name = "TimeOfOrder")
    // @Temporal(TemporalType.TIMESTAMP)
    private Timestamp timeOfOrder;

    @Column(name = "TotalBill")
    private float totalBill;

    @Column(name = "Quantity")
    private String quantity;

    @Column(name = "OrderStatus")
    private String orderStatus;

    @Column(name = "MixedStores")
    private boolean mixedStores;
    

    @Transient
    private Order[] employeeOrderHistory;

    // @Transient
    // private Menu[] menuByStore;

    // Constructors, getters, and setters
    // Constructor for JPA
    public Order() {
    }

    public Order(int orderId, int employeeId, String itemName, Timestamp timeOfOrder, float totalBill, String quantity, String orderStatus, boolean mixedStores) {
        this.orderId = orderId;
        this.employeeId = employeeId;
        this.itemName = itemName;
        this.timeOfOrder = timeOfOrder;
        this.totalBill = totalBill;
        this.quantity = quantity;
        this.orderStatus = orderStatus;
        this.mixedStores = mixedStores;
    }

    // Getters and setters
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }
    
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Timestamp getTimeOfOrder(){
        return timeOfOrder;
    }

    public void setTimeOfOrder(Timestamp timeOfOrder) {
        LocalDateTime localDateTime = timeOfOrder.toLocalDateTime();
        LocalDateTime adjustedDateTime = localDateTime.minusHours(8);
        ZonedDateTime zonedDateTime = adjustedDateTime.atZone(ZoneId.of("Asia/Singapore"));
        this.timeOfOrder = Timestamp.valueOf(zonedDateTime.toLocalDateTime());
        //this.timeOfOrder = timeOfOrder;
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

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public boolean getMixedStores() {
        return mixedStores;
    }

    public void setMixedStores(boolean mixedStores) {
        this.mixedStores = mixedStores;
    }

    public Order[] getEmployeeOrderHistory() {
        return employeeOrderHistory;
    }

    public void setEmployeeOrderHistory(Order[] employeeOrderHistory) {
        this.employeeOrderHistory = employeeOrderHistory;
    }

    // public Menu[] getMenuByStore() {
    //     return menuByStore;
    // }

    // public void menuByStore(Store[] menuByStore) {
    //     this.menuByStore = employeeOrderHistory;
    // }


}
