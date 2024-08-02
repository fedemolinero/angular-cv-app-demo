const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');
// GET all CV IDs
router.get('/get-cv', cvController.getAllCvIds);

// GET CV by ID
router.get('/get-cv/:id', cvController.getCvById);

// POST to save a new CV
router.post('/save-cv', cvController.saveCv);
;

module.exports = router;
