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

    if (ingresoUser() === "" || ingresoContra() === "") {
        alert("Complete todos los campos")
        return;
    }

    let result = await postLogin(datos);
    // Evaluamos la respuesta usando tu nueva función del DOM
    if (result.ok) {
        localStorage.setItem("user", result.user);
        localStorage.setItem("dificultad", 1); //1 , 2 o 3
        if (result.tipoUsuario === "admin") {
            ui.changeScreen("indexA.html");   // HTML exclusivo para el admin
        } else {
            ui.changeScreen("indexD.html");  // HTML para usuarios comunes
        }
    } else {
        alert(result.message)
    }
    //let user = localStorage.getItem("user")
}


