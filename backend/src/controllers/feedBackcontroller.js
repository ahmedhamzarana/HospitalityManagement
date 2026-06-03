const User = require("../models/users");
const Feedback = require("../models/feedback");

// CREATE FEEDBACK
exports.createFeedback = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware
    const { rating, comment } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only guests allowed
    if (user.role !== "guest") {
      return res.status(403).json({
        message: "Only guest users can give feedback",
      });
    }

    const feedback = await Feedback.create({
      user: userId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      feedback,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL FEEDBACK
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};