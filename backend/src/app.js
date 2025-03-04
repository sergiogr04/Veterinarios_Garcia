require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Importar la base de datos directamente para verificar conexión
const getDbConnection = require('./config/database');
const db = getDbConnection(); 


// Importar rutas
const petsRoutes = require('./routes/pets');
const usersRoutes = require('./routes/users');

const app = express();

// Configuración del puerto
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/pets', petsRoutes);
app.use('/api/users', usersRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API Mascotas Veterinario funcionando 🚀' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
