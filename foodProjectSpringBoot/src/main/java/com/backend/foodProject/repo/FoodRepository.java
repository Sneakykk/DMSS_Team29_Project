package com.backend.foodProject.repo;


import com.backend.foodProject.entity.Food;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
    List<Food> findByStoreId(int storeId);

    // @Query("SELECT f FROM Food f")
    @Query("SELECT f.itemId, f.itemName, f.itemPrice, f.storeId, f.itemType FROM Food f")
    List<Object[]> getAllMenu();
}
