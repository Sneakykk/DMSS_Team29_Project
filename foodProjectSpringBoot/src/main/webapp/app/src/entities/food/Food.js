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
    const [foodTypes, setFoodTypes] = useState([]);

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {


        importImages();
        fetchFoodMenu();
        fetchStoreData();
        fetchUnqiueFoodType();


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
            const response = await fetch('http://localhost:8080/api/get_all_foods');
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setMenuItems(jsonData);
            // console.log(jsonData);
            // setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // setLoading(false);
        }
    };

    const fetchStoreData = async () => {
        try {
          const storeResponse = await fetch('http://localhost:8080/api/get_all_stores');
          if (!storeResponse.ok) {
            throw new Error('Network response was not ok');
          }
          const storeJsonData = await storeResponse.json();
          setStoreData(storeJsonData);
        //   console.log(storeJsonData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUnqiueFoodType = async () => {
        try {
          const uniqueFoodtypeResponse = await fetch('http://localhost:8080/api/get_unique_food_type');
          if (!uniqueFoodtypeResponse.ok) {
            throw new Error('Network response was not ok');
          }
          const uniqueFoodtypeData = await uniqueFoodtypeResponse.json();
          setFoodTypes(uniqueFoodtypeData);
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

                {
    foodTypes.map((item) => (
        <div className={`menu ${clickedMenu === item ? 'clicked' : ''}`} key={item}>
            <button className="menu-btn" onClick={() => handleMenuClick(item)}>
                {item}
            </button>
            {/* Dropdown content for the clicked menu item */}
            {clickedMenu === item && (
                <div className="dropdown-content">
                    {menuItems.map((menuItem) => (
                        menuItem.itemType === item && (
                            <div className="food-card" key={menuItem.itemId}>
                                <img src={importedImages[menuItem.itemName+'.jpg']} alt={menuItem.itemName} />
                                <h3>{menuItem.itemName}</h3>
                                <p>Price: ${menuItem.itemPrice}</p>
                                <p>Store: {getStoreName(menuItem.storeId)}</p>
                                <button onClick={() => handleAddToCart(menuItem.itemId, menuItem.itemName, menuItem.itemPrice)}>Add to Cart</button>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    ))
}
               
            </div>
            <div className="cart-icon" onClick={() => navigate('/cart', { state: { cartItems } })}>
                <div className="blue-circle">{cartItems.totalQty}</div>
                <FaShoppingCart size="1x" />
            </div>
        </div>
    );
};

export default Food;
