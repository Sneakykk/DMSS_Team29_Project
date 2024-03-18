import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Navbar';
import '../../shared/layout/Cart.css'; // Import Cart.css for styling

const Cart = () => {
    const location = useLocation();
    const { cartItems } = location.state || {}; // Retrieve cartItems from location state

    const [updatedCartItems, setUpdatedCartItems] = useState();

    useEffect(() => {
        // Initialize cart items with quantity property
        //const initializedCartItems = cartItems.map(item => ({ ...item, quantity: 1 }));
        setUpdatedCartItems(cartItems);
    }, [cartItems]);

    const handleQuantityChange = (index, change) => {
        const updatedItems = {...updatedCartItems};
        updatedItems.items[index].qty += change;
        if (updatedItems.items[index].qty < 1) {
            updatedItems.items.splice(index, 1); // Remove item if quantity becomes zero or negative
        }
        setUpdatedCartItems(updatedItems);
    };

    //console.log(updatedCartItems.items)
    const totalPrice = () => {
        if (updatedCartItems && updatedCartItems.items) { // Check if updatedCartItems and updatedCartItems.items are not undefined

            return updatedCartItems.items.reduce((acc, item) => {

                return acc + (item.foodPrice * item.qty);
            }, 0).toFixed(2);
        } else {
            return 0; // Return 0 if updatedCartItems or updatedCartItems.items is undefined
        }
    }

    return (
        <div>
            <Navbar /> 
            <h1>Cart</h1>
            {/* <div className="cart-container">
                <div className="cart-header">
                    <div className="cart-heading" style={{paddingInlineStart: "40px"}}>Item Name</div>
                    <div className="cart-heading">Price</div>
                    <div className="cart-heading">Quantity</div>
                </div>
                <hr />
                <ul >
                    {updatedCartItems && updatedCartItems.items.map((item, index) => (
                        <li  key={index} className="cart-item">
                            <div className="item-details1">{item.foodName}</div>
                            <div className="item-details2">${item.foodPrice.toFixed(2)}</div>
                            <div className="item-details3">
                                <button className="quantity-btn" onClick={() => handleQuantityChange(index, -1)}>-</button>
                                <span>{item.qty}</span>
                                <button className="quantity-btn" onClick={() => handleQuantityChange(index, 1)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <hr />

                <div className="total-price" style={{paddingInlineStart: "40px"}}>Total Price: ${totalPrice()}</div> */}

                <table>
                    <thead>
                        <tr>
                        <th>S/N</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    {updatedCartItems && updatedCartItems.items.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.foodName}</td>
                                <td>${item.foodPrice.toFixed(2)}</td>
                                <td>
                                <button className="quantity-btn" onClick={() => handleQuantityChange(index, -1)}>-</button>
                                <span>{item.qty}</span>
                                <button className="quantity-btn" onClick={() => handleQuantityChange(index, 1)}>+</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colspan="2">Total Price: ${totalPrice()}</td>
                        </tr>
                    </tfoot>
                    </table>
        </div>
    );
};

export default Cart;
