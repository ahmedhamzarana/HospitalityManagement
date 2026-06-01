const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    // Save logged-in user in request
    req.user = user;

    // Go to next route
    next();

  } catch (err) {
    res.status(401).json({
      error: 'Invalid token'
    });
  }
};