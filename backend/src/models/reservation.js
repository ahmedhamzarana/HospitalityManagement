const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          // check-in must be today or future
          return value >= today;
        },
        message: "Check-in date cannot be in the past",
      },
    },

    checkOut: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return this.checkIn && value > this.checkIn;
        },
        message: "Check-out must be after check-in date",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);