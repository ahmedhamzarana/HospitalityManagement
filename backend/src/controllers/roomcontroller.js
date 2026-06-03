const Room = require("../models/room");

// GET all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE room
exports.createRoom = async (req, res) => {
  const { roomId, floor, guests, price, category, status } = req.body;

  let errors = {};

  try {
    // REQUIRED FIELDS
    if (!roomId) errors.roomId = "Room ID is required";
    if (!floor) errors.floor = "Floor is required";
    if (!guests) errors.guests = "Guests are required";
    if (!price) errors.price = "Price is required";
    if (!category) errors.category = "Category is required";

    // VALIDATIONS
    if (roomId && (roomId < 100 || roomId > 9999)) {
      errors.roomId = "Room ID must be between 100 and 9999";
    }

    if (floor && (floor < 0 || floor > 100)) {
      errors.floor = "Floor must be between 0 and 100";
    }

    if (guests && (guests < 1 || guests > 10)) {
      errors.guests = "Guests must be between 1 and 10";
    }

    if (price && price < 100) {
      errors.price = "Price must be at least 100";
    }

    const validCategories = ["deluxe", "suite", "standard"];
    if (category && !validCategories.includes(category)) {
      errors.category = "Invalid category";
    }

    const validStatus = ["available", "occupied", "maintenance", "cleaning"];
    if (status && !validStatus.includes(status)) {
      errors.status = "Invalid status";
    }

    // RETURN ERRORS (USER STYLE)
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    // CHECK DUPLICATE ROOM
    const existingRoom = await Room.findOne({ roomId });

    if (existingRoom) {
      return res.status(400).json({
        message: "Validation failed",
        errors: {
          roomId: "Room already exists",
        },
      });
    }

    // CREATE ROOM
    const room = await Room.create({
      roomId,
      floor,
      guests,
      price,
      category,
      status,
    });

    return res.status(201).json({
      message: "Room created successfully",
      room,
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};