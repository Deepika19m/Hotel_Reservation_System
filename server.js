const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const hotelRoutes = require("./backend/routes/hotelRoutes");
const reservationRoutes = require("./backend/routes/reservationRoutes");
const authRoutes = require("./backend/routes/authRoutes");  

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());  

// Use routes
app.use("/api/hotels", hotelRoutes); 
app.use("/api/reservations", reservationRoutes); 
app.use("/api/auth", authRoutes);  


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
