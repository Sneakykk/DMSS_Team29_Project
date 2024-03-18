public class FoodItem {
    private Long id;
    private String foodName;
    private double foodPrice;

    public FoodItem(Long id, String foodName, double foodPrice) {
        this.id = id;
        this.foodName = foodName;
        this.foodPrice = foodPrice;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public double getFoodPrice() {
        return foodPrice;
    }

    public void setFoodPrice(double foodPrice) {
        this.foodPrice = foodPrice;
    }
}

public class MockData {

    public static List<FoodItem> getMockFoodItems() {
        List<FoodItem> foodItems = new ArrayList<>();
        foodItems.add(new FoodItem(1L, "Pizza", 10.99));
        foodItems.add(new FoodItem(2L, "Burger", 5.99));
        foodItems.add(new FoodItem(3L, "Pasta", 8.49));
        foodItems.add(new FoodItem(4L, "Salad", 7.29));
        foodItems.add(new FoodItem(5L, "Steak", 15.99));
        foodItems.add(new FoodItem(6L, "Sushi", 12.99));
        foodItems.add(new FoodItem(7L, "Sandwich", 6.49));
        foodItems.add(new FoodItem(8L, "Fries", 3.99));
        foodItems.add(new FoodItem(9L, "Soup", 4.99));
        foodItems.add(new FoodItem(10L, "Taco", 9.99));
        foodItems.add(new FoodItem(11L, "Chicken Wings", 8.99));
        foodItems.add(new FoodItem(12L, "Fish and Chips", 11.49));
        return foodItems;
    }
}