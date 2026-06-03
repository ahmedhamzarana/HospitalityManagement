const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: Number,
      required: true,
      unique: true,
      min: 100,
      max: 9999,
      trim: true,
      index: true,
    },

    floor: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      index: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    price: {
      type: Number,
      required: true,
      min: 100,
    },

    category: {
      type: String,
      enum: ["deluxe", "suite", "standard"],
      required: true,
      default: "standard",
      index: true,
    },

    status: {
      type: String,
      enum: ["available", "occupied", "maintenance", "cleaning"],
      default: "available",
      index: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Room", roomSchema);