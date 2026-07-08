

async function elegirDificultad(nivel) {
    localStorage.setItem("dificultad", nivel); //1 , 2 o 3
    ui.changeScreen("indexJD.html");  // HTML para usuarios comunes

}
let pelicula
let peliculaSalidas = []
async function cargarPreguntas() {
    const response = await fetch(`http://localhost:4000/EmojiexPelicula`);
    let result = await response.json()
    console.log(result)
    let emojis = []
    let nivel = localStorage.getItem("dificultad"); 
    console.log("NIvel: " + nivel)
    let yaSalio = false
    do{
        pelicula = result.juegos[getRandomInt(result.juegos.length - 1)]
        console.log(pelicula) 
        for (let i = 0; i < peliculaSalidas.length; i++) {
            const element = peliculaSalidas[i];
            if (pelicula.titulo == peliculaSalidas[i].titulo) {
                yaSalio = true
            }
        }
    }while(yaSalio)
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
        if(puntaje == 15){
            alert("PUNTAJE MAX")
            ui.changeScreen("indexR.html")
        }
        //1) LLEGA PUNTAJE A 15, LO LLEVAN A PUNTAJE
        //2) AGREGUENLE UN BOTON PARA SALIR (EL BOTON NO VA ACA)
        //3) AGREGUEN UNA VARIABLE GLOBAL QUE SEA INTENTOS FALLIDOS. QUE ARRANQUE EN CERO
        //A MEDIDA QUE ERRA LE SUMAN 1 SI LLEGA A 5 EN INCORRECTO LO SACAN
        //SI ACIERTA LO PONEN EN CERO OTRA VEZ, ASI SON 5 INTENTOS POR PELICULA
        inputUsuario.value = ""; // Limpiamos el input
        await cargarPreguntas();  // Cargamos la siguiente película
    } else {
        alert("Incorrecto, ¡sigue intentando! ❌");
        intentos++;
        localStorage.setItem("intentos", intentos);
        if(intentos == 5){
            alert("Perdiste")
            console.log("perdist")
            ui.changeScreen("indexR.html")
        }
    }
}




