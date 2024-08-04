const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

// Ruta para obtener todos los IDs de CV
router.get('/get-cv', cvController.getAllCvIds);

// Ruta para obtener un CV por ID
router.get('/get-cv/:id', cvController.getCvById);

// Ruta para guardar un CV existente
router.post('/save-cv', cvController.saveCv);

// Ruta para crear un nuevo CV
router.post('/create-cv', cvController.createNewCv);

// Ruta para borrar un CV
router.delete('/get-cv/:id', cvController.deleteCv);

module.exports = router;
