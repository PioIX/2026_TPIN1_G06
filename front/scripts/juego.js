// TEMPORAL: hasta que esté hecha la selección de película del juego
let idPeliculaActual = 16; // poné un id que sepas que existe en tu tabla

async function getPeliculaPorId(id) {
    const response = await fetch(`http://localhost:4000/peliculas?id=${id}`);
    return await response.json();
}

const botonPistas = document.getElementById('btn-pistas');

botonPistas.addEventListener('click', async function() {
    // 1. Hacemos el pedido a la BDD (usamos directamente la variable global de arriba)
    let resultado = await getPeliculaPorId(idPeliculaActual);

    if (resultado.length > 0) {
        let pelicula = resultado[0];

        // 2. Creamos una lista con las pistas posibles que están en la tabla
        let tiposDePistas = ['duracion', 'fecha_estreno', 'genero', 'es_saga', 'es_animado'];

        // 3. Elegimos una posición al azar de esa lista
        let indiceRandom = Math.floor(Math.random() * tiposDePistas.length);
        let pistaElegida = tiposDePistas[indiceRandom];

        // 4. Obtenemos el valor real de la película usando la pista elegida
        let valorPista = pelicula[pistaElegida];

        // 5. Formateamos el texto según qué pista salió
        let textoFinal = "";

        if (pistaElegida === 'es_saga') {
            textoFinal = valorPista ? "Pista: ¡Es parte de una saga!" : "Pista: No es una saga.";
        } else if (pistaElegida === 'es_animado') {
            textoFinal = valorPista ? "Pista: Es una película animada." : "Pista: Es Live-Action (no animada).";
        } else if (pistaElegida === 'duracion') {
            textoFinal = `Pista: Dura ${valorPista}.`;
        } else if (pistaElegida === 'fecha_estreno') {
            textoFinal = `Pista: Se estrenó en ${valorPista}.`;
        } else if (pistaElegida === 'genero') {
            textoFinal = `Pista: El género es ${valorPista}.`;
        }

        // 6. Lo mostramos en la pantalla
        document.getElementById('texto-pista').innerText = textoFinal;

    } else {
        document.getElementById('texto-pista').innerText = "No se encontraron datos.";
    }
});