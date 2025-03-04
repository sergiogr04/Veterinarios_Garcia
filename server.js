const express = require('express');
const cors = require('cors');
const petsRouter = require('./routes/pets');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Usar las rutas de mascotas
app.use('/pets', petsRouter);

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
