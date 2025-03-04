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
            confirmButtonText: "OK",
            background: "#222",
            color: "#fff"
        });

        // Limpiar el mensaje para evitar que se repita en futuras cargas
        localStorage.removeItem("mensajeRegistroExitoso");
    }
});

document.getElementById("form-usuario").addEventListener("submit", function (event) {
    event.preventDefault();

    const rol = document.getElementById("rol").value;
    const dni = document.getElementById("dni").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const owner = document.getElementById("owner").value.trim();

    // Validación de campos vacíos
    if (!dni || !correo || !password || !owner) {
        Swal.fire({
            title: "⚠️ Campos Incompletos",
            text: "Todos los campos son obligatorios.",
            icon: "warning",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
            background: "#222",
            color: "#fff"
        });
        return;
    }

    // Validación de formato DNI
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    if (!dniRegex.test(dni)) {
        Swal.fire({
            title: "⚠️ DNI Inválido",
            text: "El DNI debe contener 8 números seguidos de una letra mayúscula. Ejemplo: 20094973B",
            icon: "warning",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
            background: "#222",
            color: "#fff"
        });
        return;
    }

    const userData = { dni, correo, password, owner, rol };

    console.log("📡 Enviando datos al servidor:", userData);

    fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("❌ Error en el registro:", data.error);
            Swal.fire({
                title: "❌ Error",
                text: data.error,
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
                background: "#222",
                color: "#fff"
            });
        } else {
            console.log("✅ Usuario registrado con éxito.");

            // Guardar mensaje en localStorage para mostrarlo después de la recarga
            localStorage.setItem("mensajeRegistroExitoso", "El usuario ha sido registrado correctamente.");

            // Recargar la página para mostrar el mensaje
            window.location.reload();
        }
    })
    .catch(error => {
        console.error("❌ Error en el registro:", error);
        Swal.fire({
            title: "❌ Error de Conexión",
            text: "Hubo un problema al conectar con el servidor.",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
            background: "#222",
            color: "#fff"
        });
    });
});
