import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../Navbar";
import "../../shared/layout/Cart.css"; // Import Cart.css for styling
import GooglePayButton from "@google-pay/button-react";

const Cart = () => {
  const location = useLocation();
  const { cartItems } = location.state || {};

  const [updatedCartItems, setUpdatedCartItems] = useState();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUpdatedCartItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData({ ...parsedUserData });
    }
  }, []);

  const handleQuantityChange = (index, change) => {
    const updatedItems = { ...updatedCartItems };
    updatedItems.items[index].qty += change;
    if (updatedItems.items[index].qty < 1) {
      updatedItems.items.splice(index, 1);
    }
    setUpdatedCartItems(updatedItems);
    console.log(updatedCartItems);
  };

  const totalPrice = () => {
    if (updatedCartItems && updatedCartItems.items) {
      return updatedCartItems.items
        .reduce((acc, item) => {
          return acc + item.foodPrice * item.qty;
        }, 0)
        .toFixed(2);
    } else {
      return 0;
    }
  };

  const checkoutOrder = async () => {
    const currentDate = Date.now();
    // const dateObject = new Date(currentDate);
    // const timestamp = dateObject.getTime();

    const hoursInMilliseconds = 8 * 60 * 60 * 1000; // 24 hours in milliseconds
    const newTimestamp = currentDate - hoursInMilliseconds;
    const dateTimestamp = new Date(newTimestamp).getTime();

    // const doo = new Date(timestamp);
    // console.log(`the timestamp is : ${doo.toString()}`);
    let foodNames = updatedCartItems.items.map((item) => item.foodName);
    let quantities = updatedCartItems.items.map((item) => item.qty);

    const firstStoreId = updatedCartItems.items[0].storeId;
    const allSameStoreId = updatedCartItems.items.every(
      (item) => item.storeId === firstStoreId
    );
    const orderStatus = allSameStoreId
      ? "Sending Orders"
      : "Sending Orders,Sending Orders";

    // const randomFourDigitNumber = Math.floor(Math.random() * 10000);
    // const fourDigitUuid = randomFourDigitNumber.toString().padStart(4, '0');
    const finalOrderDetails = {
      // "orderId": fourDigitUuid,
      employeeId: userData.employeeId,
      itemName: JSON.stringify(foodNames),
      //timeOfOrder: timestamp,
      timeOfOrder: dateTimestamp,
      totalBill: totalPrice(),
      quantity: JSON.stringify(quantities),
      orderStatus: orderStatus,
      mixedStores: !allSameStoreId,
    };

    console.log(finalOrderDetails);

    try {
      const response = await fetch(
        "https://152.42.233.119:8443/api/add_order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...finalOrderDetails }),
        }
      );

      if (response.ok) {
        console.log("Order added successfully");
        // Here, you can integrate Google Pay payment processing
        // For example, after adding the order successfully, initiate the Google Pay payment flow

        //window.location.href = "/dashboard";
      } else {
        console.error("Failed to add order");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const paymentRequestData = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US",
    },
  };

  return (
    <div>
      <Navbar />
      <h1>Cart</h1>
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
          {updatedCartItems &&
            updatedCartItems.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.foodName}</td>
                <td>${item.foodPrice.toFixed(2)}</td>
                <td>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total Price: ${totalPrice()}</td>
          </tr>
        </tfoot>
      </table>
      <GooglePayButton
        environment="TEST"
        paymentRequest={paymentRequestData}
        onLoadPaymentData={(paymentRequest) => {
          console.log("load payment data", paymentRequest);
        }}
      />
      <button className="checkout-button" onClick={checkoutOrder}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
