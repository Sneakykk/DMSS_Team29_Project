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

    public void addFoodItemByStoreId(Food food){
        foodRepository.save(food);
        return;
    }

    public Food getFoodById(int id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Food not found with id: " + id));
    }

    public List<String> getFoodItemsByStoreId(int storeId) {
        return foodRepository.findByStoreId(storeId);
    }

    public List<Object> getFoodItemsAndItemPriceByStoreId(int storeId) {
        return foodRepository.findItemNameAndItemPriceByStoreId(storeId);
    }

    public List<Food> getAllFoodByStoreId(int storeId) {
        return foodRepository.findFoodByStoreId(storeId);
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

