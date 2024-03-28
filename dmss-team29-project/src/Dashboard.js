import React, { useState, useEffect } from "react";
import Layout from "./Layout";

const Dashboard = ({ userId }) => {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/menu") // Update the URL with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  return (
    <Layout>
      <div>
        <h2>Dashboard</h2>
        <p>Welcome to your dashboard!</p>
        <h3>Menu Items</h3>
        <ul>
          {menuItems.map((item) => (
            <li key={item.ItemID}>
              {item.ItemName} - ${item.ItemPrice}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Dashboard;
