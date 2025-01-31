const express = require("express");
const {
  createHotel,
  getAllHotels,
  getHotelDetails,
  updateHotel,
  deleteHotel
} = require("../controllers/hotelController");

const router = express.Router();

router.post("/create", createHotel);

router.get("/", getAllHotels);

router.get("/hotel/:hotelName", getHotelDetails);

router.put("/hotel/:hotelName", updateHotel);

router.delete("/hotel/:hotelName", deleteHotel);

module.exports = router;
