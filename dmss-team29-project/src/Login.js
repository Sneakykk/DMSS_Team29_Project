import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file for styling

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // Navigate to the main page upon login button click
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error loggin in: ", error);
      setErrorMessage("Error loggin in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {" "}
      {/* Apply container class */}
      <h2 align="center">Login</h2>
      <form>
        <div className="input-container">
          {" "}
          {/* Apply container class */}
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="input-field"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />{" "}
          {/* Apply input field class */}
        </div>
        <div className="input-container">
          {" "}
          {/* Apply container class */}
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          {/* Apply input field class */}
        </div>
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}{" "}
        {/* Apply button class */}
      </form>
    </div>
  );
};

export default Login;
