package com.backend.foodProject.Service;
import org.springframework.stereotype.Service;

import com.backend.foodProject.entity.Order;
import com.backend.foodProject.repo.OrderRepository;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


import java.util.*;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void addOrder(Order orderItem) {
        
        orderRepository.insertOrder(orderItem.getOrderId(), orderItem.getEmployeeId(), orderItem.getItemName(), orderItem.getTimeOfOrder(), orderItem.getTotalBill(), orderItem.getQuantity());
        return ;
    }

    public List<Order> employeeOrderHistory(int id, String startDate, String endDate) {
    
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        System.out.println("startDate: " + startDate+" 00:00:00");
        System.out.println("endDate: " + endDate+" 00:00:00");

        // Parse the string to a LocalDateTime object
        LocalDateTime startDateTime = LocalDateTime.parse((startDate+" 00:00:00"),formatter);
        LocalDateTime endDateTime = LocalDateTime.parse((endDate+" 00:00:00"), formatter);

        System.out.println("startDateTime: " + startDateTime);
        System.out.println("endDateTime: " + endDateTime);

       return orderRepository.findByEmployeeIdAndTimeOfOrderBetween(id, startDateTime, endDateTime);
        
    }

    public List<Order> findByEmployeeId(int id) {

       return orderRepository.findByEmployeeId(id);
    }

    

}