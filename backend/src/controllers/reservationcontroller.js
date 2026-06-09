const Reservation = require("../models/reservation");
const Room = require("../models/room");

// CREATE
exports.createReservation = async (req, res) => {
  try {
    const { user, room, checkIn, checkOut } = req.body;

    const existingRoom = await Room.findById(room);

    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (existingRoom.status !== "available") {
      return res.status(400).json({ message: "Room not available" });
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

    const reservation = await Reservation.create({
      user,
      room,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      status: "pending",
    });

    await Room.findByIdAndUpdate(room, { status: "occupied" });

    res.status(201).json({
      message: "Reservation created",
      reservation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAllReservation = async (req, res) => {
  try {
    let reservations;
    if(req.user.role === "guest"){
          const reservations = await Reservation.find({user: req.user.id})
      .populate("user", "name")
      .populate("room", "roomId category price status");

      return res.json(reservations);
    }else{
       const reservations = await Reservation.find()
      .populate("user", "name")
      .populate("room", "roomId category price status");

    res.json(reservations);
    }

   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS FLOW
exports.updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    reservation.status = status;
    await reservation.save();

    // ROOM FREE ON FINAL STATUS
    if (status === "checked_out" || status === "cancelled") {
      await Room.findByIdAndUpdate(reservation.room, {
        status: "available",
      });
    }

    res.json({ message: "Status updated", reservation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};