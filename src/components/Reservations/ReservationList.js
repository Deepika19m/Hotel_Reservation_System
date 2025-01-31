import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchReservations } from "../../api/reservationAPI";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null); 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadReservations = async () => {
      const data = await fetchReservations();
      setReservations(data);
    };
    loadReservations();
  }, []);


  const handleEdit = (reservation) => {
    setEditingReservation(reservation); 
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingReservation((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "checkInDate" || name === "checkOutDate" || name === "guests") {
      recalculateCostAndDays();
    }
  };

  const recalculateCostAndDays = () => {
    const checkInDate = new Date(editingReservation.checkInDate);
    const checkOutDate = new Date(editingReservation.checkOutDate);
    const daysOfStay = Math.ceil((checkOutDate - checkInDate) / (1000 * 3600 * 24)); // Calculate days of stay
    const roomPrice = getRoomPrice(editingReservation.roomType);
    const newTotalCost = roomPrice * daysOfStay * editingReservation.guests; // Recalculate total cost

    setEditingReservation((prev) => ({
      ...prev,
      daysOfStay: daysOfStay,
      totalCost: newTotalCost,
    }));
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


  const saveEdit = () => {
    setReservations((prev) =>
      prev.map((res) =>
        res._id === editingReservation._id ? editingReservation : res
      )
    );
    setEditingReservation(null); 
    navigate("/reservations"); 
  };

  // Handle Delete confirmation
  const handleDelete = (reservation) => {
    setSelectedReservation(reservation); 
    setShowDeleteConfirmation(true); 
  };

  const deleteReservations = (reservation) => {
    
    const refundAmount = reservation.totalCost;
    alert(`Refunding ${refundAmount} for reservation ID: ${reservation._id}`);

  
    setReservations(reservations.filter((res) => res._id !== reservation._id));
    setShowDeleteConfirmation(false); 

    navigate("/reservations");
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false); 
  };

  const handleReserve = () => {
    navigate("/hotels"); 
  };

  return (
    <div className="reservation-list-container">
      <h1>Reservation List</h1>

      <button onClick={handleReserve} className="reserve-btn">
        + Reserve a Hotel
      </button>

      <div className="reservation-boxes-container">
        {reservations.map((res) => (
          <div key={res._id} className="reservation-box">
            <h3>{res.hotelName}</h3>

            {editingReservation && editingReservation._id === res._id ? (
              <div>
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={editingReservation.fullName}
                  onChange={handleChange}
                  readOnly
                />

                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={editingReservation.phone}
                  onChange={handleChange}
                  readOnly
                />

                <label>Guests:</label>
                <input
                  type="number"
                  name="guests"
                  value={editingReservation.guests}
                  onChange={handleChange}
                />

                <label>Check-in Date:</label>
                <input
                  type="date"
                  name="checkInDate"
                  value={editingReservation.checkInDate}
                  onChange={handleChange}
                />

                <label>Check-out Date:</label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={editingReservation.checkOutDate}
                  onChange={handleChange}
                />

                <label>Days of Stay:</label>
                <input
                  type="number"
                  name="daysOfStay"
                  value={editingReservation.daysOfStay}
                  readOnly
                />

             
                <label>Total Cost:</label>
                <input
                  type="number"
                  name="totalCost"
                  value={editingReservation.totalCost}
                  readOnly
                />

                <button onClick={saveEdit} className="save-btn">
                  Save
                </button>
                <button
                  onClick={() => setEditingReservation(null)} 
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            ) : (
              
              <>
                <p><strong>Full Name:</strong> {res.fullName}</p>
                <p><strong>Email:</strong> {res.email}</p>
                <p><strong>Phone:</strong> {res.phone}</p>
                <p><strong>Room Type:</strong> {res.roomType}</p>
                <p><strong>Check-in:</strong> {new Date(res.checkInDate).toDateString()}</p>
                <p><strong>Check-out:</strong> {new Date(res.checkOutDate).toDateString()}</p>
                <p><strong>Number of Nights:</strong> {res.daysOfStay}</p>
                <p><strong>Guests:</strong> {res.guests}</p>
                <p><strong>Total Cost:</strong> ${res.totalCost}</p>
                <p><strong>Payment Method:</strong> {res.paymentMethod}</p>
                <p><strong>Breakfast Included:</strong> {res.breakfastIncluded ? "Yes" : "No"}</p>
                <p><strong>Cancellation Accepted:</strong> {res.acceptCancellation ? "Yes" : "No"}</p>

                <button onClick={() => handleEdit(res)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(res)} className="delete-btn">
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

   
      {showDeleteConfirmation && (
        <div className="delete-confirmation-modal">
          <p>Are you sure you want to delete this reservation and refund the amount?</p>
          <button onClick={() => deleteReservations(selectedReservation)}>
            Yes, Delete and Refund
          </button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
