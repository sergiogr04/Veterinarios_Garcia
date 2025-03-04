const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.registerUser = async (req, res) => {
    const { dni, correo, password, owner, rol} = req.body;
    
    if(!rol){
        rol = "cliente";
    }

    if (!dni || !correo || !password || !owner) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await usersModel.userExists(dni, correo);
        if (existingUser) {
            return res.status(400).json({
                error: `El usuario con DNI ${dni} o correo ${correo} ya está registrado.`
            });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear usuario
        const userId = await usersModel.createUser({ dni, correo, password: hashedPassword, owner, rol });

        res.status(201).json({ message: "Usuario registrado exitosamente.", userId });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ error: "Error al registrar usuario." });
    }
};


// Iniciar sesión
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son obligatorios." });
    }

    try {
        const user = await usersModel.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta." });
        }

        return res.json({
            success: true,
            message: "Login exitoso",
            user: {
                id: user.usuario_id,
                email: user.correo,
                rol: user.rol
            }
        });
        
    } catch (error) {
        console.error("❌ Error en login:", error);
        res.status(500).json({ error: "Error al iniciar sesión." });
    }
};




// Obtener usuario por ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;

    usersModel.getUserById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener usuario." });
        }
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        res.json(user);
    });
};
// Obtener usuario por DNI
exports.getUserByDni = (req, res) => {
    const dni = req.params.dni;
    console.log("🔍 DNI recibido:", dni);

    usersModel.getUserByDni(dni, (err, user) => {
        if (err) {
            console.error("❌ Error al obtener usuario por DNI:", err);
            return res.status(500).json({ error: "Error al obtener usuario." });
        }
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        res.json(user);
    });
};
