package com.backend.foodProject.controller;

import com.backend.foodProject.Service.*;
import com.backend.foodProject.entity.Food;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.backend.foodProject.entity.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class foodProjectController {

    @Autowired
    private CartService cartService;

    @Autowired
    private FoodService foodService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private StoreService storeService;

    @Autowired
    private UserService userService;


    @PostMapping("/user/login")
    public ResponseEntity<User> login (@RequestBody String details)
    {
        JSONObject data = new JSONObject(details);

        Optional<User> check = userService.loginUser(data.getString("username"), data.getString("password"));

        if (check.isPresent())
        {
            User user = check.get();
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/food")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public List<Food> allFoods ()
    {
        return foodService.getAllFoods();
    }

    @GetMapping("/order")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public List<Order> allOrders ()
    {
        return orderService.getAllOrders();
    }

    @GetMapping("/store")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public List<Store> allStores ()
    {
        return storeService.getAllStores();
    }

}
