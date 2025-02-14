require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = 5502; // Explicitly set port to 5502
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
