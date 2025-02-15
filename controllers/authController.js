const User = require('../models/User');

// User registration
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create new user
    const userId = await User.create(username, password);
    res.status(201).json({ 
      message: 'User registered successfully',
      userId,
      xp: 0 // Initialize XP
    });
  } catch (error) {
    console.error('Registration error:', {
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      request: {
        username: req.body.username
      }
    });
    res.status(500).json({ 
      error: 'Registration failed',
      details: error.message 
    });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Get user's XP
    const xp = await User.getXP(user.id);
    res.json({ 
      message: 'Login successful',
      userId: user.id,
      xp
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Add XP to user
const addXP = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    
    if (!userId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid XP amount' });
    }

    await User.addXP(userId, amount);
    const newXP = await User.getXP(userId);
    res.json({ 
      message: 'XP added successfully',
      userId,
      xp: newXP
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add XP' });
  }
};

// Get user XP
const getXP = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const xp = await User.getXP(userId);
    res.json({ 
      userId,
      xp
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get XP' });
  }
};

module.exports = { registerUser, loginUser, addXP, getXP };
