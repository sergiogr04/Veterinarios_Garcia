DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    dni TEXT PRIMARY KEY, -- DNI único del usuario o dueño de mascota
    correo TEXT UNIQUE, -- Correo del usuario
    password TEXT, -- Contraseña (hash)
    owner TEXT, -- Nombre del usuario (dueño)
    rol TEXT CHECK (rol IN ('cliente', 'trabajador')), -- Rol: cliente o trabajador

    pet_id INTEGER UNIQUE, -- ID único para cada mascota
    birth_date TEXT, -- Fecha de nacimiento de la mascota
    name TEXT, -- Nombre de la mascota
    weight REAL, -- Peso en kg
    type TEXT, -- Tipo de mascota (perro, gato, etc.)
    dni_ref TEXT, -- Relación con el dueño (DNI del usuario)
    correo_ref TEXT, -- Correo del dueño (para acceso y gestión)
    owner_ref TEXT -- Nombre del dueño (para mostrar en listados)
);

--TODAS LAS CONTRASEÑAS SON: 123456

-- Insertar usuarios (Clientes con mascotas)
INSERT INTO pets (dni, correo, password, owner, rol)
VALUES
('12345678A', 'juan@ejemplo.com', '$2b$10$1hLD8WZuLRk4td1Z8eSAIuLTjyLKDMZ4SqA7Kdc/1v85395vScyW6', 'Juan Pérez', 'cliente'), 
('23456789B', 'ana@ejemplo.com', '$2b$10$1hLD8WZuLRk4td1Z8eSAIuLTjyLKDMZ4SqA7Kdc/1v85395vScyW6', 'Ana López', 'cliente'),
('34567890C', 'carlos@ejemplo.com', '$2b$10$1hLD8WZuLRk4td1Z8eSAIuLTjyLKDMZ4SqA7Kdc/1v85395vScyW6', 'Carlos Méndez', 'cliente'),
('45678901D', 'sofia@ejemplo.com', '$2b$10$1hLD8WZuLRk4td1Z8eSAIuLTjyLKDMZ4SqA7Kdc/1v85395vScyW6', 'Sofía Ramírez', 'cliente'),
('56789012E', 'miguel@ejemplo.com', '$2b$10$1hLD8WZuLRk4td1Z8eSAIuLTjyLKDMZ4SqA7Kdc/1v85395vScyW6', 'Miguel Torres', 'cliente');

-- Insertar trabajadores (No aparecerán en el listado)
INSERT INTO pets (dni, correo, password, owner, rol)
VALUES
('98765432X', 'admin@ejemplo.com', '$2b$10$1hLD8WZuLRk4td1Z8eSAIuLTjyLKDMZ4SqA7Kdc/1v85395vScyW6', 'Administrador', 'trabajador'),
('87654321Y', 'vet1@ejemplo.com', '$2b$10$1hLD8WZuLRk4td1Z8eSAIuLTjyLKDMZ4SqA7Kdc/1v85395vScyW6', 'Veterinario 1', 'trabajador');

-- Insertar mascotas vinculadas a dueños existentes (Ahora con dueño correcto)
INSERT INTO pets (pet_id, birth_date, name, weight, type, dni_ref, correo_ref, owner_ref)
VALUES
(1, '2020-05-10', 'Max', 12.5, 'perro', '12345678A', 'juan@ejemplo.com', 'Juan Pérez'),
(2, '2018-09-15', 'Luna', 8.3, 'gato', '23456789B', 'ana@ejemplo.com', 'Ana López'),
(3, '2022-01-30', 'Rocky', 20.1, 'perro', '34567890C', 'carlos@ejemplo.com', 'Carlos Méndez'),
(4, '2019-06-21', 'Kiara', 6.2, 'hurón', '45678901D', 'sofia@ejemplo.com', 'Sofía Ramírez'),
(5, '2021-03-12', 'Tommy', 4.8, 'conejo', '56789012E', 'miguel@ejemplo.com', 'Miguel Torres');
