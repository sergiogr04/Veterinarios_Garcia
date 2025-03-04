# Veterinarios García

## 📌 Descripción
**Veterinarios García** es una aplicación web que permite gestionar mascotas en una clínica veterinaria. Incluye autenticación de usuarios con distintos roles (clientes y trabajadores), un panel de administración para la gestión de mascotas y funcionalidades clave para la administración de la clínica.

---

## 📥 Instalación y Configuración

### 1️⃣ **Requisitos Previos**
Asegúrate de tener instalados los siguientes programas en tu sistema:
- **Node.js** (https://nodejs.org/)
- **npm** (gestor de paquetes de Node.js, incluido en la instalación de Node.js)
- **SQLite3** (sudo apt install sqlite3)

### 2️⃣ **Clonar el repositorio**
```bash
# Clona el proyecto desde GitHub (sustituir ENLACE_GITHUB)
git clone https://github.com/sergiogr04/Veterinarios_Garcia.git
cd Veterinarios_Garcia
```

### 3️⃣ **Inicializar la base de datos**
```bash
node backend/db/setup.js
```

### 4️⃣ **Iniciar el servidor**
```bash
node backend/src/app.js
```

### 5️⃣ **Ejecutar el frontend**
Simplemente abre `index.html` en tu navegador favorito.

---

## 🚀 API Endpoints
La API del backend está construida con Express.js y expone los siguientes endpoints:

### 📍 **Gestión de Mascotas** (`/pets`)
```javascript
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
```

### 📍 **Gestión de Usuarios** (`/users`)
```javascript
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Registrar un usuario
router.post('/register', usersController.registerUser);

// Iniciar sesión
router.post('/login', usersController.loginUser);

// Obtener usuario por DNI
router.get('/dni/:dni', usersController.getUserByDni);

// Obtener información de un usuario por ID
router.get('/id/:id', usersController.getUserById);

module.exports = router;
```

---

## 🔑 Roles y Permisos

### 👨‍⚕️ **Trabajadores**
✔️ Pueden iniciar sesión.  
✔️ Pueden dar de alta, modificar y eliminar mascotas.  
✔️ Pueden crear nuevos usuarios (tanto clientes como trabajadores).  

### 🏠 **Clientes**
✔️ Pueden registrarse y autenticarse por sí mismos.  
⚠️ *Actualmente, el módulo de clientes no está desarrollado, ya que no se solicita en el trabajo.*

#### 📌 **Futuras Funcionalidades para Clientes:**
- Visualización de sus mascotas registradas.
- Agendar citas con veterinarios.
- Acceder al historial médico de sus mascotas.
- Consultar el calendario de vacunación.

---

## 🛠️ Herramientas Utilizadas

✔️ **Interfaz moderna y responsiva** con *Tailwind CSS* y soporte para *modo oscuro*.  
✔️ **Autenticación** con distintos roles (*cliente* y *trabajador*).  
✔️ **Gestión de mascotas** (alta, edición, eliminación).  
✔️ **Panel de administración** para trabajadores.  
✔️ **Manejo de alertas** con *SweetAlert*.  
✔️ **Validaciones en formularios** para evitar errores.  
✔️ **Backend REST API** con *Node.js* y *Express*.  
✔️ **Base de datos SQLite** para almacenamiento persistente.  


## 🔒 Contraseñas
- Todos los elementos insertados utilizan como contraseña 123456

## 👥 Usuarios
-  Todos los usuarios insertados se pueden ver enm ()