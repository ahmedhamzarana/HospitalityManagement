const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { getRooms, createRoom } = require("../controllers/roomController");

// GET ALL ROOMS
router.get("/all",authMiddleware, getRooms);
router.post("/create",authMiddleware, createRoom);

module.exports = router;