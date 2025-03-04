const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Registrar un usuario
router.post('/register', usersController.registerUser);

// Iniciar sesión
router.post('/login', usersController.loginUser);

// Obtener usuario por DNI
router.get('/dni/:dni', usersController.getUserByDni);

module.exports = router;
