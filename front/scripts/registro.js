
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