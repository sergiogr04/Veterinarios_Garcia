document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "../index.html";
    } else {
        console.log("Usuario autenticado:", user);
    }

    if (!user || user.rol !== "trabajador") {
        Swal.fire({
            title: "🚫 Acceso Denegado",
            text: "No tienes permisos para acceder a esta página.",
            icon: "warning",
            confirmButtonColor: "#d33",
            confirmButtonText: "Volver al Login"
        }).then(() => {
            window.location.href = "../login.html";
        });
        return;
    }

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
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("user");
                    window.location.href = "../login.html";
                }
            });
        });
    }
});

// Cargar datos de la mascota en el formulario
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const petId = params.get("id");

    fetch(`http://localhost:3000/api/pets/${petId}`)
        .then(res => res.json())
        .then(mascota => {
            document.getElementById("pet-id").value = mascota.pet_id;
            document.getElementById("nombre").value = mascota.name;
            document.getElementById("fecha").value = mascota.birth_date;
            document.getElementById("peso").value = mascota.weight;
            document.getElementById("tipo").value = mascota.type;
        })
        .catch(error => {
            console.error("❌ Error al cargar la mascota:", error);
            Swal.fire({
                title: "❌ Error",
                text: "No se pudo cargar la información de la mascota.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK"
            });
        });

    document.getElementById("form-editar").addEventListener("submit", event => {
        event.preventDefault();
        actualizarMascota();
    });
});

// Función para actualizar los datos de la mascota
function actualizarMascota() {
    const petId = document.getElementById("pet-id").value;
    const mascota = {
        name: document.getElementById("nombre").value.trim(),
        birth_date: document.getElementById("fecha").value.trim(),
        weight: parseFloat(document.getElementById("peso").value.trim()),
        type: document.getElementById("tipo").value.trim()
    };

    fetch(`http://localhost:3000/api/pets/${petId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mascota)
    })
    .then(res => res.json())
    .then(data => {
        if (!data || data.error) {
            throw new Error(data.error || "Error desconocido.");
        }

        console.log("✅ Mascota actualizada:", data);
        localStorage.setItem("mensajeExito", "Mascota actualizada correctamente.");

        window.location.href = "modificar.html";
    })
    .catch(error => {
        console.error("❌ Error al actualizar la mascota:", error);
        Swal.fire({
            title: "❌ Error",
            text: "Hubo un problema al actualizar la mascota.",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK"
        });
    });
}
