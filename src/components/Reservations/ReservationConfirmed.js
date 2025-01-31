import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReservationConfirmed = () => {
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();  
  const reservationData = location.state;

  useEffect(() => {
    if (!reservationData) {
      const fetchReservationDetails = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/reservations/latest");

          if (!response.ok) {
            throw new Error("Failed to fetch reservation details.");
          }

          const data = await response.json();
          setReservation(data);
          setLoading(false);
        } catch (error) {
          setError("Error fetching reservation details. Please try again.");
          setLoading(false);
        }
      };

      fetchReservationDetails();
    } else {
      setReservation(reservationData);
      setLoading(false); 
    }
  }, [reservationData]);

  const handleViewReservations = () => {
    navigate("/reservations");  
  };

  if (loading) {
    return <div className="loading">Loading reservation details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="reservation-confirmed-container">
      <h1>Reservation Confirmed</h1>
      <p><strong>Reservation Number:</strong> {reservation._id}</p>
      <p><strong>Hotel Name:</strong> {reservation.hotelName}</p>
      <p><strong>Guest Name:</strong> {reservation.fullName}</p>
      <p><strong>Check-in Date:</strong> {new Date(reservation.checkInDate).toDateString()}</p>
      <p><strong>Check-out Date:</strong> {new Date(reservation.checkOutDate).toDateString()}</p>
      <p><strong>Number of Guests:</strong> {reservation.guests}</p>
      <p><strong>Total Cost:</strong> ${reservation.totalCost}</p>
      <p><strong>Payment Method:</strong> {reservation.paymentMethod}</p>

   
      <button onClick={handleViewReservations} className="view-reservation-btn">
        View Reservations
      </button>
    </div>
  );
};

export default ReservationConfirmed;
