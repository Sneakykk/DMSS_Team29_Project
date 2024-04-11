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
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;


import com.backend.foodProject.entity.*;

import java.util.*;
import java.util.stream.Collectors;
import java.time.*;
import java.math.BigDecimal;



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

    @PostMapping("/get_food_by_itemId")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public Food getFoodByItemId (@RequestBody int storedId)
    {
        return foodService.getFoodById(storedId);
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

    @PostMapping("/get_food_menu_by_store")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public List<Food> foodMenuByStore (@RequestBody int storedId)
    {
        return foodService.getAllFoodByStoreId(storedId);
    }

    @PostMapping("/add_food_by_store")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public void addFoodMenuByStore (@RequestBody String details)
    {
        JSONObject data = new JSONObject(details);
        System.out.println(data);
        Food food = foodBuilder(data);
        foodService.addFoodItemByStoreId(food);
        return ;
    }

    private Food foodBuilder (JSONObject data)
    {
        Food food = new Food();
        food.setItemName(data.getString("foodName"));
        food.setItemPrice(data.getFloat("foodPrice"));
        food.setItemType(data.getString("foodType"));
        food.setStoreId(data.getInt("storeId"));
        return food;
    }

    @PostMapping("/update_food_by_itemId")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public Food updateFoodById (@RequestBody String details)
    {
        JSONObject data = new JSONObject(details);
        System.out.println(data);
        Food food = new Food();
        food.setItemName(data.getString("foodName"));
        food.setItemPrice(data.getFloat("foodPrice"));
        food.setItemType(data.getString("foodType"));
        food.setStoreId(data.getInt("storeId"));
        return foodService.updateFood(data.getInt("foodId"),food);
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
    public String getOrderVolume (@RequestBody String details)
    {
        JSONObject data = new JSONObject(details);

        if (data.getString("startDate").isEmpty() || data.getString("endDate").isEmpty()) {

            // return orderService.findByEmployeeId(data.getInt("id"));
            return "{\"totalVolume\": 0, \"totalAmount\": \"0\"}";

        }else{

            List<Order> ordersBetweenDates =  orderService.orderVolume(data.getString("startDate"),data.getString("endDate"));
            List<Object> menuByStoreId = foodService.getFoodItemsAndItemPriceByStoreId(data.getInt("storeId"));
            
            int totalVolume = 0; 
            BigDecimal totalAmount = BigDecimal.ZERO; // Initialize totalAmount as BigDecimal.ZERO

            for (int i = 0; i < menuByStoreId.size(); i++) {
                Object[] row = (Object[]) menuByStoreId.get(i);
                System.out.println(Arrays.toString(row));

                String foodName = row[0].toString();
                BigDecimal itemPrice = new BigDecimal(row[1].toString()); // Convert to BigDecimal
                System.out.println(foodName);

                for (Order order : ordersBetweenDates) {
                    String orderedItems = order.getItemName();

                    if (orderedItems.contains(foodName)) {
                        totalVolume += 1;
                        totalAmount = totalAmount.add(itemPrice); // Use add() to accumulate BigDecimal
                        // System.out.println(totalVolume);
                    }
                }
            }
            
            System.out.println("Final Value: "+totalVolume);
            System.out.println("Final Value: "+totalAmount);

            String responseJson = "{\"totalVolume\": " + totalVolume + ", \"totalAmount\": \"" + totalAmount + "\"}";


            return responseJson;
            
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

            String top3Items = this.findTop3Items(everyItemInOrdersArray);
            System.out.println("Top 3 most frequent items: [" + top3Items + "]");
            return "["+top3Items+"]";
        }
    }


    private String generateOrderData(JSONObject data, List<Order> orders) {
        List<String> menuByStoreId = foodService.getFoodItemsByStoreId(data.getInt("storeId"));
        Map<LocalDate, Map<Integer, Integer>> ordersPerDateAndHour = calculateOrdersPerDateAndHour(orders, menuByStoreId);

        StringBuilder jsonBuilder = new StringBuilder("[");
        for (Map.Entry<LocalDate, Map<Integer, Integer>> entry : ordersPerDateAndHour.entrySet()) {
            LocalDate date = entry.getKey();
            for (Map.Entry<Integer, Integer> hourEntry : entry.getValue().entrySet()) {
                int hour = hourEntry.getKey();
                int ordersCount = hourEntry.getValue();
                LocalDateTime startDateTime = LocalDateTime.of(date, LocalTime.of(hour, 0));
                LocalDateTime endDateTime = LocalDateTime.of(date, LocalTime.of(hour, 59));
                String jsonString = "{\"datetime\": \"" + startDateTime + " to " + endDateTime + "\", \"orders\": " + ordersCount + "}";
                jsonBuilder.append(jsonString).append(",");
            }
        }
        if (jsonBuilder.length() > 1) {
            jsonBuilder.setLength(jsonBuilder.length() - 1);
        }
        jsonBuilder.append("]");

        return jsonBuilder.toString();
    }

    private Map<LocalDate, Map<Integer, Integer>> calculateOrdersPerDateAndHour(List<Order> orders, List<String> menuByStoreId) {
        Map<LocalDate, Map<Integer, Integer>> ordersPerDateAndHour = new HashMap<>();
        for (Order order : orders) {
            LocalDateTime orderDateTime = order.getTimeOfOrder().toLocalDateTime();
            LocalDate orderDate = orderDateTime.toLocalDate();
            int hour = orderDateTime.getHour();
            Map<Integer, Integer> ordersPerHour = ordersPerDateAndHour.computeIfAbsent(orderDate, k -> new HashMap<>());
            String itemListString = order.getItemName();
            itemListString = itemListString.substring(1, itemListString.length() - 1);
            String[] items = itemListString.split(", ");
            boolean orderedSpecifiedFood = false;
            for (String item : items) {
                String[] foodItems = item.split(",");
                for (String foodItem : foodItems) {
                    foodItem = foodItem.trim().replace("\"", "");
                    if (menuByStoreId.contains(foodItem)) {
                        orderedSpecifiedFood = true;
                        break;
                    }
                }
                if (orderedSpecifiedFood) {
                    break;
                }
            }
            if (orderedSpecifiedFood) {
                ordersPerHour.put(hour, ordersPerHour.getOrDefault(hour, 0) + 1);
            }
        }
        return ordersPerDateAndHour;
    }


    @PostMapping("/analytics/peak_ordering_hours")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public String getPeakorderingHours (@RequestBody String details){
        
        JSONObject data = new JSONObject(details);

        if (data.getString("startDate").isEmpty() || data.getString("endDate").isEmpty()) {
            return generateOrderData(data, orderService.getAllOrders());
        } else {
            return generateOrderData(data, orderService.orderVolume(data.getString("startDate"), data.getString("endDate")));
        }
    }


    @PostMapping("/upload")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public String uploadFile(@RequestParam("file") MultipartFile file,@RequestParam("fileName") String fileName) {
        if (file == null || file.isEmpty()) {
            return "File is empty";
        }
        
        try {
            // Specify the directory where you want to save the file

            File currentDirFile = new File(".");
            String helper = currentDirFile.getAbsolutePath();
            // String currentDir = helper.substring(0, helper.length() - 1);

            String uploadDir = helper+"/src/main/webapp/app/src/shared/images/";
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

            // Save the file to the specified directory
            String filePath = uploadDir + fileName+".jpg";
            file.transferTo(new File(filePath));

            return "File uploaded successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file";
        }
    }

}
