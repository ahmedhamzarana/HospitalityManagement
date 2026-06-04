const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { createReservation, getAllReservation } = require("../controllers/reservationcontroller");

// GET ALL ROOMS
router.get("/all",authMiddleware, getAllReservation);
router.post("/create",authMiddleware, createReservation);

module.exports = router;