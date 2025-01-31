import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


const HotelDetails = () => {
  const location = useLocation();
  const hotel = location.state;  
  const navigate = useNavigate();

  if (!hotel) {
    return <div>Hotel details not found</div>;
  }

  const handleReserve = () => {
   
    navigate("/create-reservation", { state: { hotelName: hotel.name } });
  };

  return (
    <div className="hotel-details-container">
      <h1 className="hotel-title">{hotel.name} Details</h1>
      
     
      <div className="hotel-image-container">
        <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      </div>

      <div className="hotel-info">
        <p><strong>Description:</strong> {hotel.description}</p>
        <p><strong>Price per Night:</strong> ${hotel.pricePerNight}</p>
        <p><strong>Address:</strong> {hotel.address}</p>
        <p><strong>Number of Beds:</strong> {hotel.numOfBeds}</p>
        <p><strong>Pets Allowed:</strong> {hotel.petsAllowed ? "Yes" : "No"}</p>
        <p><strong>Category:</strong> {hotel.category}</p>
      </div>

    
      <button onClick={handleReserve} className="reserve-btn">Reserve Now</button>
    </div>
  );
};

export default HotelDetails;
