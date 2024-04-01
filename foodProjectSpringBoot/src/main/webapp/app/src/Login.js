import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shared/layout/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submit action
        try {
            const response = await fetch('http://localhost:3001/api/login', { // Update to your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login Success:', data);
                // Save the token or user data as needed, e.g., to local storage
                navigate('/dashboard');
            } else {
                // Handle errors, such as showing a message to the user
                setError('Login failed. Please try again.');
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="login-container">
            <h2 align="center">Login</h2>
            {error && <p className="error">{error}</p>} {/* Display error message if it exists */}
            <form onSubmit={handleLogin}>
                <div className="input-container">
                    <label>Username:</label>
                    <input type="text" placeholder="Enter your username" className="input-field" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="input-container">
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" className="input-field" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
