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




//Pedidos:
async function llamadoAlGet() {
    //El get no manda body, si quiero mandar parametros lo sumo a la url con el ?
    const response = await fetch('http://localhost:4000/emojies',{
        method:"GET", //GET, POST, PUT oz DELETE
        headers: {
        "Content-Type": "application/json",
        },
    })

    console.log(response)
    //Desarma el json y lo arma como un objeto
    let result = await response.json()
    console.log(result)
}

async function llamadoAlGetP() {
    //El get no manda body, si quiero mandar parametros lo sumo a la url con el ?
    const response = await fetch('http://localhost:4000/peliculas',{
        method:"GET", //GET, POST, PUT oz DELETE
        headers: {
        "Content-Type": "application/json",
        },
    })

    console.log(response)
    //Desarma el json y lo arma como un objeto
    let result = await response.json()
    console.log(result)
}

//Los datos en el post se mandan dentro de un objeto 
async function envioPost(datos) {
    const response = await fetch('http://localhost:4000/emojies',{
        method:"POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
    })

    console.log(response)
    //Desarma el json y lo arma como un objeto
    let result = await response.json()
    console.log(result)
}

function tomarDatos() {
    let datos = {
        nombre: ingresoNombre(),
        tipo: ingresoTipo(),
    }
    envioPost(datos)
}

async function envioPostP(datosP) {
    const response = await fetch('http://localhost:4000/peliculas',{
        method:"POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosP) //JSON.stringify convierte de objeto a JSON
    })

    console.log(response)
    //Desarma el json y lo arma como un objeto
    let result = await response.json()
    console.log(result)
}


function tomarDatosP() {
    let datosP = {
        duracion: ingresoDuracion(),
        fecha_estreno: ingresoFecha(),
        genero: ingresoGenero(),
        es_saga: ingresoSaga(),
        es_animado: ingresoAnimado(),
        titulo: ingresoTitulo(),
    }
    envioPostP(datosP)
}

const selector = document.getElementById('selector-datos');
async function cargarSelect() {
try {
        let result = await fetch('http://localhost:4000/emojies ') 
        let resultado = await result.json()
        selector.innerHTML = '<option value="">Seleccione un emojie...</option>';
        for (let i = 0; i < resultado.length; i++) {
            const element = resultado[i];
                selector.innerHTML += `<option value="${element.id}">${element.tipo}</option>`;
            
            };
    } catch (error) {
    console.log("Error al cargar los datos:", error);
}} 
cargarSelect();

async function cambiarDato() {
    let datos = {
        tipoP: document.getElementById("ingresoTipoPUT").value,  
        nombreP: document.getElementById("ingresoNombrePUT").value,
        id:document.getElementById("selector-datos").value,

    }
try {
        console.log("Recibi : ",datos)
        const response = await fetch('http://localhost:4000/emojies',{
        method:"PUT", //GET, POST, PUT o DELETE
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(datos) 
        })
    
        console.log(response)
        let result = await response.json()
        console.log(result)
} catch (error) {
    console.log("Error de red o conexión:", error);
}
    
}
const selectorB = document.getElementById('selector-datos-eliminar')
async function cargarSelectB() {
try {
        let result = await fetch('http://localhost:4000/emojies ') 
        let resultado = await result.json()
        selectorB.innerHTML = '<option value="">Seleccione un emojie...</option>';
        for (let i = 0; i < resultado.length; i++) {
            const element = resultado[i];
                selectorB.innerHTML += `<option value="${element.id}">${element.tipo}</option>`;
            
            };
    } catch (error) {
    console.log("Error al cargar los datos:", error);
}} 
cargarSelectB();

async function borrarDatos() {
    let datos = {
        id:document.getElementById("selector-datos-eliminar").value,
    }
        const response = await fetch('http://localhost:4000/emojies',{
        method:"DELETE", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos) 
    })

    console.log(response)
    let result = await response.json()
    console.log(result)
}