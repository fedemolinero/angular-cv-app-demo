const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

router.post('/create-cv', cvController.createCv);
router.get('/get-cv', cvController.getCv);
// Agregamos la ruta para obtener un CV específico
router.get('/get-cv/:cvId', cvController.getCvById);

module.exports = router;
