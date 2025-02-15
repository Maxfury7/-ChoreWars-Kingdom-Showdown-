const express = require('express');
const { addXP, getXP } = require('../controllers/authController');
const router = express.Router();

// Add XP to user
router.post('/xp', addXP);

// Get user's XP
router.get('/xp/:userId', getXP);

module.exports = router;
