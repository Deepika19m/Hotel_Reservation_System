const mongoose = require("mongoose");

// Define the Hotel schema
const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // Hotel name is required
      unique: true,    // Ensure hotel name is unique
    },
    rating: {
      type: Number,
      required: true,  
      min: 0,          
      max: 5,          
    },
    pricePerNight: {
      type: Number,
      required: true,  
      min: 0,          
    },
    description: {
      type: String,
      required: true,  
    },
    address: {
      type: String,
      required: true, 
    },
    numOfBeds: {
      type: Number,
      required: true,  
      min: 1,          
    },
    petsAllowed: {
      type: Boolean,
      required: true,  
    },
    category: {
      type: String,
      enum: ["King", "Single", "Twins"], 
      required: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
