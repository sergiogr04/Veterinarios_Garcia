# 📖 Documentación de la API - Mascotas de un Veterinario

## 🛠️ Descripción
Esta API gestiona el sistema de mascotas y usuarios de una veterinaria, permitiendo el registro, modificación, eliminación y consulta de datos. Además, se incluye autenticación de usuarios.

## 📌 Endpoints Disponibles

1. **Mascotas (Pets)**
   - Obtener todas las mascotas (`GET /api/pets`)
   - Obtener una mascota por ID (`GET /api/pets/:id`)
   - Crear una nueva mascota (`POST /api/pets`)
   - Actualizar una mascota (`PUT /api/pets/:id`)
   - Eliminar una mascota (`DELETE /api/pets/:id`)
   - Filtrar mascotas por dueño (`GET /api/pets/search?owner=nombre`)

2. **Usuarios (Users)**
   - Registrar usuario (`POST /api/users/register`)
   - Iniciar sesión (`POST /api/users/login`)
   - Obtener información de usuario (`GET /api/users/dni/:dni`)
---

## 🔹 **Mascotas (Pets)**

### 📍 Obtener todas las mascotas
- **Método:** `GET`
- **Endpoint:** `/api/pets`
- **Descripción:** Devuelve un listado con todas las mascotas registradas.

#### 📤 Ejemplo de Respuesta:
```json
[
    {
        "pet_id": 1,
        "birth_date": "2023-06-15",
        "name": "Max",
        "weight": 5.4,
        "owner": "Carlos Rodríguez",
        "type": "Perro"
    }
]
