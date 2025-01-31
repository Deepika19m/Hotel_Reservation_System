const Reservation = require("../models/Reservation");

exports.createReservation = async (req, res) => {
    try {
        const { fullName, email, phone, roomType, checkInDate, checkOutDate, guests, totalCost, daysOfStay, breakfastIncluded, paymentMethod, paymentDetails } = req.body;

        const newReservation = new Reservation({
            fullName, email, phone, roomType, checkInDate, checkOutDate, guests, totalCost, daysOfStay, breakfastIncluded, paymentMethod, paymentDetails
        });

        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.editReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedReservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json(updatedReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReservation = await Reservation.findByIdAndDelete(id);

        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
