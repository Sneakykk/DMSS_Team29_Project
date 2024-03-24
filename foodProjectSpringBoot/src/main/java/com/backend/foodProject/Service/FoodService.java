package com.backend.foodProject.Service;

import com.backend.foodProject.entity.Food;
import com.backend.foodProject.repo.FoodRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public List<Food> getAllFood() {
        return foodRepository.findAll();
    }

    public Food getFoodById(int id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Food not found with id: " + id));
    }

    public List<Food> getFoodItemsByStoreID(int storeID) {
        return foodRepository.findByStoreID(storeID);
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
}

