const petsModel = require('../models/petsModel');

// Obtener todas las mascotas
exports.getAllPets = async (req, res) => {
    try {
        const filters = req.query;

        const pets = await petsModel.getAll(filters);
        if (!pets || pets.length === 0) {
            return res.json([]);
        }

        res.json(pets);
    } catch (error) {
        console.error("❌ Error al obtener mascotas:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

// Obtener una mascota por ID
exports.getPetById = (req, res) => {
    const petId = req.params.id;
    petsModel.getById(petId, (err, pet) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener la mascota' });
        }
        if (!pet) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        res.json(pet);
    });
};

// Crear nueva mascota
exports.createPet = (req, res) => {
    const { dni_ref } = req.body;

    petsModel.getUserByDni(dni_ref, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "DNI no válido o usuario no registrado." });
        }

        // Obtener el último ID
        petsModel.getMaxPetId((err, maxId) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener el último ID." });
            }

            const newPetId = maxId ? maxId + 1 : 1;
            const petData = { 
                ...req.body, 
                pet_id: newPetId, 
                correo_ref: user.correo, 
                owner: user.owner 
            };

            petsModel.create(petData, (err, petId) => {
                if (err) {
                    return res.status(500).json({ error: "Error al registrar la mascota." });
                }
                res.status(201).json({ message: "Mascota registrada con éxito.", petId });
            });
        });
    });
};

// Actualizar una mascota por ID
exports.updatePet = (req, res) => {
    const petId = req.params.id;
    const updatedData = req.body;

    if (!updatedData || Object.keys(updatedData).length === 0) {
        return res.status(400).json({ error: "No se enviaron datos para actualizar." });
    }

    petsModel.update(petId, updatedData, (err) => {
        if (err) {
            console.error("❌ Error al actualizar la mascota:", err);
            return res.status(500).json({ error: "Error al actualizar la mascota." });
        }
        console.log("✅ Mascota actualizada con éxito.");
        res.json({ message: "Mascota actualizada" });
    });
};



// Filtrar mascotas por dueño
exports.getPetsByOwner = (req, res) => {
    const { dni } = req.query;
    if (!dni) {
        return res.status(400).json({ error: "Debes proporcionar un DNI de dueño." });
    }

    petsModel.getByOwner(dni, (err, pets) => {
        if (err) {
            return res.status(500).json({ error: "Error al buscar mascotas por dueño." });
        }
        if (!pets.length) {
            return res.status(404).json({ message: "No se encontraron mascotas para este dueño." });
        }
        res.json(pets);
    });
};
// Obtener usuario por DNI
exports.getUserByDni = (req, res) => {
    const dni = req.params.dni;
    petsModel.getUserByDni(dni, (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener usuario." });
        }
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        res.json(user);
    });
};
// Eliminar una mascota por ID
exports.deletePet = (req, res) => {
    const petId = req.params.id;

    petsModel.delete(petId, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error al eliminar la mascota." });
        }
        res.json({ message: "Mascota eliminada con éxito." });
    });
};
