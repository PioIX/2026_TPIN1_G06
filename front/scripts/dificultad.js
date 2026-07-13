

async function elegirDificultad(nivel) {
    localStorage.setItem("dificultad", nivel); //1 , 2 o 3
    ui.changeScreen("indexJD.html");  // HTML para usuarios comunes

}
let pelicula
let peliculaSalidas = []
let cantPistas = 0;
let pistas;
async function cargarPreguntas() {
    const response = await fetch(`http://localhost:4000/EmojiexPelicula`);
    let result = await response.json()
    console.log(result.juegos[0]);
    console.log(result)
    let emojis = []
    let nivel = localStorage.getItem("dificultad"); 
    console.log("NIvel: " + nivel)
    let yaSalio = false

    const response2 = await fetch(`http://localhost:4000/Peliculas`);
    let peliculasPistas = await response2.json()
    console.log("PELIS", peliculasPistas)


    do{
        yaSalio = false
        pelicula = result.juegos[getRandomInt(result.juegos.length - 1)]
        console.log(pelicula) 
            for (let i = 0; i < peliculasPistas.length; i++) {
        if (peliculasPistas[i].titulo == pelicula.titulo) {
            pistas = peliculasPistas[i];
            break;
        }
    }
        for (let i = 0; i < peliculaSalidas.length; i++) {
            const element = peliculaSalidas[i];
            if (pelicula.titulo == peliculaSalidas[i].titulo) {
                yaSalio = true
                console.log("ya salio!!")
                break;
            }
        }
    } while(yaSalio)
    peliculaSalidas.push(pelicula)
    for (let i = 0; i < result.juegos.length; i++) {
        const element = result.juegos[i];
        if (pelicula.titulo == element.titulo) {
            emojis.push(element.tipo)
        }
        
    } 
    console.log(emojis)
    switch (nivel) {
        case "1":
            emojis.splice(0,0)
            break;
        case "2":
            emojis.splice(3,1)
            break;
        default:
            emojis.splice(2,2)
            break;
            }
    document.getElementById("emojis").innerHTML = emojis.toLocaleString()
    cantPistas = 0; 
    const textoPista = document.getElementById('texto-pista');
    if (textoPista) textoPista.innerText = "";

}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let puntaje = 0
let intentos = 0
async function adivinarP() {
    console.log("entre")
    const inputUsuario = document.getElementById("guess");
    const guess = inputUsuario.value; 
    console.log(guess)

    if (!guess) {
        alert("Por favor, escribe el nombre de una película.");
        return;
    }

    let tituloCorrecto = pelicula.titulo.toLowerCase().trim();
    let respuestaUsuario = guess.toLowerCase().trim();
    //*cantidadPreguntas ++;
    if (respuestaUsuario === tituloCorrecto) {
        alert("¡Correcto! 🎉");
        puntaje++;
        localStorage.setItem("puntaje", puntaje);
        console.log("puntaje: " ,puntaje)

        if(puntaje == 15){
            alert("PUNTAJE MAX")
            ui.changeScreen("indexR.html")
        }
    
        inputUsuario.value = ""; // Limpiamos el input
        await cargarPreguntas();  // Cargamos la siguiente película
        
    } else {
        alert("Incorrecto, ¡sigue intentando! ❌");
        intentos++;
        console.log("intentos: ", intentos)
        localStorage.setItem("intentos", intentos);
        if(intentos == 5){
            
            console.log("perdist")
            inputUsuario.value = ""; // Limpiamos el input
            await cargarPreguntas();  // Cargamos la siguiente película
            intentos = 0
            alert("Perdiste")
            // ui.changeScreen("indexR.html")
        }
    }
}



// Guardamos acá las pistas que ya se mostraron en esta partida


// Escuchamos el botón de pistas
const botonPistas = document.getElementById('btn-pistas');


botonPistas.addEventListener('click', function() {
    if (!pelicula) {
        document.getElementById('texto-pista').innerText = "Primero debes iniciar el juego.";
        return;
    }

    console.log("pelicula elegida", pelicula);
    let textoFinal = "";

    // Ahora sí va a entrar correctamente en orden: 0, 1, 2, 3, 4
    if (cantPistas == 0) {
        textoFinal = pistas.es_saga ? "Pista: ¡Es parte de una saga!" : "Pista: No es una saga.";
    } else if (cantPistas == 1) {
        // CORRECCIÓN: es_animado (con 'o' como en la BDD)
        textoFinal = pistas.es_animado ? "Pista: Es una película animada. 🧸" : "Pista: Es Live-Action (no animada). 🎬";
    } else if (cantPistas == 2) {
        textoFinal = `Pista: Dura ${pistas.duracion}. ⏱️`;
    } else if (cantPistas == 3) {
        let fecha = pistas.fecha_estreno.split("T")[0];
        console.log(fecha);
        textoFinal = `Pista: Se estrenó el ${fecha}. 📅`;
    } else if (cantPistas == 4) {
        textoFinal = `Pista: El género es ${pistas.genero}. 🎭`;
    }

    // Mostramos en pantalla
    document.getElementById('texto-pista').innerText = textoFinal;

    // Aumentamos el contador para el PRÓXIMO click, y reiniciamos si llegó a 4
    if (cantPistas == 4) {
        cantPistas = 0;
    } else {
        cantPistas++;
    }
});

async function cargarDatosPartida() {
    let puntaje = localStorage.getItem("puntaje");
    let user = localStorage.getItem("user");
    let datos = {
        user: user,
        ranking: puntaje,
    }
    console.log("aca datos:",datos)
    const response = await fetch('http://localhost:4000/partidas',{
        method:"POST", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
    })

    console.log(response)
    let result = await response.json()
    console.log(result)
    ui.changeScreen('indexR.html')
}

function finalizarJuego() {
    cargarDatosPartida()
    
    
}