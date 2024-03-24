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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    private OrderService OrderService;

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

    @PostMapping("/food")
    public List<Food> allfood ()
    {
        return foodService.getAllFood();
    }
}
