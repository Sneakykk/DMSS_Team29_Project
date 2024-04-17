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
import java.sql.Timestamp;

import com.backend.foodProject.entity.*;

import java.util.*;
import java.util.stream.Collectors;
import java.time.*;
import java.math.BigDecimal;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

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

    @PostMapping("/dashboard/get_order_status")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public List<Order> getOrderStatusNotCompleted (@RequestBody int storeId)
    {
        
        List<Order> orders = orderService.getOrderStatusNotCompleted();
        List<String> foodByStoreId = foodService.getFoodItemsByStoreId(storeId);
        System.out.println(orders);
        System.out.println(foodByStoreId);

        Set<Integer> checkedOrderIds = new HashSet<>();
        List<Order> ordersContainingFood = new ArrayList<>();

              for (int i = 0; i < foodByStoreId.size(); i++) {
                    String foodName = foodByStoreId.get(i);
            // Loop through orders
            for (Order order : orders) {
                // Check if this order has already been checked
                if (!checkedOrderIds.contains(order.getOrderId())) {
                    // Check if the ordered items contain the food name
                    if (order.getItemName().contains(foodName)) {
                        ordersContainingFood.add(order);
                        checkedOrderIds.add(order.getOrderId()); // Mark this order as checked
                    }
                }
            }
        }

        return ordersContainingFood;
    }

    @PostMapping("/dashboard/user/get_order_status")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public List<Order> getUserOrderStatusNotCompleted (@RequestBody int employeeId)
    {
        
        // List<Order> orders = orderService.findByEmployeeIdAndOrderStatusNotCompleted(employeeId);

        return orderService.getOrderStatusNotCompletedByEmployeeId(employeeId);
    }


    @PostMapping("/dashboard/update_order_status")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public void updateOrderStatus (@RequestBody String details)
    {
        JSONObject data = new JSONObject(details);
        Order order = new Order();
        order.setEmployeeId(data.getInt("employeeId"));
        order.setItemName(data.getString("itemName"));
        order.setMixedStores(data.getBoolean("mixedStores"));
        order.setOrderStatus(data.getString("orderStatus"));
        order.setQuantity(data.getString("quantity"));
        order.setTotalBill(data.getFloat("totalBill"));
        String timeOfOrderString = data.getString("timeOfOrder");
        Timestamp timeOfOrder = Timestamp.valueOf(timeOfOrderString);
        order.setTimeOfOrder(timeOfOrder);


        orderService.updateOrder(data.getInt("orderId"),order);

        return;

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
    
    @PostMapping("/delete_food_by_itemId")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public void deleteFoodById (@RequestBody String details)
    {
        try{
            JSONObject data = new JSONObject(details);
            foodService.deleteFood(data.getInt("itemId"));
            deleteFile(data.getString("fileName"));
        } catch(Exception e){
            System.out.println("An error occurred: "+e);
        }
        return;
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

            // Return Today

            // return orderService.findByEmployeeId(data.getInt("id"));
            // return "{\"totalVolume\": 0, \"totalAmount\": \"0\"}";
            LocalDateTime today = LocalDateTime.now();
            LocalDateTime startOfDay = today.toLocalDate().atStartOfDay();
            LocalDateTime endOfDay = today.toLocalDate().atTime(LocalTime.MAX);

            // Format the start of the day as a string
            String formattedStartOfDay = startOfDay.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            // Format the end of the day as a string
            String formattedEndOfDay = endOfDay.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));


            List<Order> ordersBetweenDates =  orderService.orderVolume(formattedStartOfDay,formattedEndOfDay);
            List<Object> menuByStoreId = foodService.getFoodItemsAndItemPriceByStoreId(data.getInt("storeId"));
            
            int totalVolume = 0; 
            BigDecimal totalAmount = BigDecimal.ZERO; // Initialize totalAmount as BigDecimal.ZERO
            
            outer:
            for (Order order : ordersBetweenDates) {
                String[] orderedItems = order.getItemName().replaceAll("[\\[\\]\"]", "").split(","); // Split and remove square brackets and quotes
                middle:
                for (String item : orderedItems) {
                    // Trim each item to remove leading/trailing spaces
                    String trimmedItem = item.trim();
                    // Check if the trimmed item exists in the menuByStoreId
                    inner:
                    for (Object menuEntry : menuByStoreId) {
                        Object[] row = (Object[]) menuEntry;
                        String foodName = row[0].toString();
                        // Check if the food name matches the trimmed item
                        if (foodName.equals(trimmedItem)) {
                            // Item found in the menu, do something
                            totalVolume += 1;;
                            break middle; // Stop searching for this item in the menu
                        }
                    }
                }
            }
            for (int i = 0; i < menuByStoreId.size(); i++) {
                Object[] row = (Object[]) menuByStoreId.get(i);
                System.out.println(Arrays.toString(row));

                String foodName = row[0].toString();
                BigDecimal itemPrice = new BigDecimal(row[1].toString()); // Convert to BigDecimal
                // System.out.println("Menu store: "+foodName);

                for (Order order : ordersBetweenDates) {
                    String orderedItems = order.getItemName();
                    System.out.println("orderNames: "+order.getItemName());
                    if (orderedItems.contains(foodName)) {
                        String[] orderedItemsArr = orderedItems.replaceAll("[\\[\\]\"]", "").split(","); // Split and remove square brackets and quotes
                        int index = -1; // Initialize index variable
                        for (int j = 0; j < orderedItemsArr.length; j++) {
                            if (orderedItemsArr[j].equals(foodName)) {
                                index = j;
                                break; // Exit the loop once the item is found
                            }
                        }
                        if (index != -1) {
                            String[] orderedQuantityArr = order.getQuantity().replaceAll("[\\[\\]\"]", "").split(",");
                            // System.out.println("Price: "+(itemPrice*orderedQuantityArr[index]));
                            BigDecimal bigDecimalValue = itemPrice; // Convert String to BigDecimal
                            System.out.println(index);
                            System.out.println(orderedQuantityArr[0]);
                            BigDecimal total = bigDecimalValue.multiply(BigDecimal.valueOf(Long.parseLong(orderedQuantityArr[index])));
                            totalAmount = totalAmount.add(total); // Use add() to accumulate BigDecimal
                            // System.out.println(totalVolume);
                        }
                        
                    }
                }
            }
            
            System.out.println("Final Value: "+totalVolume);
            System.out.println("Final Value: "+totalAmount);

            String responseJson = "{\"totalVolume\": " + totalVolume + ", \"totalAmount\": \"" + totalAmount + "\"}";


            return responseJson;

        }else{

            List<Order> ordersBetweenDates =  orderService.orderVolume(data.getString("startDate"),data.getString("endDate"));
            List<Object> menuByStoreId = foodService.getFoodItemsAndItemPriceByStoreId(data.getInt("storeId"));
            
            int totalVolume = 0; 
            BigDecimal totalAmount = BigDecimal.ZERO; // Initialize totalAmount as BigDecimal.ZERO
            
            outer:
            for (Order order : ordersBetweenDates) {
                String[] orderedItems = order.getItemName().replaceAll("[\\[\\]\"]", "").split(","); // Split and remove square brackets and quotes
                middle:
                for (String item : orderedItems) {
                    // Trim each item to remove leading/trailing spaces
                    String trimmedItem = item.trim();
                    // Check if the trimmed item exists in the menuByStoreId
                    inner:
                    for (Object menuEntry : menuByStoreId) {
                        Object[] row = (Object[]) menuEntry;
                        String foodName = row[0].toString();
                        // Check if the food name matches the trimmed item
                        if (foodName.equals(trimmedItem)) {
                            // Item found in the menu, do something
                            totalVolume += 1;;
                            break middle; // Stop searching for this item in the menu
                        }
                    }
                }
            }
            for (int i = 0; i < menuByStoreId.size(); i++) {
                Object[] row = (Object[]) menuByStoreId.get(i);
                System.out.println(Arrays.toString(row));

                String foodName = row[0].toString();
                BigDecimal itemPrice = new BigDecimal(row[1].toString()); // Convert to BigDecimal
                // System.out.println("Menu store: "+foodName);

                for (Order order : ordersBetweenDates) {
                    String orderedItems = order.getItemName();
                    System.out.println("orderNames: "+order.getItemName());
                    if (orderedItems.contains(foodName)) {
                        String[] orderedItemsArr = orderedItems.replaceAll("[\\[\\]\"]", "").split(","); // Split and remove square brackets and quotes
                        int index = -1; // Initialize index variable
                        for (int j = 0; j < orderedItemsArr.length; j++) {
                            if (orderedItemsArr[j].equals(foodName)) {
                                index = j;
                                break; // Exit the loop once the item is found
                            }
                        }
                        if (index != -1) {
                            String[] orderedQuantityArr = order.getQuantity().replaceAll("[\\[\\]\"]", "").split(",");
                            // System.out.println("Price: "+(itemPrice*orderedQuantityArr[index]));
                            BigDecimal bigDecimalValue = itemPrice; // Convert String to BigDecimal
                            System.out.println(index);
                            System.out.println(orderedQuantityArr[0]);
                            BigDecimal total = bigDecimalValue.multiply(BigDecimal.valueOf(Long.parseLong(orderedQuantityArr[index])));
                            totalAmount = totalAmount.add(total); // Use add() to accumulate BigDecimal
                            // System.out.println(totalVolume);
                        }
                        
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
        Map<Integer, Double> averageOrdersPerHour = calculateAverageOrdersPerHour(orders, menuByStoreId);

        StringBuilder jsonBuilder = new StringBuilder("[");
        for (Map.Entry<Integer, Double> entry : averageOrdersPerHour.entrySet()) {
            int hour = entry.getKey();
            double averageOrders = entry.getValue();
            String jsonString = "{\"hour\": \"" + hour + "\", \"averageOrders\": " + averageOrders + "}";
            jsonBuilder.append(jsonString).append(",");
        }
        if (jsonBuilder.length() > 1) {
            jsonBuilder.setLength(jsonBuilder.length() - 1);
        }
        jsonBuilder.append("]");

        return jsonBuilder.toString();
    }

    private Map<Integer, Double> calculateAverageOrdersPerHour(List<Order> orders, List<String> menuByStoreId) {
        Map<Integer, Map<Integer, Integer>> ordersPerDayAndHour = new HashMap<>();

        // Initialize ordersPerDayAndHour map
        for (Order order : orders) {
            LocalDateTime orderDateTime = order.getTimeOfOrder().toLocalDateTime();
            int dayOfYear = orderDateTime.getDayOfYear();
            int hour = orderDateTime.getHour();
            
            if (hour >= 8 && hour <= 18) {
                ordersPerDayAndHour.putIfAbsent(dayOfYear, new HashMap<>());
                ordersPerDayAndHour.get(dayOfYear).put(hour, ordersPerDayAndHour.get(dayOfYear).getOrDefault(hour, 0) + 1);
            }
        }

    // Calculate total orders per hour across all days
    Map<Integer, Integer> totalOrdersPerHour = new HashMap<>();
    for (Map<Integer, Integer> ordersPerHour : ordersPerDayAndHour.values()) {
        for (Map.Entry<Integer, Integer> entry : ordersPerHour.entrySet()) {
            int hour = entry.getKey();
            int ordersCount = entry.getValue();
            totalOrdersPerHour.put(hour, totalOrdersPerHour.getOrDefault(hour, 0) + ordersCount);
        }
    }

    // Calculate average orders per hour
    Map<Integer, Double> averageOrdersPerHour = new HashMap<>();
    int numDays = ordersPerDayAndHour.size();
    for (int hour = 8; hour <= 18; hour++) {
        int totalOrdersForHour = totalOrdersPerHour.getOrDefault(hour, 0);
        averageOrdersPerHour.put(hour, (double) totalOrdersForHour / numDays);
    }

    return averageOrdersPerHour;
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
    public String uploadImage(@RequestParam("file") MultipartFile file,@RequestParam("fileName") String fileName) {
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
           
            // Save the file to the specified directory
            String uploadPath = uploadDir + fileName+".jpg";

            Path filePath = Paths.get(uploadPath);
            // Delete existing file if it exists
            Files.deleteIfExists(filePath);

            file.transferTo(new File(uploadPath));

            return "File uploaded successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file";
        }
    }

    @PostMapping("/get_image")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000
    public ResponseEntity<byte[]> getImage(@RequestBody String details) throws IOException {
        JSONObject data = new JSONObject(details);
        File currentDirFile = new File(".");
        String helper = currentDirFile.getAbsolutePath();

        String filePath = helper+"/src/main/webapp/app/src/shared/images/"+data.getString("imageName")+".jpg";

        Path imagePath = Paths.get(filePath);
        byte[] imageBytes = Files.readAllBytes(imagePath);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Adjust content type if necessary

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
    

    public static void deleteFile(String fileName){
        
        File currentDirFile = new File(".");
        String helper = currentDirFile.getAbsolutePath();

        String deleteFilePath = helper+"/src/main/webapp/app/src/shared/images/"+fileName+".jpg";
        System.out.println(deleteFilePath);
        File fileToDelete = new File(deleteFilePath);

        if (fileToDelete.exists()) {
            // Attempt to delete the file
            boolean deleted = fileToDelete.delete();

            // Check if the file was successfully deleted
            if (deleted) {
                System.out.println("File deleted successfully.");
            } else {
                System.out.println("Failed to delete the file.");
            }
        } else {
            System.out.println("File does not exist.");
        }
    }

}
