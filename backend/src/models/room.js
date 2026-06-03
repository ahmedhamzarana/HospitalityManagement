const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomid: {
    type: Number,
    unique: true,
    required: true,
    min: 100,
    max: 9999
  }
});

module.exports = mongoose.model("Room", roomSchema);