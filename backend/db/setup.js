const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.db');
const INIT_SQL = path.join(__dirname, 'init_db.sql');

// Verificar si el archivo init_db.sql existe antes de continuar
if (!fs.existsSync(INIT_SQL)) {
    console.error(`❌ Error: El archivo ${INIT_SQL} no existe. Asegúrate de crearlo.`);
    process.exit(1);
}

// Eliminar la base de datos anterior (opcional en desarrollo)
if (fs.existsSync(DB_FILE)) {
    fs.unlinkSync(DB_FILE);
    console.log('📂 Base de datos eliminada y recreada.');
}

// Crear la base de datos
const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.error('❌ Error al abrir la base de datos:', err.message);
        process.exit(1);
    }
    console.log('✅ Base de datos creada exitosamente.');
});

// Leer el archivo SQL y ejecutarlo
fs.readFile(INIT_SQL, 'utf8', (err, initSQL) => {
    if (err) {
        console.error('❌ Error al leer el archivo SQL:', err.message);
        process.exit(1);
    }

    db.exec(initSQL, (err) => {
        if (err) {
            console.error('❌ Error al inicializar la base de datos:', err.message);
        } else {
            console.log('✅ Base de datos inicializada correctamente con datos de prueba.');
        }
        db.close();
    });
});
