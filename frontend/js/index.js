document.addEventListener("DOMContentLoaded", function () {
    const html = document.documentElement;
    const button = document.getElementById("themeToggle");

    if (!button) {
        console.error("No se encontró el botón de cambio de tema");
        return;
    }

    console.log("El botón se ha encontrado correctamente.");

    // Obtener el tema guardado
    let storedTheme = localStorage.getItem("theme") || "dark"; 

    // Aplicar el tema correctamente
    function applyTheme(theme) {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            button.textContent = "☀️"; 
        } else {
            document.documentElement.classList.remove("dark");
            button.textContent = "🌙";
        }
        
        // Forzar el re-render para que Tailwind detecte el cambio
        setTimeout(() => {
            document.documentElement.classList.remove("dark");
            void document.documentElement.offsetWidth; 
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            }
        }, 0);
    
        localStorage.setItem("theme", theme);
    }
    

    // Aplicar el tema inicial
    applyTheme(storedTheme);

    // 🎛️ Evento para cambiar tema
    button.addEventListener("click", function () {
        console.log("Botón presionado");

        // Alternar entre "dark" y "light"
        let newTheme = html.classList.contains("dark") ? "light" : "dark";
        console.log("Cambiando a:", newTheme);

        applyTheme(newTheme);
        console.log("Nuevo tema guardado:", localStorage.getItem("theme"));
    });
});
