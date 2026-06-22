// Variable global que ya tenías para saber si hay usuario logueado
let idUserLogin = null;


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
        const respuesta = await fetch("http://localhost:4000/login", {
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


//REGISTRO DE NUEVOS USUARIOS
async function ejecutarRegistro() { 
   
    const nombre = document.querySelector("#name").value; 
    const user = document.querySelector("#user").value; 
    const contra = document.querySelector("#contra").value; 
    const dni = document.querySelector("#dni").value; 

    // Validamos que no envíe campos vacíos
    if (dni === "" || nombre === "" || user === "" || contra === "") {
        alert("Por favor, complete todos los campos obligatorios (Nombre, Usuario, Contraseña y DNI)");
        return;
    }

    try {
        // Enviamos los datos solicitados por la consigna (id/dni, nombre completo, usuario, contraseña)
        const respuesta = await fetch("http://localhost:4000/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ dni, nombre, user, contra })
        });

        const datos = await respuesta.json();

        if (datos.ok) {
            alert(datos.mensaje); // "Usuario registrado con éxito"
            window.location.href = "login.html"; // Lo mandamos a loguearse
        } else {
            // Si el backend avisa que el DNI o el Usuario ya están repetidos, entra acá
            alert("Error: " + datos.mensaje); 
        }

    } catch (error) {
        console.error("Error al registrar:", error);
        alert("No se pudo conectar con el servidor.");
    }
}


// BOTONES
// Usamos condicionales 'if' porque este mismo JS se comparte en ambas páginas.
// Si el botón existe en la página actual, le asignamos su función.

// 1. Botón de Login (en login.html)
const botonLogin = document.querySelector("#botonLogin");
if (botonLogin) {
    botonLogin.addEventListener("click", ejecutarLogin);
}

// 2. Botón de ir a la página de registro (en login.html)
const botonIrARegistro = document.querySelector("#botonPagRegistro");
if (botonIrARegistro) {
    botonIrARegistro.addEventListener("click", () => {
        window.location.href = "registro.html"; 
    });
}

// 3. Botón de Registrarse (en registro.html)
const botonRegistrarse = document.querySelector("#botonRegistrarse");
if (botonRegistrarse) {
    botonRegistrarse.addEventListener("click", ejecutarRegistro);
}


