const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');

// Obtener todas las mascotas
router.get('/', petsController.getAllPets);

// Obtener una mascota por ID
router.get('/:id', petsController.getPetById);

// Crear una nueva mascota
router.post('/', petsController.createPet);

// Actualizar una mascota
router.put('/:id', petsController.updatePet);

// Eliminar una mascota
router.delete('/:id', petsController.deletePet);

// Filtrar mascotas por dueño
router.get('/search', petsController.getPetsByOwner);


module.exports = router;
