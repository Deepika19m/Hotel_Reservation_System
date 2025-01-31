import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";


import Home from "./components/Home";  
import Home2 from "./Home2"; 
import Login from "./components/Reservations/Login";  
import Register from "./components/Reservations/Register"; 
import HotelList from "./components/Reservations/HotelList"; 
import HotelDetails from "./components/Reservations/HotelDetails";  
import CreateReservation from "./components/Reservations/CreateReservation";  
import ReservationList from "./components/Reservations/ReservationList"; 
import ReservationConfirmed from "./components/Reservations/ReservationConfirmed";  

function App() {
  
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/" element={<Home />} />

        <Route path="/home2" element={isLoggedIn ? <Home2 /> : <Navigate to="/" />} />

  
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  {/* Register Route */}

        <Route path="/hotels" element={isLoggedIn ? <HotelList /> : <Navigate to="/" />} />
        <Route path="/hotel-details" element={isLoggedIn ? <HotelDetails /> : <Navigate to="/" />} />
        <Route path="/create-reservation" element={isLoggedIn ? <CreateReservation /> : <Navigate to="/" />} />
        
      
        <Route path="/reservations" element={isLoggedIn ? <ReservationList /> : <Navigate to="/" />} />
       
        <Route path="/reservation-confirmed" element={isLoggedIn ? <ReservationConfirmed /> : <Navigate to="/" />} />

  
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
