const express = require('express');
const router = express.Router();
const { login, logout, checkAuth } = require('../controllers/authController');

// Admin Login
router.post('/login', login);

// Admin Logout
router.post('/logout', logout);

// Check Authentication Status
router.get('/check', checkAuth);

module.exports = router;