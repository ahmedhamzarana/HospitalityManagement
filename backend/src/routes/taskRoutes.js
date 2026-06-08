const express = require("express");
const router = express.Router();

const {
  getAvailableRooms,
  getStaff,
  createTask,
  getTasks,
  updateTaskStatus,
} = require("../controllers/taskcontroller");

router.get("/available-rooms", getAvailableRooms);
router.get("/staff", getStaff);
router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id/status", updateTaskStatus);

module.exports = router;