import React from 'react';
import Navbar from './Navbar';
import './shared/layout/Layout.css'; // Import your layout CSS file

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
