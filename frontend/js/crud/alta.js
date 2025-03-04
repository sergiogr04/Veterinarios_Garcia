document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.rol !== "trabajador") {
        Swal.fire({
            title: "🚫 Acceso Denegado",
            text: "No tienes permisos para acceder a esta página.",
            icon: "warning",
            confirmButtonColor: "#d33",
            confirmButtonText: "Volver al Login",
            background: "#222",
            color: "#fff"
        }).then(() => {
            window.location.href = "../login.html";
        });
        return;
    }

    document.getElementById("verificar-dni").addEventListener("click", verificarDni);
    document.getElementById("form-alta").addEventListener("submit", registrarMascota);

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            Swal.fire({
                title: "⚠️ Cerrar Sesión",
                text: "¿Seguro que deseas cerrar sesión?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar",
                background: "#222",
                color: "#fff"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("user");
                    window.location.href = "../login.html";
                }
            });
        });
    }
});

// Validar que el DNI sigue el formato correcto (8 números + 1 letra)
function validarDni(dni) {
    return /^[0-9]{8}[A-Za-z]$/.test(dni);
}

// Verificar DNI en la base de datos
function verificarDni() {
    const dni = document.getElementById("dni").value.trim();

    if (!dni) {
        mostrarAlerta("⚠️ DNI Requerido", "Por favor, ingresa un DNI para verificar.", "warning");
        return;
    }

    if (!validarDni(dni)) {
        mostrarAlerta("❌ DNI Inválido", "El formato del DNI debe ser 8 números seguidos de una letra (ej: 20094973B).", "error");
        return;
    }

    fetch(`http://localhost:3000/api/users/dni/${dni}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                mostrarAlerta("❌ DNI No Encontrado", "No existe un usuario con ese DNI.", "error");
            } else {
                document.getElementById("correo").value = data.correo;
                document.getElementById("owner").value = data.owner;
            }
        })
        .catch(error => {
            console.error("❌ Error al verificar el DNI:", error);
            mostrarAlerta("❌ Error", "Hubo un problema al verificar el DNI.", "error");
        });
}

// Registrar nueva mascota
function registrarMascota(event) {
    event.preventDefault();

    const mascota = {
        dni_ref: document.getElementById("dni").value.trim(),
        correo_ref: document.getElementById("correo").value.trim(),
        owner: document.getElementById("owner").value.trim(),
        name: document.getElementById("nombre").value.trim(),
        birth_date: document.getElementById("cumpleaños").value.trim(),
        weight: parseFloat(document.getElementById("peso").value.trim()),
        type: document.getElementById("tipo").value.trim()
    };

    // Validaciones
    if (!mascota.dni_ref || !mascota.name || !mascota.birth_date || isNaN(mascota.weight) || !mascota.type) {
        mostrarAlerta("⚠️ Campos Incompletos", "Todos los campos son obligatorios.", "warning");
        return;
    }

    if (!validarDni(mascota.dni_ref)) {
        mostrarAlerta("❌ DNI Inválido", "El formato del DNI debe ser 8 números seguidos de una letra (ej: 20094973B).", "error");
        return;
    }

    fetch("http://localhost:3000/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mascota)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            mostrarAlerta("❌ Error", "Hubo un problema al registrar la mascota.", "error");
        } else {
            // Guardamos el mensaje en localStorage para mostrarlo después de redirigir
            localStorage.setItem("mensajeAlta", "✅ La mascota fue registrada con éxito.");
            window.location.href = "principal.html";
        }
    })
    .catch(error => {
        console.error("❌ Error al registrar mascota:", error);
        mostrarAlerta("❌ Error", "Hubo un problema con el registro.", "error");
    });
}

// Función genérica para mostrar alertas con modo oscuro
function mostrarAlerta(titulo, mensaje, icono) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
        background: "#222",
        color: "#fff"
    });
}
