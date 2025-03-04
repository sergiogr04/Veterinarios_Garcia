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

    console.log("✅ Usuario autenticado:", user);
    cargarMascotas();

    // Mostrar mensaje de éxito si viene de editar
    const mensajeExito = localStorage.getItem("mensajeExito");
    if (mensajeExito) {
        Swal.fire({
            title: "✅ Éxito",
            text: mensajeExito,
            icon: "success",
            confirmButtonColor: "#4CAF50",
            confirmButtonText: "OK",
            background: "#222",
            color: "#fff"
        });

        // Limpiar mensaje para evitar que se muestre en futuras cargas
        localStorage.removeItem("mensajeExito");
    }

    // Evento para filtrar mascotas
    document.getElementById("btn-filtrar").addEventListener("click", function () {
        const filtros = {
            dni: document.getElementById("filtro-dni").value.trim(),
            name: document.getElementById("filtro-nombre").value.trim(),
            correo: document.getElementById("filtro-correo").value.trim(),
            birth_date: document.getElementById("filtro-fecha").value.trim()
        };

        cargarMascotas(filtros);
    });

    // Logout con alertas en modo oscuro
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

// Cargar mascotas en la tabla
function cargarMascotas(filtros = {}) {
    let url = new URL("http://localhost:3000/api/pets");

    Object.keys(filtros).forEach(key => {
        if (filtros[key]) url.searchParams.append(key, filtros[key]);
    });

    fetch(url, { cache: "no-store" })
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tabla-mascotas");
            tbody.innerHTML = ""; // Vaciar la tabla antes de agregar los nuevos datos

            if (!Array.isArray(data)) {
                console.error("❌ La respuesta del servidor no es un array:", data);
                Swal.fire({
                    title: "❌ Error",
                    text: "Los datos recibidos no son válidos.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "OK",
                    background: "#222",
                    color: "#fff"
                });
                return;
            }

            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" class="text-center p-4 text-gray-500">No hay mascotas registradas.</td></tr>`;
                return;
            }

            data.forEach(mascota => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td class="border p-2">${mascota.pet_id || "N/A"}</td>
                    <td class="border p-2">${mascota.name || "Desconocido"}</td>
                    <td class="border p-2">${mascota.dni_ref || "N/A"}</td>
                    <td class="border p-2">${mascota.correo_ref || "N/A"}</td>
                    <td class="border p-2">${mascota.owner_ref || "N/A"}</td>
                    <td class="border p-2">${mascota.type || "Desconocido"}</td>
                    <td class="border p-2">
                        <button onclick="editarMascota(${mascota.pet_id})" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition">Editar</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error("❌ Error al cargar mascotas:", error);
            Swal.fire({
                title: "❌ Error",
                text: "Hubo un problema al cargar las mascotas.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
                background: "#222",
                color: "#fff"
            });
        });
}

// Redirigir a la página de edición con ID de la mascota
function editarMascota(id) {
    window.location.href = `editar.html?id=${id}`;
}
