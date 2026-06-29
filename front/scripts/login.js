async function postLogin(datos) {
    const response = await fetch('http://localhost:4000/usuarios', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    });
    return await response.json();
}

async function tomarDatosL() {
    let datos = {
        user: ingresoUser(),
        contra: ingresoContra(),
    };
    
    let result = await postLogin(datos);
    if (ingresoUser() === "" || ingresoContra() === "") {
        alert("Complete todos los campos")
        return;
    }
    // Evaluamos la respuesta usando tu nueva función del DOM
    if (result.tipoUsuario === "admin") {
            ui.changeScreen("indexA.html");   // HTML exclusivo para el admin
        } else {
            ui.changeScreen("indexj.html");  // HTML para usuarios comunes
        }
}


