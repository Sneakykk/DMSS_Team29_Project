import React from 'react';
import Navbar from '../../Navbar';
import '../../shared/layout/StoreMenuItem.css';

const Blank = () => {
    return (
        <div>
        <Navbar />
        <div className="blank-container">
            <h1>Welcome to Blank Page</h1>
            <p>This is a blank page example.</p>
        </div>
        </div>
    );
};

export default Blank;
