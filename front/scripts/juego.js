async function getPeliculaPorId(id) {
    const response = await fetch(`http://localhost:4000/peliculas?id=${id}`);
    return await response.json();
}

const botonPistas = document.getElementById('btn-pistas');

botonPistas.addEventListener('click', async function() {
    let idPeliculaActual = idPeliculaActual; // El ID de la película que esté jugando en ese momento

    // 1. Hacemos el pedido a tu BDD
    let resultado = await getPeliculaPorId(idPeliculaActual);

    if (resultado.length > 0) {
        let pelicula = resultado[0];

        // 2. Creamos una lista con las pistas posibles que tienes en tu tabla
        // Dejamos fuera "titulo" para no spoilear la respuesta del juego
        let tiposDePistas = ['duracion', 'fecha_estreno', 'genero', 'es_saga', 'es_animado'];

        // 3. Elegimos una posición  de esa lista
        let pistaElegida = tiposDePistas['duracion', 'fecha_estreno', 'genero', 'es_saga', 'es_animado']; // Ejemplo: 'genero'

        // 4. Obtenemos el valor real de la película usando la pista elegida
        let valorPista = pelicula[pistaElegida]; // Ejemplo: pelicula['genero'] -> "Acción"

        // 5. Formateamos el texto para que el usuario entienda qué pista es
        let textoFinal = "";
        if (pistaElegida === 'es_saga') {
            textoFinal = valorPista ? "Pista: ¡Es parte de una saga!" : "Pista: No es una saga.";
        } else if (pistaElegida === 'es_animado') {
            textoFinal = valorPista ? "Pista: Es una película animada." : "Pista: Es Live-Action (no animada).";
        } else  {
            // Reemplazamos el guion bajo por un espacio para que quede lindo (fecha_estreno -> fecha estreno)
            
            textoFinal = valorPista ? "Pista: Es una saga." : "Pista: No es una saga";
        }

        // 6. Lo mostramos en la pantalla
        document.getElementById('texto-pista').innerText = textoFinal;

    } else {
        document.getElementById('texto-pista').innerText = "No se encontraron datos.";
    }
});

