package com.backend.foodProject.Service;

import com.backend.foodProject.entity.Cart;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    private final List<Cart> cartItems = new ArrayList<>();

    // Method to add an item to the cart
    public void addItemToCart(Cart cartItem) {
        cartItems.add(cartItem);
    }

    // Method to remove an item from the cart by ID
    public void removeItemFromCart(int itemId) {
        cartItems.removeIf(cartItem -> cartItem.getItemId() == itemId);
    }

    // Method to retrieve all items in the cart
    public List<Cart> getAllItemsInCart() {
        return cartItems;
    }

    // Method to retrieve an item from the cart by ID
    public Cart getItemById(int itemId) {
        return cartItems.stream()
                .filter(cartItem -> cartItem.getItemId() == itemId)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found with ID: " + itemId));
    }

    // Method to clear the entire cart
    public void clearCart() {
        cartItems.clear();
    }

    // Add other methods as needed based on your application requirements
}




// package com.backend.foodProject.Service;

// import com.backend.foodProject.entity.Cart;
// import com.backend.foodProject.repo.CartRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class CartService {

//     private final CartRepository cartItemRepository;

//     @Autowired
//     public CartService(CartRepository cartItemRepository) {
//         this.cartItemRepository = cartItemRepository;
//     }

//     // Method to add an item to the cart
//     public Cart addItemToCart(Cart cartItem) {
//         return cartItemRepository.save(cartItem);
//     }

//     // Method to remove an item from the cart by ID
//     public void removeItemFromCart(int itemId) {
//         cartItemRepository.deleteById(itemId);
//     }

//     // Method to retrieve all items in the cart
//     public List<Cart> getAllItemsInCart() {
//         return cartItemRepository.findAll();
//     }

//     // Method to retrieve an item from the cart by ID
//     public Cart getItemById(int itemId) {
//         return cartItemRepository.findById(itemId)
//                 .orElseThrow(() -> new RuntimeException("Item not found with ID: " + itemId));
//     }

//     // Method to update an item in the cart. Leaving here to use later?
// //    public Cart updateItemInCart(Long itemId, Cart cart) {
// //        Cart existingItem = getItemById(itemId);
// //        existingItem.setName(updatedItem.getName());
// //        existingItem.setPrice(updatedItem.getPrice());
// //        // Update other fields as needed
// //        return cartItemRepository.save(existingItem);
// //    }

//     // Method to clear the entire cart
//     public void clearCart() {
//         cartItemRepository.deleteAll();
//     }

//     // Add other methods as needed based on your application requirements

// }
