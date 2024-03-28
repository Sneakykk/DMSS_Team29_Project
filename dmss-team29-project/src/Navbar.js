import React, { useState } from "react";
import { FaBars, FaShoppingCart, FaUser } from "react-icons/fa"; // Import FaShoppingCart and FaUser
import "./Navbar.css"; // Import Navbar.css
import { Link } from "react-router-dom";

const Navbar = ({ userId }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars />
      </div>
      <div className="icons">
        <FaShoppingCart className="cart-icon" />
        <FaUser className="user-icon" />
      </div>
      <ul className={`menu-items ${showMenu ? "show" : ""}`}>
        <li>
          <Link to="/food">Food</Link>
        </li>
        <li>
          <a href="/" onClick={(e) => e.preventDefault()}>
            Order History
          </a>
        </li>
        <li>
          <a href="/" onClick={(e) => e.preventDefault()}>
            Analytics
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
