import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes

import Login from './Login';
import Dashboard from './entities/dashboard/Dashboard';
import Food from './entities/food/Food';
import Cart from './entities/cart/Cart';
import OrderHistory from './entities/history/OrderHistory';
import Analytics from './entities/analytics/Analytics';
import StoreMenuItem from './entities/storeMenuItem/StoreMenuItem';
import StoreMenuPage from './entities/storeMenuItem/addStoreItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/food" element={<Food />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order_history" element={<OrderHistory />} />
        <Route path ="/analytics" element={<Analytics/>} />
        <Route path="/storeMenuItem" element={<StoreMenuItem/>} />
        <Route path="/addStoreItem" element={<StoreMenuPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
