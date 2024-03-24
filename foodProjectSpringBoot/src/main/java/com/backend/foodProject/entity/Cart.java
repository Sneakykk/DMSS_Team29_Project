package com.backend.foodProject.entity;

import com.backend.foodProject.entity.*;

import java.util.List;

public class Cart {

    private int id;
    private List<Food> itemsInCart;
    private int foodItemCount;
    private Order currentOrder;

    public Cart()
    {

    }

    public void showCart()
    {

    }

    public void deleteFoodFromCart(Food item)
    {
        itemsInCart.remove(item);
    }

    public void addFoodItem (Food food){
        itemsInCart.add(food);
    }

    public Food getFoodItemInCart(Food item)
    {
        for(Food food: itemsInCart)
        {
            if (item.getItemId() == food.getItemId())
            {
                return food;
            }
        }
        return null;
    }

    public int countFoodItem(Food food)
    {
        int i = 0;

        for(Food food2: itemsInCart)
        {
            if (food.getItemId() == (food2.getItemId()))
            {
                i++;
            }
        }

        return i;
    }

    public Order confirmOrder()
    {
        return currentOrder;
    }

}