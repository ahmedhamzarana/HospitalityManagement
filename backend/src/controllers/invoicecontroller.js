const Invoice = require("../models/invoice");
const Reservation = require("../models/reservation");

// CREATE INVOICE
exports.createInvoice = async (req, res) => {
  try {
    const { reservationId } = req.body;

    const reservation = await Reservation.findById(reservationId)
      .populate("user")
      .populate("room");

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    // ❌ prevent duplicate invoice
    const existing = await Invoice.findOne({
      reservation: reservationId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Invoice already exists",
      });
    }

    const nights =
      Math.ceil(
        (new Date(reservation.checkOut) -
          new Date(reservation.checkIn)) /
          (1000 * 60 * 60 * 24)
      ) || 1;

    const roomCharges = reservation.room.price * nights;

    const invoice = await Invoice.create({
      reservation: reservation._id,
      guest: reservation.user._id,
      room: reservation.room._id,

      items: [
        {
          label: "Room Charges",
          amount: roomCharges,
        },
      ],

      totalAmount: roomCharges,
      status: "UNPAID",
    });

    res.status(201).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL INVOICES
exports.getInvoices = async (req, res) => {
  try {
    let invoices;

    if (req.user.role === "guest") {
      invoices = await Invoice.find({
        guest: req.user.id,
      })
        .populate("guest", "name email phone")
        .populate("room", "roomId category")
        .populate("reservation", "checkIn checkOut")
        .sort({ createdAt: -1 });
    } else {
      invoices = await Invoice.find()
        .populate("guest", "name email phone")
        .populate("room", "roomId category")
        .populate("reservation", "checkIn checkOut")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json({
      success: true,
      invoices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET SINGLE INVOICE
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("guest", "name email phone")
      .populate("room", "roomId category")
      .populate("reservation", "checkIn checkOut");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// MARK AS PAID
exports.markAsPaid = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status: "PAID" },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};