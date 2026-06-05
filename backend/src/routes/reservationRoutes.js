const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");

const {
  createReservation,
  getAllReservation,
  updateReservationStatus,
} = require("../controllers/reservationController");

router.get("/all", authMiddleware, getAllReservation);
router.post("/create", authMiddleware, createReservation);

// STATUS UPDATE
router.patch("/status/:id", authMiddleware, updateReservationStatus);

module.exports = router;