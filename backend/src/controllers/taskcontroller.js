const Task = require("../models/task");
const Room = require("../models/room");
const User = require("../models/users");

exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      status: "available",
    }).sort({ roomId: 1 });

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStaff = async (req, res) => {
  try {
    const staff = await User.find({
      role: {
        $in: ["housekeeping", "manager"],
      },
      status: "active",
    }).select("name role");

    res.status(200).json({
      success: true,
      staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      room,
      assignedTo,
      description,
    } = req.body;

    const roomData = await Room.findById(room);

    if (!roomData) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    if (roomData.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Room not available",
      });
    }

    const task = await Task.create({
      title,
      room,
      assignedTo,
      description,
    });

    if (
      title === "Cleaning" ||
      title === "Deep Cleaning"
    ) {
      roomData.status = "cleaning";
    }

    if (title === "Maintenance") {
      roomData.status = "maintenance";
    }

    await roomData.save();

    const populatedTask = await Task.findById(task._id)
      .populate("room")
      .populate("assignedTo");

    res.status(201).json({
      success: true,
      task: populatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("room")
      .populate("assignedTo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.status = status;
    await task.save();

    if (status === "done") {
      await Room.findByIdAndUpdate(task.room, {
        status: "available",
      });
    }

    const updatedTask = await Task.findById(id)
      .populate("room")
      .populate("assignedTo");

    res.status(200).json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};