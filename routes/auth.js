const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Registration route
router.post('/register', authController.registerUser);

// Login route
router.post('/login', authController.loginUser);

module.exports = router;
