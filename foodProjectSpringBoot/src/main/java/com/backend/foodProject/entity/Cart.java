package com.backend.foodProject.entity;
import com.backend.foodProject.entity.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Cart {

    @Id
    private int id;

    @Transient
    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cart_id")
    private List<Food> itemsInCart;
    
    @Transient
    private int foodItemCount;
    // private Order currentOrder;

    @Transient
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

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

    public int getItemId() {
    return id;
}

    // public Order confirmOrder()
    // {
    //     return currentOrder;
    // }

}