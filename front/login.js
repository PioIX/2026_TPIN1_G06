//Login
async function ejecutarLogin() {
    // Tomamos los valores usando los IDs reales de tu login.html
    const user = document.querySelector("#user").value;
    const contra = document.querySelector("#contra").value;

    // Validación por si dejan campos vacíos
    if (user === "" || contra === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        // Hacemos el fetch a tu servidor local
        const respuesta = await fetch("http://localhost:5500/front/login.html", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Le mandamos al servidor el usuario y contraseña
            body: JSON.stringify({ user, contra })
        });

        const datos = await respuesta.json();

        // Si el servidor responde que está OK
        if (datos.ok) {
            // Guardamos el usuario en el almacenamiento local del navegador
            localStorage.setItem("usuario", JSON.stringify(datos.usuario));
            
            alert("¡Bienvenido!");
            // Redirigimos al menú principal
            window.location.href = "menu.html";
        } else {
            // Si los datos no existen o fallan, avisa
            alert(datos.mensaje || "Los datos son incorrectos. Intenta reingresar o regístrate si no tienes cuenta.");
        }

    } catch (error) {
        console.error("Error en el login:", error);
        alert("No se pudo conectar con el servidor.");
    }
}

// 1. Botón de Login (en login.html)
const botonLogin = document.querySelector("#botonLogin");
if (botonLogin) {
    botonLogin.addEventListener("click", ejecutarLogin);
}