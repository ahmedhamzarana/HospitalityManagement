const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'manager', 'receptionist', 'maintainanace', 'housekeeping'], default: null},
    status: { type: String, enum: ['active', 'deactive'], default: 'deactive' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);