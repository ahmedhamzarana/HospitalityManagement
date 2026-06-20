const User = require('../models/users');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    let errors = {};

    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (!phone) errors.phone = 'Phone Number is required';
    if (!password) errors.password = 'Password is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (phone && phone.length < 11) {
      errors.phone = 'Phone Number must be at least 11 digits';
    }

    if (password && password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        errors.email = 'Email already exists';
      }
    }

    if (phone) {
      const existingNumber = await User.findOne({ phone });
      if (existingNumber) {
        errors.phone = 'Phone Number already exists';
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    const token = generateToken(user._id);

    return res.status(201).json({
      message: 'Registration successful',
      redirect: '/login',
      token,
      user,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password   } = req.body;
    let errors = {};

    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      errors.email = 'Invalid Email format';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errors: {
          email: 'Invalid Email ',
        },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: {
          password: 'Invalid Password',
        },
      });
    }

    const token = generateToken(user._id, user.email);

    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone:user.phone,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};