package com.backend.foodProject.Service;
import org.springframework.stereotype.Service;

import com.backend.foodProject.entity.Order;
import com.backend.foodProject.repo.OrderRepository;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

//    public List<Order> getOrderByEmployeeName(String name)
//    {
//        return orderRepository.findByEmployeeName(name);
//    }
}