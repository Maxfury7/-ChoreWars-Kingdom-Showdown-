require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const xpRoutes = require('./routes/xp');
const db = require('./db');

const app = express();
const path = require('path');

// Initialize database connection
db;

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', {
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  });
  res.status(500).json({ error: 'Internal server error' });
});

// Serve static files from the correct directory
app.use(express.static(path.join(__dirname, '../login and sign in')));

// Route for root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../login and sgin_in/login and sign in/sign_in.html'));
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', xpRoutes);

const PORT = 5504;
console.log(`Attempting to start server on port: ${PORT}`);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
