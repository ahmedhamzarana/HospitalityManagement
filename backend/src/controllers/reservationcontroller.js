const Reservation = require("../models/reservation");
const Room = require("../models/room");

exports.createReservation = async (req, res) => {
  try {
    const { user, room, checkIn, checkOut } = req.body;

    const existingRoom = await Room.findById(room);

    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    // ❌ ONLY AVAILABLE ROOMS
    if (existingRoom.status !== "available") {
      return res.status(400).json({
        message: "Room already booked or not available",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return res.status(400).json({ message: "Invalid check-in date" });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ message: "Invalid check-out date" });
    }

    // ✔ CREATE RESERVATION
    const reservation = await Reservation.create({
      user,
      room,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    });

    // ✔ UPDATE ROOM STATUS
    await Room.findByIdAndUpdate(room, {
      status: "occupied",
    });

    return res.status(201).json({
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getAllReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name")
      .populate("room", "roomId floor category status price");

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
