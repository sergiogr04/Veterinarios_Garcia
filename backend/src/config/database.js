const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Cambia el directorio de trabajo a 'backend/' antes de abrir la base de datos
process.chdir(path.resolve(__dirname, '../..'));

const DB_FILE = path.resolve(__dirname, '../../db/database.db');

console.log(`📂 Intentando conectar con la base de datos en: ${DB_FILE}`);
console.log(`📂 Directorio actual de ejecución después de forzar:`, process.cwd());
console.log(`📂 __dirname en database.js:`, __dirname);
console.log(`📂 ¿Existe?`, fs.existsSync(DB_FILE));

try {
    fs.accessSync(DB_FILE, fs.constants.R_OK | fs.constants.W_OK);
    console.log(`📂 ¿Es legible? ✅ Sí`);
} catch (err) {
    console.error(`❌ No se puede acceder a la base de datos: ${err.message}`);
    process.exit(1);
}

// CREAR CONEXIÓN SEGURA A SQLITE
const db = new sqlite3.Database(DB_FILE, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('❌ ERROR CRÍTICO: No se pudo abrir SQLite:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Conexión establecida correctamente con SQLite.');
    }
});

// Modo síncrono para evitar bloqueos
db.exec('PRAGMA synchronous=FULL;', (err) => {
    if (err) {
        console.error('⚠️ Error al establecer modo síncrono en SQLite:', err.message);
    } else {
        console.log('✅ SQLite configurado en modo síncrono.');
    }
});

module.exports = () => db;
