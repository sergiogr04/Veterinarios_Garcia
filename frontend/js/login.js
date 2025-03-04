document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de login cargado correctamente");

    // Mostrar mensaje de éxito si venimos de registro
    const mensajeRegistro = localStorage.getItem("registroExitoso");
    if (mensajeRegistro) {
        Swal.fire({
            title: "🎉 ¡Registro Exitoso!",
            text: mensajeRegistro,
            icon: "success",
            confirmButtonColor: "#4CAF50",
            confirmButtonText: "Genial 😃",
            background: "#1E1E1E",
            color: "#FFF",
            backdrop: `
                rgba(0, 0, 0, 0.8)
                url("https://i.gifer.com/7efs.gif")
                center top
                no-repeat
            `,
            customClass: {
                popup: "rounded-lg shadow-lg",
                title: "text-xl font-bold",
                confirmButton: "px-6 py-3 text-lg",
            }
        });

        // Limpiar el mensaje para que no se repita en futuras cargas
        localStorage.removeItem("registroExitoso");
    }

    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("📨 Enviando datos de inicio de sesión...");

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error en la autenticación");
            }

            console.log("✅ Usuario autenticado:", data.user);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Mensaje de éxito y redirección
            Swal.fire({
                title: "✅ ¡Bienvenido de nuevo!",
                text: "Inicio de sesión exitoso. Redirigiendo...",
                icon: "success",
                confirmButtonColor: "#4CAF50",
                confirmButtonText: "Vamos 🚀",
                background: "#1E1E1E",
                color: "#FFF",
                customClass: {
                    popup: "rounded-lg shadow-lg",
                    title: "text-xl font-bold",
                    confirmButton: "px-6 py-3 text-lg",
                }
            }).then(() => {
                if (data.user.rol === 'cliente') {
                    window.location.href = "clientes.html";
                } else {
                    window.location.href = "crud/principal.html";
                }
            });

        } catch (error) {
            console.error("❌ Error en la autenticación:", error);
            Swal.fire({
                title: "❌ Error",
                text: error.message,
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
