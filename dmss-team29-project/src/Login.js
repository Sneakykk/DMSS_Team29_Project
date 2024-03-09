import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for styling

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Navigate to the main page upon login button click
        navigate('/dashboard');
    };

    return (
        <div className="login-container"> {/* Apply container class */}
            <h2 align="center">Login</h2>
            <form>
                <div className="input-container"> {/* Apply container class */}
                    <label>Username:</label>
                    <input type="text" placeholder="Enter your username" className="input-field" /> {/* Apply input field class */}
                </div>
                <div className="input-container"> {/* Apply container class */}
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" className="input-field" /> {/* Apply input field class */}
                </div>
                <button type="button" onClick={handleLogin} className="login-button">Login</button> {/* Apply button class */}
            </form>
        </div>
    );
};

export default Login;
