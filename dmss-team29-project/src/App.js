import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter, Route, and Routes
import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Food from "./Food";
import Cart from "./Cart";
import Navbar from "./Navbar";

function App() {
  const [userId, setUserId] = useState(null);
  const handleLoginSuccess = (loggedInUserId) => {
    setUserId(loggedInUserId);
  };

  return (
    <Router>
      <Navbar userId={userId} />
      <Routes>
        <Route
          path="/"
          element={<Login handleLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/dashboard" element={<Dashboard userId={userId} />} />
        <Route path="/food" element={<Food userId={userId} />} />
        <Route path="/cart" element={<Cart userId={userId} />} />
      </Routes>
    </Router>
  );
}

export default App;
