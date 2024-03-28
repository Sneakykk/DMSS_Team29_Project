import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import Navbar from "./Navbar";
import "./Cart.css"; // Import Cart.css for styling

const Cart = ({ userId }) => {
  const location = useLocation();
  const { cartItems } = location.state || {}; // Retrieve cartItems from location state
  console.log("In Cart.js, the cartItems are: ", cartItems);
  console.log("The userId is: ", userId);
  const [updatedCartItems, setUpdatedCartItems] = useState([]);

  useEffect(() => {
    // Initialize cart items with quantity property
    const initializedCartItems = cartItems.map((item) => ({
      ...item,
      quantity: 1,
    }));
    setUpdatedCartItems(initializedCartItems);
  }, [cartItems]);

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...updatedCartItems];
    updatedItems[index].quantity += change;
    if (updatedItems[index].quantity < 1) {
      updatedItems.splice(index, 1); // Remove item if quantity becomes zero or negative
    }
    setUpdatedCartItems(updatedItems);
  };

  const totalPrice = updatedCartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div>
      {/* <Navbar /> */}
      <h1>Cart</h1>
      <div className="cart-container">
        <div className="cart-header">
          <div className="cart-heading">Item Name</div>
          <div className="cart-heading">Price</div>
          <div className="cart-heading">Quantity</div>
        </div>
        <hr />
        <ul>
          {updatedCartItems &&
            updatedCartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-details1">{item.itemName}</div>
                <div className="item-details2">${item.price.toFixed(2)}</div>
                <div className="item-details3">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <hr />
        <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Cart;
