import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar";
import "../../shared/layout/OrderHistory.css"; // Import OrderHistory.css for styling

const OrderHistory = () => {
  const [userData, setUserData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    // Retrieve user data from localStorage when component mounts
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  useEffect(() => {
    if (userData && userData.employeeId) {
      const searchBody = {
        ...searchCriteria,
        id: userData.employeeId,
      };
      loadOrderHistory(searchBody);
    }
  }, [userData, searchCriteria]);

  const loadOrderHistory = async (searchData) => {
    try {
      console.log(searchData);
      const response = await fetch(
        "https://152.42.249.86:8443/api/employee/get_food_history",
        {
          // Update to your backend endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetch Order History Successfully!", data);
        setOrderHistory(data);
      } else {
        console.error("Failed to get Order History");
        // setError('Login failed. Please try again.');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error("An error occurred:", error);
    }
  };

  const formatDate = (orderDate) => {
    const date = new Date(orderDate);

    // Extract the date and time components
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    // Format the date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const onChangeSearchCriteria = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  const searchButton = (e) => {
    e.preventDefault();
    const searchBody = {
      ...searchCriteria,
      id: userData.employeeId,
    };
    loadOrderHistory(searchBody);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Pad month and day with leading zeros if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Navbar /> {/* Include the same navbar */}
      <div className="container">
        <div className="search-container">
          Start Date
          <input
            onChange={onChangeSearchCriteria}
            name="startDate"
            type="date"
            placeholder="Start Date"
            max={getCurrentDate()}
          />
          End Date
          <input
            onChange={onChangeSearchCriteria}
            name="endDate"
            type="date"
            placeholder="End Date"
            max={getCurrentDate()}
          />
          <button className="search-button" onClick={searchButton}>
            Search
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Orders</th>
              <th>Qty</th>
              <th>Ordered Date</th>
              <th>Price($)</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {/* <td>{order.itemName}</td> */}
                <td>
                  {/* Split the itemName string into an array and map over it */}
                  {order.itemName
                    .replace(/[[\]]/g, "")
                    .split(",")
                    .map((item, i) => (
                      <div key={i}>
                        {i + 1}: {item.replace(/['"]/g, "").trim()}
                      </div>
                    ))}
                </td>
                <td>
                  {/* Split the quantity string into an array and map over it */}
                  {order.quantity
                    .replace(/[[\]]/g, "")
                    .split(",")
                    .map((item, i) => (
                      <div key={i}> x{item.trim()}</div>
                    ))}
                </td>
                <td>{formatDate(order.timeOfOrder)}</td>
                <td>${order.totalBill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
