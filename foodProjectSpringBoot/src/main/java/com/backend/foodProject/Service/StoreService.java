package com.backend.foodProject.Service;
import com.backend.foodProject.entity.Store;
import com.backend.foodProject.repo.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreService {

    private final StoreRepository storeRepository;

    @Autowired
    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    public Store addStore(Store store) {
        // Insert the store into the database
        return storeRepository.save(store);
    }

    // Method to retrieve all stores
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    // Method to find a store by ID
    public Optional<Store> findStoreById(int id) {
        return storeRepository.findById(id);
    }
}
