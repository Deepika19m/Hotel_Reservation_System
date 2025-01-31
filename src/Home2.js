import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const Home2 = () => {
  const navigate = useNavigate(); // For navigation

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // If the user is not logged in, redirect them to Home2 (Login/Registration page)
  if (!isLoggedIn) {
    return (
      <div>
        <h2>Please log in to view reservations</h2>
      </div>
    );
  }

  // Handlers for tab navigation
  const handleReservationsClick = () => {
    navigate("/hotels");  // Navigate to Hotel List
  };

  const handleViewReservationsClick = () => {
    navigate("/reservations");  // Navigate to Reservation List
  };

  return (
    <div className="home2-container">
      <nav>
        <button onClick={handleReservationsClick}>Reservations</button>
        <p className="reservation-subtitle">Reserve your favourite room now!!</p>
        <button onClick={handleViewReservationsClick}>View Reservations</button>
        <p className="reservation-subtitle">View my reservations!!</p>
      </nav>
    </div>
  );
};

export default Home2;
