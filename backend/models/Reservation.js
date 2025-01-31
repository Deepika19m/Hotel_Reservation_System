const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    roomType: String,
    checkInDate: Date,
    checkOutDate: Date,
    guests: Number,
    totalCost: Number,
    daysOfStay: Number,
    breakfastIncluded: Boolean,
    paymentMethod: String,
    paymentDetails: {
        cardNumber: String,
        expiryDate: String,
        cvv: String,
        upiId: String,
        paypalEmail: String,
        bankAccountNumber: String,
        ifscCode: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
