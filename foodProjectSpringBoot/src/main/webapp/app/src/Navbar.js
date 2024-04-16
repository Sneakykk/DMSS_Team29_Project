import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { FaBars, FaShoppingCart, FaUser } from 'react-icons/fa'; // Import FaBars, FaShoppingCart, and FaUser
import './shared/layout/Navbar.css'; // Import Navbar.css

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false); // State for user menu
    const [userData, setUserData] = useState([null]);

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        // Retrieve user data from localStorage when component mounts
        const storedUserData = localStorage.getItem('userData');
        if (!storedUserData) {
            navigate('/');
        }else{
            const parsedUserData = JSON.parse(storedUserData);
            setUserData({...parsedUserData});
        }
    }, [navigate]);



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
        // Clear localStorage before redirecting to login page
        localStorage.removeItem('userData');
        window.location.href = '/';
    };

    // Check if the current page is the cart page
    const isCartPage = location.pathname === '/cart';

    return (
        <div className="navbar">
            <div className="menu-icon" onClick={toggleMenu}>
                <FaBars />
            </div>
            <div className="icons">
            {isCartPage && (
                    <div className="icon-wrapper">
                        <FaShoppingCart className="cart-icon" />
                    </div>
                )}
                <div className="icon-wrapper" onClick={toggleUserMenu}>
                    <FaUser className="user-icon" />
                </div>
                {showUserMenu && (
                    <>
                    <ul className={`user-items show user-menu`}>
                        Hello {userData.firstName} {userData.lastName} :
                        <li><a href="/" onClick={handleLogout}>Logout</a></li>
                    </ul>
                    </>
                )}
            </div>
            <ul className={`menu-items ${showMenu ? 'show' : ''}`}>
                <li><a href="/dashboard">Home</a></li>
            {userData.storeId !== 0  ? (
                    <>
                        <li><a href="/storeMenuItem">Store Menu Item</a></li>
                        <li><a href="/analytics">Analytics</a></li>
                    </>
                ) : (
                    <>
                        <li><a href="/food">Food</a></li>
                        <li><a href="/order_history">Order History</a></li>
                    </>
                )}

            {userData.username === "admin"?(
                <>
                    <li><a href="/storeMenuItem">Store Menu Item</a></li>
                    <li><a href="/analytics">Analytics</a></li>
                    {/* <li><a href="/food">Food</a></li>
                    <li><a href="/order_history">Order History</a></li> */}
                </>
            ):""}
                
            </ul>
        </div>
    );
};

export default Navbar;
