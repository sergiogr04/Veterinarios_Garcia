const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");

// Verificar si el usuario ya existe
exports.userExists = (dni, correo) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT dni, correo FROM pets WHERE dni = ? OR correo = ?", [dni, correo], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// Crear usuario
exports.createUser = (user) => {
    return new Promise((resolve, reject) => {
        const { dni, correo, password, owner, rol } = user;
        
        db.run(
            "INSERT INTO pets (dni, correo, password, owner, rol) VALUES (?, ?, ?, ?, ?)",
            [dni, correo, password, owner, rol],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

// Obtener usuario por email
exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT dni AS usuario_id, correo, password, owner, rol FROM pets WHERE correo = ?', 
        [email], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// Obtener usuario por DNI
exports.getUserByDni = (dni, callback) => {
    db.get(
        `SELECT dni, correo, owner FROM pets WHERE dni = ? LIMIT 1`, 
        [dni], 
        (err, row) => {
            if (err) {
                console.error("❌ Error en la consulta de DNI:", err);
                return callback(err, null);
            }
            if (!row) {
                console.warn("⚠️ No se encontró un usuario con ese DNI.");
            }
            callback(null, row);
        }
    );
};

