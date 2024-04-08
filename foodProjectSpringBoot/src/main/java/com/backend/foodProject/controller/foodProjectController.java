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

import java.util.*;
import java.util.stream.Collectors;
import java.time.*;


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

    @PostMapping("/analytics/order_volume")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public Integer getOrderVolume (@RequestBody String details)
    {
        JSONObject data = new JSONObject(details);

        if (data.getString("startDate").isEmpty() || data.getString("endDate").isEmpty()) {

            // return orderService.findByEmployeeId(data.getInt("id"));
            return 0;

        }else{

            List<Order> ordersBetweenDates =  orderService.orderVolume(data.getString("startDate"),data.getString("endDate"));
            List<String> menuByStoreId = foodService.getFoodItemsByStoreId(data.getInt("storeId"));
            
            int totalVolume = 0; 

            for (int i = 0; i < menuByStoreId.size(); i++) {
                String foodName = menuByStoreId.get(i);
                // System.out.println(foodName);

                for (Order order : ordersBetweenDates) {
                    // System.out.println(order.getItemName());

                    String orderedItems = order.getItemName();

                    if (orderedItems.contains(foodName)) {
                        totalVolume += 1;
                        // System.out.println(totalVolume);
                    }        
                }
            }
            
            System.out.println("Final Value: "+totalVolume);
            

            return totalVolume;
        }

    }

    public static String findTop3Items(ArrayList<String> itemList) {
    // Create a HashMap to store item counts
        Map<String, Integer> itemCounts = new HashMap<>();

        // Count occurrences of each item
        for (String item : itemList) {
            itemCounts.put(item, itemCounts.getOrDefault(item, 0) + 1);
        }

        // Sort the items based on their counts in descending order
        List<Map.Entry<String, Integer>> sortedItems = itemCounts.entrySet().stream()
                .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue()))
                .collect(Collectors.toList());

        // Construct the string with top 3 most frequent items
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < Math.min(3, sortedItems.size()); i++) {
            Map.Entry<String, Integer> entry = sortedItems.get(i);
            sb.append("{\"");
            sb.append(entry.getKey());
            sb.append("\": ");
            sb.append(entry.getValue());
            sb.append("}");
            if (i < Math.min(3, sortedItems.size()) - 1) {
                sb.append(", ");
            }
        }

        return sb.toString();
    }


    @PostMapping("/analytics/popular_items")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public String getPopularItems (@RequestBody String details){

        JSONObject data = new JSONObject(details);


        if (data.getString("startDate").isEmpty() || data.getString("endDate").isEmpty()) {

            // return orderService.findByEmployeeId(data.getInt("id"));
            // List<Order> allItems = orderService.getAllOrders();
            // ArrayList<String> everyItemInOrdersArray = new ArrayList<>();

            // for (Order order : allItems) {
            //     String orderedItems = order.getItemName();
            //     String[] itemArray = orderedItems.substring(1, orderedItems.length() - 1).split(",");

            //     // Trim whitespaces and add to list
            //     for (int i = 0; i < itemArray.length; i++) {
            //         itemArray[i] = itemArray[i].trim();
            //     }
            //     for (String item : itemArray) {
            //         System.out.println(item);
            //         everyItemInOrdersArray.add(item);
            //     }
            // }


            ////

                // List<Order> ordersBetweenDates =  orderService.orderVolume(data.getString("startDate"),data.getString("endDate"));
                List<Order> allItems = orderService.getAllOrders();
                List<String> menuByStoreId = foodService.getFoodItemsByStoreId(data.getInt("storeId"));
                ArrayList<String> everyItemInOrdersArray = new ArrayList<>();

                // Loop through the menu for a particular store ID
                for (int i = 0; i < menuByStoreId.size(); i++) {
                    String foodName = menuByStoreId.get(i);

                    // Loop through orders between selected dates
                    for (Order order : allItems) {
                        
                        // get the ordered items
                        String orderedItems = order.getItemName();

                        // If ordered items contains the food name in the menu
                        // means that that dish is ordered once
                        // add into array
                        if (orderedItems.contains(foodName)) {
                            everyItemInOrdersArray.add(foodName);
                        }        
                    }
                }


            ////

            String top3Items = this.findTop3Items(everyItemInOrdersArray);
            System.out.println("Top 3 most frequent items: [" + top3Items + "]");
            return "["+top3Items+"]";

        }else{
                List<Order> ordersBetweenDates =  orderService.orderVolume(data.getString("startDate"),data.getString("endDate"));
                List<String> menuByStoreId = foodService.getFoodItemsByStoreId(data.getInt("storeId"));
                ArrayList<String> everyItemInOrdersArray = new ArrayList<>();

                // Loop through the menu for a particular store ID
                for (int i = 0; i < menuByStoreId.size(); i++) {
                    String foodName = menuByStoreId.get(i);

                    // Loop through orders between selected dates
                    for (Order order : ordersBetweenDates) {
                        
                        // get the ordered items
                        String orderedItems = order.getItemName();

                        // If ordered items contains the food name in the menu
                        // means that that dish is ordered once
                        // add into array
                        if (orderedItems.contains(foodName)) {
                            everyItemInOrdersArray.add(foodName);
                        }        
                    }
                }


            ////

            String top3Items = this.findTop3Items(everyItemInOrdersArray);
            System.out.println("Top 3 most frequent items: [" + top3Items + "]");
            return "["+top3Items+"]";
        }
    }


    @PostMapping("/analytics/peak_ordering_hours")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public String getPeakorderingHours (@RequestBody String details){
        
        JSONObject data = new JSONObject(details);


        if (data.getString("startDate").isEmpty() || data.getString("endDate").isEmpty()) {

            List<Order> allItems = orderService.getAllOrders();
            List<String> menuByStoreId = foodService.getFoodItemsByStoreId(data.getInt("storeId"));

            // System.out.println(allItems);
            // System.out.println(menuByStoreId);

   // Create a map to store the count of orders per date and hour
Map<LocalDate, Map<Integer, Integer>> ordersPerDateAndHour = new HashMap<>();

// Iterate through each order
for (Order order : allItems) {
    // Extract the date and hour from the order's time of order
    LocalDateTime orderDateTime = order.getTimeOfOrder().toLocalDateTime();
    LocalDate orderDate = orderDateTime.toLocalDate();
    int hour = orderDateTime.getHour();

    // Get or create the map for the current date
    Map<Integer, Integer> ordersPerHour = ordersPerDateAndHour.computeIfAbsent(orderDate, k -> new HashMap<>());

    // Parse the item list string into individual items
    String itemListString = order.getItemName();
    // Remove brackets and quotation marks from the string
    itemListString = itemListString.substring(1, itemListString.length() - 1);
    // Split the string by commas to get individual items
    String[] items = itemListString.split(", ");
    
    // Check if any of the food items in the order are in the list of specified food items
    boolean orderedSpecifiedFood = false;
    for (String item : items) {
        // Split the item to extract individual food items
        String[] foodItems = item.split(",");
        for (String foodItem : foodItems) {
            // Remove quotation marks from the food item
            foodItem = foodItem.trim().replace("\"", "");
            // Check if the food item is in the list of specified food items (menuByStoreId)
            if (menuByStoreId.contains(foodItem)) {
                orderedSpecifiedFood = true;
                break;
            }
        }
        if (orderedSpecifiedFood) {
            break;
        }
    }

    // If any specified food item is ordered, increment the count of orders for that hour
    if (orderedSpecifiedFood) {
        ordersPerHour.put(hour, ordersPerHour.getOrDefault(hour, 0) + 1);
    }
}

StringBuilder jsonBuilder = new StringBuilder("[");
for (Map.Entry<LocalDate, Map<Integer, Integer>> entry : ordersPerDateAndHour.entrySet()) {
    LocalDate date = entry.getKey();
    for (Map.Entry<Integer, Integer> hourEntry : entry.getValue().entrySet()) {
        int hour = hourEntry.getKey();
        int orders = hourEntry.getValue();
        LocalDateTime startDateTime = LocalDateTime.of(date, LocalTime.of(hour, 0));
        LocalDateTime endDateTime = LocalDateTime.of(date, LocalTime.of(hour, 59));
        String jsonString = "{\"datetime\": \"" + startDateTime + " to " + endDateTime + "\", \"orders\": " + orders + "}";
        jsonBuilder.append(jsonString).append(",");
    }
}
// Remove the last comma
if (jsonBuilder.length() > 1) {
    jsonBuilder.setLength(jsonBuilder.length() - 1);
}
jsonBuilder.append("]");

String jsonArrayString = jsonBuilder.toString();



            return jsonArrayString;
        }else{
            return null;
        }
    }
}
