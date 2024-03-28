import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
import "./Food.css"; // Import Food.css for styling
import { FaShoppingCart } from "react-icons/fa"; // Import FaShoppingCart

const Food = ({ userId }) => {
  const [clickedMenu, setClickedMenu] = useState(null);
  const [importedImages, setImportedImages] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchDinnerItems, setLunchDinnerItems] = useState([]);
  const [drinksItems, setDrinksItems] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate hook
  console.log("In food.js, the userId is: ", userId);

  useEffect(() => {
    importImages();
    fetchMenuItems("Breakfast", setBreakfastItems);
    fetchMenuItems("LunchAndDinner", setLunchDinnerItems);
    fetchMenuItems("Drinks", setDrinksItems);
  }, []);

  const fetchMenuItems = async (menuType, setterFunction) => {
    try {
      const response = await fetch(`http://localhost:3001/${menuType}`);
      if (!response.ok) {
        throw new Error(`Error throwing ${menuType} items`);
      }
      const data = await response.json();
      setterFunction(data);
    } catch (error) {
      console.error(`Error fetching ${menuType} menu items:`, error);
    }
  };

  const importImages = async () => {
    const imageContext = require.context(
      "./images/",
      false,
      /\.(png|jpe?g|svg)$/
    );
    const imageKeys = imageContext.keys();
    const importedImages = {};
    for (const key of imageKeys) {
      const imageName = key.replace("./", "");
      const image = await import(`./images/${imageName}`);
      importedImages[imageName] = image.default;
    }
    setImportedImages(importedImages);
  };

  const handleMenuClick = (menu) => {
    console.log("Clicked menu:", menu);
    console.log("Previous clicked menu:", clickedMenu);

    if (clickedMenu !== menu) {
      setClickedMenu(menu); // Open dropdown for the clicked menu
    } else {
      setClickedMenu(null); // Close dropdown if already open
    }
  };

  const handleAddToCart = (itemId, itemName, price) => {
    // Add the item to the cart
    setCartItems([...cartItems, { itemId, itemName, price }]);
  };

  return (
    <div>
      {/* <Navbar />  */}
      <h1 align="center">MENU</h1>
      <div className="food-container">
        {/* Button for Breakfast */}
        <div className={`menu ${clickedMenu === "Breakfast" ? "clicked" : ""}`}>
          <button
            className="menu-btn"
            onClick={() => handleMenuClick("Breakfast")}
          >
            Breakfast
          </button>
          {/* Dropdown content for Breakfast */}
          {clickedMenu === "Breakfast" && (
            <div className="dropdown-content">
              {breakfastItems.map((item) => (
                <div className="food-card">
                  <img src={importedImages["KayaToast.jpg"]} alt="Kaya Toast" />
                  <h3>{item.ItemName}</h3>
                  <p>Price: ${item.ItemPrice}</p>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        item.ItemID,
                        item.ItemName,
                        item.ItemPrice
                      )
                    }
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Button for Lunch */}
        <div className={`menu ${clickedMenu === "Lunch" ? "clicked" : ""}`}>
          <button className="menu-btn" onClick={() => handleMenuClick("Lunch")}>
            Lunch and Dinner
          </button>
          {/* Dropdown content for Lunch */}
          {clickedMenu === "Lunch" && (
            <div className="dropdown-content">
              {lunchDinnerItems.map((item) => (
                <div className="food-card">
                  <img src={importedImages["KayaToast.jpg"]} alt="Kaya Toast" />
                  <h3>{item.ItemName}</h3>
                  <p>Price: ${item.ItemPrice}</p>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        item.ItemID,
                        item.ItemName,
                        item.ItemPrice
                      )
                    }
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Button for Drinks */}
        <div className={`menu ${clickedMenu === "Drinks" ? "clicked" : ""}`}>
          <button
            className="menu-btn"
            onClick={() => handleMenuClick("Drinks")}
          >
            Drinks
          </button>
          {/* Dropdown content for Drinks */}
          {clickedMenu === "Drinks" && (
            <div className="dropdown-content">
              {drinksItems.map((item) => (
                <div className="food-card">
                  <img src={importedImages["KayaToast.jpg"]} alt="Kaya Toast" />
                  <h3>{item.ItemName}</h3>
                  <p>Price: ${item.ItemPrice}</p>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        item.ItemID,
                        item.ItemName,
                        item.ItemPrice
                      )
                    }
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className="cart-icon"
        onClick={() => navigate("/cart", { state: { cartItems } })}
      >
        <div className="blue-circle">{cartItems.length}</div>
        <FaShoppingCart size="2x" />
      </div>
    </div>
  );
};

export default Food;
