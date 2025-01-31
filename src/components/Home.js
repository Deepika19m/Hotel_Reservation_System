import React from "react";
import { Link } from "react-router-dom"; 

const Home = () => {
  return (
    <div className="home-container">
     
      <div className="background-image"></div>

  
      <div className="welcome-text">
        <h1>Welcome to Hotel Reservation System</h1>
        <p>Experience the best stays at our luxurious hotels. Book your stay now!</p>
      </div>

     
      <div className="auth-section">
        <h2>Get Started</h2>
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/register" className="auth-button">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
