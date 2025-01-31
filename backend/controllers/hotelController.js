const Hotel = require("../models/Hotel");

// POST: Create a new Hotel
exports.createHotel = async (req, res) => {
  try {
    const { name, rating, pricePerNight, description, address, numOfBeds, petsAllowed, category } = req.body;

    const newHotel = new Hotel({
      name,
      rating,
      pricePerNight,
      description,
      address,
      numOfBeds,
      petsAllowed,
      category
    });

    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);  // Return the saved hotel
  } catch (err) {
    res.status(500).json({ error: err.message });  // Return error if something goes wrong
  }
};

// GET: Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);  // Return the list of hotels
  } catch (err) {
    res.status(500).json({ error: err.message });  // Return error if something goes wrong
  }
};

// GET: Get hotel details by name
exports.getHotelDetails = async (req, res) => {
  try {
    const { hotelName } = req.params;  // Extract hotel name from request params

    const hotel = await Hotel.findOne({ name: hotelName });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });  // Return error if hotel is not found
    }

    res.status(200).json(hotel);  // Return the hotel details
  } catch (err) {
    res.status(500).json({ error: err.message });  // Return error if something goes wrong
  }
};

// PUT: Update hotel details by name
exports.updateHotel = async (req, res) => {
  try {
    const { hotelName } = req.params;  // Extract hotel name from request params
    const updateData = req.body;  // The data to update the hotel

    const updatedHotel = await Hotel.findOneAndUpdate({ name: hotelName }, updateData, { new: true });

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });  // Return error if hotel is not found
    }

    res.status(200).json(updatedHotel);  
  } catch (err) {
    res.status(500).json({ error: err.message });  // Return error if something goes wrong
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const { hotelName } = req.params;  // Extract hotel name from request params

    const deletedHotel = await Hotel.findOneAndDelete({ name: hotelName });

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });  // Return error if hotel is not found
    }

    res.status(200).json({ message: "Hotel deleted successfully" });  // Return success message
  } catch (err) {
    res.status(500).json({ error: err.message });  // Return error if something goes wrong
  }
};
