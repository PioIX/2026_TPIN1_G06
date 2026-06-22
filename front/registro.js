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
}