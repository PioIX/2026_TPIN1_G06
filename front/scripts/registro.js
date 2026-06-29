/*REGISTRO DE NUEVOS USUARIOS
let idUserLogin = null;

async function ejecutarRegistro() { 
   
    const nombre = document.querySelector("#name").value; 
    const user = document.querySelector("#user").value; 
    const contra = document.querySelector("#contra").value; 
    const dni = document.querySelector("#dni").value; 

    // Validamos que no envíe campos vacíos
    if (dni === "" || nombre === "" || user === "" || contra === "") {
        alert("Por favor, complete todos los campos obligatorios");
        return;
    }

    try {
        
        const respuesta = await fetch("http://localhost:4000/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ dni, nombre, user, contra })
        });

        const datos = await respuesta.json();
        console.log(datos)

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
}*/

async function ejecutarRegistro() { 
    // Tomamos los valores de los inputs de tu formulario de registro
    const id = document.querySelector("#dni").value; // O el ID que uses para el DNI/Identificador
    const user = document.querySelector("#user").value; 
    const contra = document.querySelector("#contra").value; 
    const mail = document.querySelector("#mail").value; 
    const es_admin = 0; // Por defecto los nuevos registros no son admin (0 = falso)

    // Validación visual básica por si dejan campos vacíos
    if (!id || !user || !contra || !mail) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        // Hacemos la petición POST al backend
        const peticion = await fetch("http://localhost:4000/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, user, contra, mail, es_admin })
        });

        // Recibimos el objeto 'respuesta' que armamos en el backend
        const datos = await peticion.json();
        console.log(datos);

        if (datos.ok) {
            // Si el backend respondió ok: true
            alert(datos.msg); // Muestra "Usuario registrado con éxito"
            window.location.href = "login.html"; // Redirige al login
        } else {
            // Si el backend respondió ok: false (porque ya existía u otro motivo)
            alert("Error: " + datos.msg); 
        }

    } catch (error) {
        console.error("Error al conectar:", error);
        alert("No se pudo conectar con el servidor.");
    }
}

// Escuchamos el click del botón de registrarse en tu HTML
const botonRegistrarse = document.querySelector("#botonRegistrarse");
if (botonRegistrarse) {
    botonRegistrarse.addEventListener("click", ejecutarRegistro);
}