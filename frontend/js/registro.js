document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script cargado correctamente");

    const form = document.getElementById("registerForm");

    if (!form) {
        console.error("❌ No se encontró el formulario.");
        return;
    }

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        console.log("✅ `event.preventDefault();` ejecutado correctamente.");

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const dni = document.getElementById("dni").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            Swal.fire({
                title: "❌ Error",
                text: "Las contraseñas no coinciden.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
                background: "#1E1E1E",
                color: "#FFF",
                customClass: {
                    popup: "rounded-lg shadow-lg",
                    title: "text-xl font-bold",
                    confirmButton: "px-6 py-3 text-lg",
                }
            });
            return;
        }

        const dniRegex = /^[0-9]{8}[A-Z]$/;
        if (!dniRegex.test(dni)) {
            Swal.fire({
                title: "❌ Error",
                text: "DNI no válido. Debe tener 8 números y una letra.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
                background: "#1E1E1E",
                color: "#FFF",
                customClass: {
                    popup: "rounded-lg shadow-lg",
                    title: "text-xl font-bold",
                    confirmButton: "px-6 py-3 text-lg",
                }
            });
            return;
        }

        const userData = {
            dni,
            correo,
            password,
            owner: nombre,
            rol: "cliente"
        };

        try {
            console.log("📡 Enviando datos al servidor...");
            const response = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("✅ Registro exitoso. Redirigiendo...");

                // Guardamos el mensaje en localStorage
                localStorage.setItem("registroExitoso", "¡Tu cuenta ha sido creada con éxito! Ahora puedes iniciar sesión.");

                // Redirigir a la página de login
                window.location.href = "login.html";

            } else {
                Swal.fire({
                    title: "❌ Error en el registro",
                    text: data.error || "Ocurrió un problema.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "OK",
                    background: "#1E1E1E",
                    color: "#FFF",
                    customClass: {
                        popup: "rounded-lg shadow-lg",
                        title: "text-xl font-bold",
                        confirmButton: "px-6 py-3 text-lg",
                    }
                });
            }
        } catch (error) {
            console.error("❌ Error en la solicitud:", error);
            Swal.fire({
                title: "❌ Error de conexión",
                text: "No se pudo conectar con el servidor.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
                background: "#1E1E1E",
                color: "#FFF",
                customClass: {
                    popup: "rounded-lg shadow-lg",
                    title: "text-xl font-bold",
                    confirmButton: "px-6 py-3 text-lg",
                }
            });
        }
    });
});
