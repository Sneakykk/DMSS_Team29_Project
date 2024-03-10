import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes

import Login from './Login';
import Dashboard from './Dashboard';
import Food from './Food'; // Import the Food component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/food" element={<Food />} />
      </Routes>
    </Router>
  );
}

export default App;
