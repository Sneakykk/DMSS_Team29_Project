import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Food.css'; // Import Food.css for styling

const Food = () => {
    const [clickedMenu, setClickedMenu] = useState(null);
    const [importedImages, setImportedImages] = useState({});

    useEffect(() => {
        const importImages = async () => {
            const imageContext = require.context('./images/', false, /\.(png|jpe?g|svg)$/);
            const imageKeys = imageContext.keys();
            const importedImages = {};
            for (const key of imageKeys) {
                const imageName = key.replace('./', '');
                const image = await import(`./images/${imageName}`);
                importedImages[imageName] = image.default;
            }
            setImportedImages(importedImages);
        };

        importImages();
    }, []);

    const handleMenuClick = (menu) => {
        console.log('Clicked menu:', menu);
        console.log('Previous clicked menu:', clickedMenu);
    
        if (clickedMenu !== menu) {
            setClickedMenu(menu); // Open dropdown for the clicked menu
        } else {
            setClickedMenu(null); // Close dropdown if already open
        }
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
                            <div className="food-card">
                                <img src={importedImages['KayaToast.jpg']} alt="Kaya Toast" />
                                <h3>Kaya Toast</h3>
                                <p>Price: $3.50</p>
                                <button>Add to Cart</button>
                            </div>
                            <div className="food-card">
                                <img src={importedImages['FrenchToast.jpg']} alt="French Toast" />
                                <h3>French Toast</h3>
                                <p>Price: $3.50</p>
                                <button>Add to Cart</button>
                            </div>
                            <div className="food-card">
                                <h3>Ham Toast</h3>
                                <p>Price: $4.50</p>
                                <button>Add to Cart</button>
                            </div>
                            <div className="food-card">
                                <h3>Tuna Toast</h3>
                                <p>Price: $4.50</p>
                                <button>Add to Cart</button>
                            </div>
                            <div className="food-card">
                                <h3>Tuna Toast</h3>
                                <p>Price: $4.50</p>
                                <button>Add to Cart</button>
                            </div>
                            <div className="food-card">
                                <h3>Tuna Toast</h3>
                                <p>Price: $4.50</p>
                                <button>Add to Cart</button>
                            </div>
                            <div className="food-card">
                                <h3>Tuna Toast</h3>
                                <p>Price: $4.50</p>
                                <button>Add to Cart</button>
                            </div>
                            <div className="food-card">
                                <h3>Tuna Toast</h3>
                                <p>Price: $4.50</p>
                                <button>Add to Cart</button>
                            </div>
                            <div className="food-card">
                                <h3>Tuna Toast</h3>
                                <p>Price: $4.50</p>
                                <button>Add to Cart</button>
                            </div>
                            {/* Add more breakfast items here */}
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
        </div>
    );
};

export default Food;
