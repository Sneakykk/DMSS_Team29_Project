package com.backend.foodProject.repo;


import com.backend.foodProject.entity.Food;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
    @Query("SELECT f.itemName FROM Food f WHERE f.storeId = :storeId")
    List<String> findByStoreId(int storeId);

    @Query("SELECT f.itemName, f.itemPrice FROM Food f WHERE f.storeId = :storeId")
    List<Object> findItemNameAndItemPriceByStoreId(int storeId);

    // @Query("SELECT f FROM Food f")
    @Query("SELECT f.itemId, f.itemName, f.itemPrice, f.storeId, f.itemType FROM Food f")
    List<Object[]> getAllMenu();

    List<Food> findFoodByStoreId(int storeId);

    @Query(value="SELECT DISTINCT TYPE FROM MENU", nativeQuery = true)
    List<String> getUniqueFoodType();
    
}
