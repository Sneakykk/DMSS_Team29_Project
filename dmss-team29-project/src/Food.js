import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Food.css"; // Import Food.css for styling
import { FaShoppingCart } from "react-icons/fa"; // Import FaShoppingCart

// const Food = () => {
//     const [clickedMenu, setClickedMenu] = useState(null);
//     const [importedImages, setImportedImages] = useState({});
//     const [cartItems, setCartItems] = useState([]);
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     useEffect(() => {
//         const importImages = async () => {
//             const imageContext = require.context('./images/', false, /\.(png|jpe?g|svg)$/);
//             const imageKeys = imageContext.keys();
//             const importedImages = {};
//             for (const key of imageKeys) {
//                 const imageName = key.replace('./', '');
//                 const image = await import(`./images/${imageName}`);
//                 importedImages[imageName] = image.default;
//             }
//             setImportedImages(importedImages);
//         };

//         importImages();
//     }, []);

//     const handleMenuClick = (menu) => {
//         console.log('Clicked menu:', menu);
//         console.log('Previous clicked menu:', clickedMenu);

//         if (clickedMenu !== menu) {
//             setClickedMenu(menu); // Open dropdown for the clicked menu
//         } else {
//             setClickedMenu(null); // Close dropdown if already open
//         }
//     };

//     const handleAddToCart = (itemName, price) => {
//         // Add the item to the cart
//         setCartItems([...cartItems, { itemName, price }]);
//     };

//     return (
//         <div>
//             <Navbar /> {/* Include the same navbar */}
//             <h1 align="center">MENU</h1>
//             <div className="food-container">
//                 {/* Button for Breakfast */}
//                 <div className={`menu ${clickedMenu === 'Breakfast' ? 'clicked' : ''}`}>
//                     <button className="menu-btn" onClick={() => handleMenuClick('Breakfast')}>
//                         Breakfast
//                     </button>
//                     {/* Dropdown content for Breakfast */}
//                     {clickedMenu === 'Breakfast' && (
//                         <div className="dropdown-content">
//                             <div className="food-card">
//                                 <img src={importedImages['KayaToast.jpg']} alt="Kaya Toast" />
//                                 <h3>Kaya Toast</h3>
//                                 <p>Price: $3.50</p>
//                                 <button onClick={() => handleAddToCart('Kaya Toast', 3.50)}>Add to Cart</button>
//                             </div>
//                             <div className="food-card">
//                                 <img src={importedImages['FrenchToast.jpg']} alt="French Toast" />
//                                 <h3>French Toast</h3>
//                                 <p>Price: $3.50</p>
//                                 <button onClick={() => handleAddToCart('French Toast', 3.50)}>Add to Cart</button>
//                             </div>
//                             <div className="food-card">
//                                 <h3>Ham Toast</h3>
//                                 <p>Price: $4.50</p>
//                                 <button onClick={() => handleAddToCart('Ham Toast', 3.50)}>Add to Cart</button>
//                             </div>
//                             <div className="food-card">
//                                 <h3>Tuna Toast</h3>
//                                 <p>Price: $4.50</p>
//                                 <button onClick={() => handleAddToCart('Tuna Toast', 3.50)}>Add to Cart</button>
//                             </div>
//                             <div className="food-card">
//                                 <h3>Tuna Toast</h3>
//                                 <p>Price: $4.50</p>
//                                 <button>Add to Cart</button>
//                             </div>
//                             <div className="food-card">
//                                 <h3>Tuna Toast</h3>
//                                 <p>Price: $4.50</p>
//                                 <button>Add to Cart</button>
//                             </div>
//                             <div className="food-card">
//                                 <h3>Tuna Toast</h3>
//                                 <p>Price: $4.50</p>
//                                 <button>Add to Cart</button>
//                             </div>
//                             <div className="food-card">
//                                 <h3>Tuna Toast</h3>
//                                 <p>Price: $4.50</p>
//                                 <button>Add to Cart</button>
//                             </div>
//                             <div className="food-card">
//                                 <h3>Tuna Toast</h3>
//                                 <p>Price: $4.50</p>
//                                 <button>Add to Cart</button>
//                             </div>
//                             {/* Add more breakfast items here */}
//                         </div>
//                     )}
//                 </div>
//                 {/* Button for Lunch */}
//                 <div className={`menu ${clickedMenu === 'Lunch' ? 'clicked' : ''}`}>
//                     <button className="menu-btn" onClick={() => handleMenuClick('Lunch')}>
//                         Lunch
//                     </button>
//                     {/* Dropdown content for Lunch */}
//                     {clickedMenu === 'Lunch' && (
//                         <div className="dropdown-content">
//                             <div className="food-card">
//                                 <h3>Lunch Item 1</h3>
//                                 <p>Price: $10.99</p>
//                                 <button>Add to Cart</button>
//                             </div>
//                             {/* Add more lunch items here */}
//                         </div>
//                     )}
//                 </div>
//                 {/* Button for Snacks */}
//                 <div className={`menu ${clickedMenu === 'Snacks' ? 'clicked' : ''}`}>
//                     <button className="menu-btn" onClick={() => handleMenuClick('Snacks')}>
//                         Snacks
//                     </button>
//                     {/* Dropdown content for Snacks */}
//                     {clickedMenu === 'Snacks' && (
//                         <div className="dropdown-content">
//                             <div className="food-card">
//                                 <h3>Snack Item 1</h3>
//                                 <p>Price: $5.99</p>
//                                 <button>Add to Cart</button>
//                             </div>
//                             {/* Add more snack items here */}
//                         </div>
//                     )}
//                 </div>
//                 {/* Button for Drinks */}
//                 <div className={`menu ${clickedMenu === 'Drinks' ? 'clicked' : ''}`}>
//                     <button className="menu-btn" onClick={() => handleMenuClick('Drinks')}>
//                         Drinks
//                     </button>
//                     {/* Dropdown content for Drinks */}
//                     {clickedMenu === 'Drinks' && (
//                         <div className="dropdown-content">
//                             <div className="food-card">
//                                 <h3>Drink Item 1</h3>
//                                 <p>Price: $2.99</p>
//                                 <button>Add to Cart</button>
//                             </div>
//                             {/* Add more drink items here */}
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="cart-icon" onClick={() => navigate('/cart', { state: { cartItems } })}>
//                 <div className="blue-circle">{cartItems.length}</div>
//                 <FaShoppingCart size="2x" />
//             </div>
//         </div>
//     );
// };

// export default Food;

const Food = () => {
  const [clickedMenu, setClickedMenu] = useState(null);
  const [importedImages, setImportedImages] = useState({});
  const [cartItems, setCartItems] = useState({
    items: [],
  });
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    importImages();
    fetchMockData();
  }, []);

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

  const fetchMockData = () => {
    setTimeout(() => {
      const mockData = [
        { id: 1, foodName: "Kaya Toast", foodPrice: 5.99 },
        { id: 2, foodName: "French Toast", foodPrice: 8.99 },
        { id: 3, foodName: "Ham Toast", foodPrice: 6.49 },
        { id: 4, foodName: "Tuna Toast", foodPrice: 7.29 },
        { id: 5, foodName: "Steak", foodPrice: 15.99 },
        { id: 6, foodName: "Sushi", foodPrice: 12.99 },
        { id: 7, foodName: "Sandwich", foodPrice: 6.49 },
        { id: 8, foodName: "Fries", foodPrice: 3.99 },
        { id: 9, foodName: "Soup", foodPrice: 4.99 },
        { id: 10, foodName: "Taco", foodPrice: 9.99 },
        { id: 11, foodName: "Chicken Wings", foodPrice: 8.99 },
        { id: 12, foodName: "Fish and Chips", foodPrice: 11.49 },
        // Add more mock data as needed
      ];
      setMenuItems(mockData);
    }, 1000); // Simulate a 1 second delay
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

  const handleAddToCart = (id, name, price) => {
    // Add the item to the cart
    const updatedCartItems = { ...cartItems };

    // Find the index of the object with the target ID
    const index = updatedCartItems.items.findIndex((item) => item.id === id);

    // If the object with the target ID exists, update its name
    if (index !== -1) {
      updatedCartItems.items[index].qty += 1;
    } else {
      updatedCartItems.items.push({
        id: id,
        foodName: name,
        foodPrice: price,
        qty: 1,
      });
    }

    // Check if totalQty has been initialise in object state
    const totalQtyItem = updatedCartItems.hasOwnProperty("totalQty");
    if (totalQtyItem) {
      updatedCartItems.totalQty += 1;
    } else {
      updatedCartItems.totalQty = 1;
    }

    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <Navbar /> {/* Include the same navbar */}
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
              {menuItems.map((item) => (
                <div className="food-card">
                  <img src={importedImages["KayaToast.jpg"]} alt="Kaya Toast" />
                  <h3>{item.foodName}</h3>
                  <p>Price: {item.foodPrice}</p>
                  <button
                    onClick={() =>
                      handleAddToCart(item.id, item.foodName, item.foodPrice)
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Button for Lunch */}
        <div className={`menu ${clickedMenu === "Lunch" ? "clicked" : ""}`}>
          <button className="menu-btn" onClick={() => handleMenuClick("Lunch")}>
            Lunch
          </button>
          {/* Dropdown content for Lunch */}
          {clickedMenu === "Lunch" && (
            <div className="dropdown-content">
              <div className="food-card">
                <h3>Lunch Item 1</h3>
                <p>Price: $10.99</p>
                <button>Add to Cart</button>
              </div>
              {/* Add more lunch items here */}
            </div>
          )}
        </div>
        {/* Button for Snacks */}
        <div className={`menu ${clickedMenu === "Snacks" ? "clicked" : ""}`}>
          <button
            className="menu-btn"
            onClick={() => handleMenuClick("Snacks")}
          >
            Snacks
          </button>
          {/* Dropdown content for Snacks */}
          {clickedMenu === "Snacks" && (
            <div className="dropdown-content">
              <div className="food-card">
                <h3>Snack Item 1</h3>
                <p>Price: $5.99</p>
                <button>Add to Cart</button>
              </div>
              {/* Add more snack items here */}
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
              <div className="food-card">
                <h3>Drink Item 1</h3>
                <p>Price: $2.99</p>
                <button>Add to Cart</button>
              </div>
              {/* Add more drink items here */}
            </div>
          )}
        </div>
      </div>
      <div
        className="cart-icon"
        onClick={() => navigate("/cart", { state: { cartItems } })}
      >
        <div className="blue-circle">{cartItems.totalQty}</div>
        <FaShoppingCart size="1x" />
      </div>
    </div>
  );
};

export default Food;
