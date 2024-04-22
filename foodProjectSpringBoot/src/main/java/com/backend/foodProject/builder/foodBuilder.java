package com.backend.foodProject.builder;


public class FoodBuilder {
    private String itemName;
    private float itemPrice;
    private String itemType;
    private int storeId;

    public FoodBuilder() {}

    public FoodBuilder itemName(String itemName) {
        this.itemName = itemName;
        return this;
    }

    public FoodBuilder itemPrice(float itemPrice) {
        this.itemPrice = itemPrice;
        return this;
    }

    public FoodBuilder itemType(String itemType) {
        this.itemType = itemType;
        return this;
    }

    public FoodBuilder storeId(int storeId) {
        this.storeId = storeId;
        return this;
    }

    public Food build() {
        Food food = new Food();
        food.setItemName(this.itemName);
        food.setItemPrice(this.itemPrice);
        food.setItemType(this.itemType);
        food.setStoreId(this.storeId);
        return food;
    }
}
