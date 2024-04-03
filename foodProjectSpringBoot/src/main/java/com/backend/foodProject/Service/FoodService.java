package com.backend.foodProject.Service;

import com.backend.foodProject.entity.Food;
import com.backend.foodProject.repo.FoodRepository;
import jakarta.persistence.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // public List<Food> getAllMenu(){
    //     List<Object[]> results = foodRepository.getAllMenu();
    //     List<Food> foods = new ArrayList<>();
    //     for (Object[] result : results) {
    //         Food food = new Food();
    //         food.setItemId((Integer) result[0]);
    //         food.setItemName((String) result[1]);
    //         food.setItemPrice((Float) result[2]);
    //         food.setStoreId((Integer) result[3]);
    //         food.setItemType((String) result[4]);
    //         // Set other attributes if needed
    //         foods.add(food);
    //     }
    //     return foods;

    // }

    public Food getFoodById(int id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Food not found with id: " + id));
    }

    public List<Food> getFoodItemsByStoreId(int storeId) {
        return foodRepository.findByStoreId(storeId);
    }

    public Food createFood(Food food) {
        return foodRepository.save(food);
    }

    public Food updateFood(int id, Food food) {
        if (!foodRepository.existsById(id)) {
            throw new EntityNotFoundException("Food not found with id: " + id);
        }
        food.setItemId(id); // Ensure the ID is set for update
        return foodRepository.save(food);
    }


    public void deleteFood(int id) {
        if (!foodRepository.existsById(id)) {
            throw new EntityNotFoundException("Food not found with id: " + id);
        }
        foodRepository.deleteById(id);
    }

    public List<String> getUnqiueTypeArray(){
        return foodRepository.getUniqueFoodType();
    }
    
}

