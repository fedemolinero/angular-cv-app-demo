const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const { verifyToken } = require('../middleware/authMiddleware');

// Public routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/cv', verifyToken, require('./cvRoutes'));

module.exports = router;
