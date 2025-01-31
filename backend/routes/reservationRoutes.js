const express = require("express");
const {
    createReservation,
    getReservations,
    editReservation,
    deleteReservation
} = require("../controllers/reservationController"); 

const router = express.Router();

router.post("/", createReservation);


router.get("/", getReservations);


router.put("/:id", editReservation);

router.delete("/:id", deleteReservation);

module.exports = router;
