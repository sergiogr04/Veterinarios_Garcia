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

    document.getElementById("btn-filtrar").addEventListener("click", function () {
        const dni = document.getElementById("filtro-dni").value.trim();
        const nombre = document.getElementById("filtro-nombre").value.trim();
        const correo = document.getElementById("filtro-correo").value.trim();
        const fecha = document.getElementById("filtro-fecha").value.trim();

        let queryParams = [];

        if (dni) queryParams.push(`dni=${encodeURIComponent(dni)}`);
        if (nombre) queryParams.push(`name=${encodeURIComponent(nombre)}`);
        if (correo) queryParams.push(`correo=${encodeURIComponent(correo)}`);
        if (fecha) queryParams.push(`birth_date=${encodeURIComponent(fecha)}`);

        const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

        fetch(`http://localhost:3000/api/pets${queryString}`, { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                console.log("🔎 Datos filtrados recibidos:", data);
                actualizarTablaMascotas(data);
            })
            .catch(error => {
                console.error("❌ Error al filtrar mascotas:", error);
                Swal.fire({
                    title: "❌ Error",
                    text: "No se pudieron filtrar las mascotas.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "OK",
                    background: "#222",
                    color: "#fff"
                });
            });
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

// Actualiza la tabla con las mascotas obtenidas
function actualizarTablaMascotas(mascotas) {
    const tbody = document.getElementById("tabla-mascotas");
    tbody.innerHTML = "";

    if (mascotas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center p-4 text-gray-500">No hay mascotas registradas.</td></tr>`;
        return;
    }

    mascotas.forEach(mascota => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="border p-2">${mascota.pet_id}</td>
            <td class="border p-2">${mascota.name}</td>
            <td class="border p-2">${mascota.dni_ref}</td>
            <td class="border p-2">${mascota.correo_ref}</td>
            <td class="border p-2">${mascota.owner_ref}</td>
            <td class="border p-2">${mascota.type}</td>
            <td class="border p-2">
                <button onclick="eliminarMascota(${mascota.pet_id})" class="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// Cargar mascotas desde la API
function cargarMascotas(filtros = {}) {
    let url = new URL("http://localhost:3000/api/pets");

    Object.keys(filtros).forEach(key => {
        if (filtros[key]) url.searchParams.append(key, filtros[key]);
    });

    fetch(url, { cache: "no-store" })
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tabla-mascotas");
            tbody.innerHTML = "";

            if (!Array.isArray(data)) {
                console.error("❌ La respuesta del servidor no es un array:", data);
                return;
            }

            actualizarTablaMascotas(data);
        })
        .catch(error => {
            console.error("❌ Error al cargar mascotas:", error);
            Swal.fire({
                title: "❌ Error",
                text: "No se pudieron cargar las mascotas.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
                background: "#222",
                color: "#fff"
            });
        });
}

// Eliminar mascota con confirmación
function eliminarMascota(id) {
    Swal.fire({
        title: "⚠️ Confirmar Eliminación",
        text: "¿Estás seguro de que deseas eliminar esta mascota? Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        background: "#222",
        color: "#fff"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:3000/api/pets/${id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                console.log("🗑 Mascota eliminada:", data);
                cargarMascotas();
            })
            .catch(error => {
                console.error("❌ Error al eliminar mascota:", error);
                Swal.fire({
                    title: "❌ Error",
                    text: "Hubo un problema al eliminar la mascota.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "OK",
                    background: "#222",
                    color: "#fff"
                });
            });
        }
    });
}
