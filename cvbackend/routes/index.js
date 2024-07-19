const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const cvRoutes = require('./cvRoutes');

router.use('/auth', authRoutes);
router.use('/cv', cvRoutes);

module.exports = router;
