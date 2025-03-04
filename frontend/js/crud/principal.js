document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "../index.html";
    } else {
        console.log("✅ Usuario autenticado:", user);
    }

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
    }

    // Logout con alerta en modo oscuro
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
    cargarDatos();
    // +Mostrar mensaje de éxito si existe en localStorage
    const mensajeAlta = localStorage.getItem("mensajeAlta");
    if (mensajeAlta) {
        Swal.fire({
            title: "✅ Registro Exitoso",
            text: mensajeAlta,
            icon: "success",
            confirmButtonColor: "#4CAF50",
            confirmButtonText: "OK",
            background: "#222",
            color: "#fff"
        });

        // Eliminar el mensaje para que no se repita en futuras visitas
        localStorage.removeItem("mensajeAlta");
    }
});

// Cargar datos desde la API
function cargarDatos() {
    fetch("http://localhost:3000/api/pets")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            cargarTabla(data);
        })
        .catch(error => {
            console.error("❌ Error al cargar los datos:", error);
            Swal.fire({
                title: "❌ Error al Cargar",
                text: "Hubo un problema al obtener los datos.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
                background: "#222",
                color: "#fff"
            });

            document.getElementById("tabla-datos").innerHTML =
                `<tr><td colspan="6" class="text-red-500 text-center">Error al cargar los datos.</td></tr>`;
        });
}

// Llenar la tabla con las mascotas
function cargarTabla(mascotas) {
    const tbody = document.getElementById("tabla-datos");
    tbody.innerHTML = "";

    mascotas.forEach(mascota => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="border p-2">${mascota.pet_id}</td>
            <td class="border p-2">${mascota.name}</td>
            <td class="border p-2">${mascota.dni_ref}</td>
            <td class="border p-2">${mascota.correo_ref}</td>
            <td class="border p-2">${mascota.owner_ref}</td>
            <td class="border p-2">${mascota.type}</td>
        `;
        tbody.appendChild(fila);
    });
}

// Logout con alerta oscura
document.getElementById("logout").addEventListener("click", () => {
    Swal.fire({
        title: "⚠️ Cerrar Sesión",
        text: "¿Seguro que deseas salir?",
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
            window.location.href = "/login.html";
        }
    });
});
