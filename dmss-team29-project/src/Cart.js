import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleSubmitOrder = async () => {
    // Construct the order data
    const orderData = {
      userName: userId, // Assuming userId is the employee's ID
      items: updatedCartItems.map(item => ({
        itemID: item.itemId,
        itemName: item.itemName, 
        itemCount: item.quantity
      })),
      totalPrice: totalPrice,
      // additional order details as needed
    };
  
    try {
      // POST request to your server endpoint to submit the order
      const response = await fetch('http://localhost:3001/submit-order', { // use the correct server endpoint here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        // Handle a successful submission
        console.log('Order submitted successfully');
        navigate('/food');
        // Redirect or display a success message
      } else {
        // Handle responses that aren't a 200 OK
        console.error('Order submission failed');
        // Display an error message
      }
    } catch (error) {
      // Handle any network errors
      console.error('Network error on order submission:', error);
      // Display an error message
    }
  };
  

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
        <button onClick={handleSubmitOrder}>Submit Order</button>
      </div>
    </div>
  );
};

export default Cart;
