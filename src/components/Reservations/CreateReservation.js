import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../../api/reservationAPI"; 

const CreateReservation = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roomType, setRoomType] = useState("King");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [daysOfStay, setDaysOfStay] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [breakfastIncluded, setBreakfastIncluded] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    paypalEmail: "",
    upiId: "",
    bankAccountNumber: "",
    bankIFSC: ""
  });
  const [isPaid, setIsPaid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckOutChange = (e) => {
    const newCheckOutDate = e.target.value;
    setCheckOutDate(newCheckOutDate);

    if (new Date(newCheckOutDate) < new Date(checkInDate)) {
      setErrorMessage("Check-out date cannot be before check-in date");
    } else {
      setErrorMessage("");
      const diffInDays = (new Date(newCheckOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24);
      setDaysOfStay(diffInDays);
      setTotalCost(diffInDays * getRoomPrice(roomType));
    }
  };

  const getRoomPrice = (roomType) => {
    switch (roomType) {
      case "King":
        return 1500;
      case "Single":
        return 1200;
      case "Twin":
        return 1800;
      case "Suite":
        return 2000;
      default:
        return 0;
    }
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handlePayNow = () => {
    // Simulate payment processing
    if (paymentMethod === "Credit Card" || paymentMethod === "Debit Card") {
      if (!/^\d{16}$/.test(paymentDetails.cardNumber) || !/^\d{3}$/.test(paymentDetails.cvv) || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
        alert("Please enter valid Card Details.");
        return;
      }
    }
    if (paymentMethod === "UPI" && !paymentDetails.upiId) {
      alert("Please enter a valid UPI ID.");
      return;
    }
    if (paymentMethod === "PayPal" && !/\S+@\S+\.\S+/.test(paymentDetails.paypalEmail)) {
      alert("Please enter a valid PayPal email.");
      return;
    }
    if (paymentMethod === "Bank Transfer" && (!paymentDetails.bankAccountNumber || !paymentDetails.bankIFSC)) {
      alert("Please enter valid bank details.");
      return;
    }

    setIsPaid(true); // Mark payment as successful
    alert("Payment Successful! Your payment details are valid.");
  };

  const handleSubmit = async () => {
    if (!/^[1-9]\d{9}$/.test(phone)) {
      setErrorMessage("Phone number must be 10 digits and cannot start with 0");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (breakfastIncluded === null) {
      setErrorMessage("Please select if breakfast is included.");
      return;
    }

    const reservationData = {
      fullName,
      email,
      phone,
      roomType,
      checkInDate,
      checkOutDate,
      guests,
      daysOfStay,
      totalCost,
      breakfastIncluded,
      paymentMethod,
      paymentDetails,
    };

    try {
      await createReservation(reservationData);
      alert("Reservation Confirmed!");
      navigate("/ReservationConfirmed", { state: reservationData }); // Navigate to ReservationConfirmed page with data
    } catch (error) {
      setErrorMessage("Failed to create reservation. Please try again.");
    }
  };

  return (
    <div className="create-reservation-container">
      <h1>Create Reservation</h1>

      <div className="form-container">
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label>Email Address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Phone Number:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Room Type:</label>
        <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="King">King</option>
          <option value="Single">Single</option>
          <option value="Twin">Twin</option>
          <option value="Suite">Suite</option>
        </select>

        <label>Check-in Date:</label>
        <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />

        <label>Check-out Date:</label>
        <input type="date" value={checkOutDate} onChange={handleCheckOutChange} />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <label>Number of Guests:</label>
        <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} />

        <label>Days of Stay:</label>
        <input type="text" value={daysOfStay} disabled />

        <label>Total Cost:</label>
        <input type="text" value={totalCost} disabled />

        <label>Breakfast Included:</label>
        <label><input type="radio" value="yes" checked={breakfastIncluded === true} onChange={() => setBreakfastIncluded(true)} /> Yes</label>
        <label><input type="radio" value="no" checked={breakfastIncluded === false} onChange={() => setBreakfastIncluded(false)} /> No</label>

        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

    
        {paymentMethod === "Credit Card" || paymentMethod === "Debit Card" ? (
          <>
            <label>Card Number:</label>
            <input type="text" name="cardNumber" onChange={handlePaymentDetailsChange} />

            <label>CVV:</label>
            <input type="text" name="cvv" onChange={handlePaymentDetailsChange} />

            <label>Expiry Date (MM/YY):</label>
            <input type="text" name="expiryDate" placeholder="MM/YY" onChange={handlePaymentDetailsChange} />
          </>
        ) : paymentMethod === "PayPal" ? (
          <>
            <label>PayPal Email:</label>
            <input type="email" name="paypalEmail" onChange={handlePaymentDetailsChange} />
          </>
        ) : paymentMethod === "UPI" ? (
          <>
            <label>UPI ID:</label>
            <input type="text" name="upiId" onChange={handlePaymentDetailsChange} />
          </>
        ) : paymentMethod === "Bank Transfer" ? (
          <>
            <label>Account Number:</label>
            <input type="text" name="bankAccountNumber" onChange={handlePaymentDetailsChange} />

            <label>IFSC Code:</label>
            <input type="text" name="bankIFSC" onChange={handlePaymentDetailsChange} />
          </>
        ) : null}

        <button onClick={handlePayNow}>Pay Now</button>

        {isPaid && <p style={{ color: "green" }}>Payment Successful!</p>}
        {isPaid && <button onClick={handleSubmit}>Confirm Reservation</button>}
      </div>
    </div>
  );
};

export default CreateReservation;
