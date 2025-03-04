
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Obtener todas las mascotas (excluyendo trabajadores y dueños sin mascotas)
exports.getAll = (filters) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT pet_id, name, birth_date, weight, type, dni_ref, correo_ref, owner_ref FROM pets WHERE pet_id IS NOT NULL`;
        let queryParams = [];

        if (filters.dni) {
            query += " AND dni_ref = ?";
            queryParams.push(filters.dni);
        }
        if (filters.name) {
            query += " AND name LIKE ?";
            queryParams.push(`%${filters.name}%`);
        }
        if (filters.correo) {
            query += " AND correo_ref LIKE ?";
            queryParams.push(`%${filters.correo}%`);
        }
        if (filters.birth_date) {
            query += " AND birth_date = ?";
            queryParams.push(filters.birth_date);
        }

        db.all(query, queryParams, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Obtener una mascota por ID
exports.getById = (id, callback) => {
    db.get('SELECT * FROM pets WHERE pet_id = ?', [id], (err, row) => {
        callback(err, row);
    });
};

// Insertar una nueva mascota
exports.create = (pet, callback) => {
    const { pet_id, birth_date, name, weight, type, dni_ref, correo_ref, owner } = pet;
    db.run(
        `INSERT INTO pets (pet_id, birth_date, name, weight, type, dni_ref, correo_ref, owner_ref) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [pet_id, birth_date, name, weight, type, dni_ref, correo_ref, owner],
        function (err) {
            callback(err, this.lastID);
        }
    );
};

// Obtener mascotas por dueño (Filtrado por DNI)
exports.getByOwner = (ownerDni, callback) => {
    db.all(
        `SELECT pet_id, name, birth_date, weight, type, dni_ref, correo_ref 
         FROM pets WHERE dni_ref = ?`,
        [ownerDni],
        (err, rows) => {
            callback(err, rows);
        }
    );
};

// Obtener usuario por DNI
exports.getUserByDni = (dni, callback) => {
    db.get(
        `SELECT dni, correo, owner FROM pets WHERE dni = ? AND pet_id IS NULL`, 
        [dni], 
        (err, row) => {
            if (err) {
                console.error("❌ Error en la consulta de DNI:", err);
                return callback(err, null);
            }
            callback(null, row);
        }
    );
};
// Obtener el ID máximo de las mascotas
exports.getMaxPetId = (callback) => {
    db.get("SELECT MAX(pet_id) AS maxId FROM pets", [], (err, row) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, row.maxId);
    });
};

exports.update = (id, pet, callback) => {
    if (!id || isNaN(id)) {
        return callback(new Error("ID de mascota inválido."));
    }

    const { name, birth_date, weight, type } = pet;
    let query = "UPDATE pets SET";
    let fields = [];
    let values = [];

    if (name) {
        fields.push(" name = ?");
        values.push(name);
    }
    if (birth_date) {
        fields.push(" birth_date = ?");
        values.push(birth_date);
    }
    if (weight) {
        fields.push(" weight = ?");
        values.push(weight);
    }
    if (type) {
        fields.push(" type = ?");
        values.push(type);
    }

    // Si no hay campos para actualizar, evitar la consulta
    if (fields.length === 0) {
        return callback(new Error("No se enviaron datos para actualizar."));
    }

    // Construir la consulta
    query += fields.join(",");
    query += " WHERE pet_id = ?";
    values.push(id);

    db.run(query, values, function (err) {
        if (err) {
            console.error("❌ Error en la consulta de actualización:", err);
        }
        callback(err);
    });
};


// Eliminar una mascota por ID
exports.delete = (id, callback) => {
    db.run("DELETE FROM pets WHERE pet_id = ?", [id], function (err) {
        callback(err);
    });
};
