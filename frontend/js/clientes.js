document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        // Si no hay usuario, redirigir a login
        window.location.href = "index.html";
    } else {
        console.log("✅ Usuario autenticado:", user);
    }

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
                    window.location.href = "login.html";
                }
            });
        });
    }

    // Mostrar mensaje si existe en localStorage
    const mensajeExito = localStorage.getItem("mensajeRegistroExitoso");
    if (mensajeExito) {
        Swal.fire({
            title: "✅ Registro Exitoso",
            text: mensajeExito,
            icon: "success",
            confirmButtonColor: "#4CAF50",
            confirmButtonText: "OK"
        });

        // Limpiar el mensaje para evitar que se repita en futuras cargas
        localStorage.removeItem("mensajeRegistroExitoso");
    }
});