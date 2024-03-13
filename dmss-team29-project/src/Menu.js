import React, { useState, useEffect } from 'react';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/menu') // Make a GET request to your Node.js server
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error fetching menu data:', error));
  }, []);

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {menuItems.map(item => (
          <li key={item.ItemID}>
            {item.ItemName} - ${item.ItemPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
