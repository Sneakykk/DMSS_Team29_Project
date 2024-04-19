import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./shared/layout/Login.css"; // Import CSS file for styling

const Login = () => {
  const [userState, setUserState] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFieldChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    console.log(field);
    console.log(value);
    setUserState({
      ...userState,
      [field]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    try {
      const response = await fetch(
        "https://152.42.249.86:8443/api/user/login",
        {
          // Update to your backend endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userState }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login Success:", data);
        // Save the token or user data as needed, e.g., to local storage
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        // Handle errors, such as showing a message to the user
        setError("Login failed. Please try again.");
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="login-container">
      {" "}
      {/* Apply container class */}
      <h2 align="center">Login</h2>
      {error && (
        <p className="error" style={{ color: "red" }}>
          {error}
        </p>
      )}{" "}
      {/* Display error message if it exists */}
      <form>
        <div className="input-container">
          {" "}
          {/* Apply container class */}
          <label>Username:</label>
          <input
            name="username"
            value={userState.username}
            type="text"
            onChange={onFieldChange}
            placeholder="Enter your username"
            className="input-field"
          />{" "}
          {/* Apply input field class */}
        </div>
        <div className="input-container">
          {" "}
          {/* Apply container class */}
          <label>Password:</label>
          <input
            name="password"
            value={userState.password}
            type="password"
            onChange={onFieldChange}
            placeholder="Enter your password"
            className="input-field"
          />{" "}
          {/* Apply input field class */}
        </div>
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>{" "}
        {/* Apply button class */}
      </form>
    </div>
  );
};

export default Login;
