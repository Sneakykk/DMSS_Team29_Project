import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes

import Login from './Login';
import Dashboard from './entities/dashboard/Dashboard';
import Food from './entities/food/Food';
import Cart from './entities/cart/Cart';
import OrderHistory from './entities/history/OrderHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/food" element={<Food />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order_history" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
