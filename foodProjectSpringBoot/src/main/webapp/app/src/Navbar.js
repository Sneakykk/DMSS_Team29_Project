import React, { useState } from 'react';
import { FaBars, FaShoppingCart, FaUser } from 'react-icons/fa'; // Import FaBars, FaShoppingCart, and FaUser
import './shared/layout/Navbar.css'; // Import Navbar.css

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false); // State for user menu

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        // Close user menu when main menu is toggled
        setShowUserMenu(false);
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    const handleLogout = () => {
        // Perform logout actions here (e.g., clear user session)
        // Redirect user to login page after logout
        window.location.href = '/';
    };

    return (
        <div className="navbar">
            <div className="menu-icon" onClick={toggleMenu}>
                <FaBars />
            </div>
            <div className="icons">
                <div className="icon-wrapper">
                    <FaShoppingCart className="cart-icon" />
                </div>
                <div className="icon-wrapper" onClick={toggleUserMenu}>
                    <FaUser className="user-icon" />
                </div>
                {showUserMenu && (
                    <ul className={`user-items show user-menu`}>
                        <li><a href="/" onClick={handleLogout}>Logout</a></li>
                    </ul>
                )}
            </div>
            <ul className={`menu-items ${showMenu ? 'show' : ''}`}>
                <li><a href="/food">Food</a></li>
                <li><a href="/order_history">Order History</a></li>
                <li><a href="/analytics">Analytics</a></li>
            </ul>
        </div>
    );
};

export default Navbar;
