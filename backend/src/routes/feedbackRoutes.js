const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { getAllFeedback, createFeedback } = require("../controllers/feedbackcontroller");

// GET ALL ROOMS
router.get("/all", authMiddleware, getAllFeedback);
router.post("/create",authMiddleware, createFeedback);

module.exports = router;