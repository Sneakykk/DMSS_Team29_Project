import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar';
import '../../shared/layout/Food.css'; // Import Food.css for styling
import { FaShoppingCart } from 'react-icons/fa'; // Import FaShoppingCart


const Food = () => {
    const [clickedMenu, setClickedMenu] = useState(null);
    const [importedImages, setImportedImages] = useState({});
    const [cartItems, setCartItems] = useState({

        items: [],
    });
    const [menuItems, setMenuItems] = useState([]);
    const [storeData, setStoreData] = useState([]);

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {


        importImages();
        fetchFoodMenu();
        fetchStoreData();


    }, []);

    const importImages = async () => {
        const imageContext = require.context('../../shared/images/', false, /\.(png|jpe?g|svg)$/);
        const imageKeys = imageContext.keys();
        const importedImages = {};
        for (const key of imageKeys) {
            const imageName = key.replace('./', '');
            const image = await import(`../../shared/images/${imageName}`);
            importedImages[imageName] = image.default;
        }
        setImportedImages(importedImages);
    };


    const fetchFoodMenu = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/food');
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setMenuItems(jsonData);
            console.log(jsonData);
            // setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // setLoading(false);
        }
    };

    const fetchStoreData = async () => {
        try {
          const storeResponse = await fetch('http://localhost:8080/api/store');
          if (!storeResponse.ok) {
            throw new Error('Network response was not ok');
          }
          const storeJsonData = await storeResponse.json();
          setStoreData(storeJsonData);
          console.log(storeJsonData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
  
    const getStoreName = (storeId) => {
        const store = storeData.find((store) => store.storeId === storeId);
        return store ? store.storeName : 'Store Not Found';
    };
      


    const handleMenuClick = (menu) => {
        console.log('Clicked menu:', menu);
        console.log('Previous clicked menu:', clickedMenu);
    
        if (clickedMenu !== menu) {
            setClickedMenu(menu); // Open dropdown for the clicked menu
        } else {
            setClickedMenu(null); // Close dropdown if already open
        }
    };


    const handleAddToCart = (id, name, price) => {
        // Add the item to the cart
        const updatedCartItems =  {...cartItems} ;


        // Find the index of the object with the target ID
        const index = updatedCartItems.items.findIndex(item => item.id === id);

        // If the object with the target ID exists, update its name
        if (index !== -1) {
            updatedCartItems.items[index].qty += 1;
        }else{
            updatedCartItems.items.push({ id: id, foodName: name, foodPrice: price, qty: 1 });
        }


        // Check if totalQty has been initialise in object state
        const totalQtyItem = updatedCartItems.hasOwnProperty('totalQty');
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
                <div className={`menu ${clickedMenu === 'Breakfast' ? 'clicked' : ''}`}>
                    <button className="menu-btn" onClick={() => handleMenuClick('Breakfast')}>
                        Breakfast
                    </button>
                    {/* Dropdown content for Breakfast */}
                    {clickedMenu === 'Breakfast' && (
                        <div className="dropdown-content">
                            {
                                menuItems.map((item) => (
                                    <div className="food-card" key={item.itemId}>
                                    <img src={importedImages['KayaToast.jpg']} alt="Kaya Toast" />
                                    <h3>{item.itemName}</h3>
                                    <p>Price: ${item.itemPrice}</p>
                                    <p>Store: {getStoreName(item.storeId)}</p>
                                    <button onClick={() => handleAddToCart(item.itemId, item.itemName, item.itemPrice)}>Add to Cart</button>
                                </div>
                                ))
                            }
                        </div>
                    )}
                </div>
                {/* Button for Lunch */}
                <div className={`menu ${clickedMenu === 'Lunch' ? 'clicked' : ''}`}>
                    <button className="menu-btn" onClick={() => handleMenuClick('Lunch')}>
                        Lunch
                    </button>
                    {/* Dropdown content for Lunch */}
                    {clickedMenu === 'Lunch' && (
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
                <div className={`menu ${clickedMenu === 'Snacks' ? 'clicked' : ''}`}>
                    <button className="menu-btn" onClick={() => handleMenuClick('Snacks')}>
                        Snacks
                    </button>
                    {/* Dropdown content for Snacks */}
                    {clickedMenu === 'Snacks' && (
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
                <div className={`menu ${clickedMenu === 'Drinks' ? 'clicked' : ''}`}>
                    <button className="menu-btn" onClick={() => handleMenuClick('Drinks')}>
                        Drinks
                    </button>
                    {/* Dropdown content for Drinks */}
                    {clickedMenu === 'Drinks' && (
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
            <div className="cart-icon" onClick={() => navigate('/cart', { state: { cartItems } })}>
                <div className="blue-circle">{cartItems.totalQty}</div>
                <FaShoppingCart size="1x" />
            </div>
        </div>
    );
};

export default Food;
