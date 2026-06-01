const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const connectDB = require('./config/conn');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});