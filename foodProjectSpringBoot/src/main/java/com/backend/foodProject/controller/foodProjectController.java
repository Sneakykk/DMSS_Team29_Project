package com.backend.foodProject.controller;

import com.backend.foodProject.Service.*;
import com.backend.foodProject.entity.Food;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
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

    @PostMapping("/add_order")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public ResponseEntity<String> addNewOrder (@RequestBody Order order)
    {
        try {
            orderService.addOrder(order);
            return ResponseEntity.ok("Order added successfully"); // Return HTTP 200 OK
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception (optional)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add order"); // Return HTTP 500 Internal Server Error
        }
        
    }

    @GetMapping("/get_all_foods")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public List<Food> allFoods ()
    {
        return foodService.getAllFoods();
    }

    @GetMapping("/get_all_orders")
    public List<Order> allOrders ()
    {
        return orderService.getAllOrders();
    }

    @GetMapping("/get_all_stores")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public List<Store> allStores ()
    {
        return storeService.getAllStores();
    }

    @GetMapping("/get_unique_food_type")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public List<String> unqiueFoodType ()
    {
        return foodService.getUnqiueTypeArray();
    }

    @PostMapping("/employee/get_food_history")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public List<Order> getEmployeeOrderHistory (@RequestBody String details)
    {
        JSONObject data = new JSONObject(details);

        // Integer id = data.getInt("id"); // Get the integer value
        
        // // Print the id
        // System.out.println("ID: " + id);
        if (!data.getString("startDate").isEmpty() || !data.getString("endDate").isEmpty()) {

            return orderService.employeeOrderHistory(data.getInt("id"),data.getString("startDate"),data.getString("endDate"));

        }else{

            return orderService.findByEmployeeId(data.getInt("id"));
        }

    }

}
