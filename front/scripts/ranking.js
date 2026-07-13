async function llenarTabla() {
    let result = await fetch('http://localhost:4000/partidas', {
        method: "GET", //GET, POST, PUT oz DELETE
        headers: {
            "Content-Type": "application/json",
        }
    }
    )
    console.log("TABLA:", result)

    let vectorDeDatos = (await result.json()).ranking
    console.log("TABLA:", vectorDeDatos)
    let elementosLista = ""
    for (let i = 0; i < vectorDeDatos.length; i++) {
        const element = vectorDeDatos[i];
        elementosLista += `
                <tr>
                <td>${element.user}</td>
                <td>${element.ranking}</td>
                <td>${element.hora_final}</td>
                </tr>
                `;

    }
    console.log(vectorDeDatos)
    document.getElementById('tabla-contenido').innerHTML = elementosLista
}

async function llamadoAlGet() {
    //El get no manda body, si quiero mandar parametros lo sumo a la url con el ?
    const response = await fetch('http://localhost:4000/partidas', {
        method: "GET", //GET, POST, PUT oz DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log(response)
    //Desarma el json y lo arma como un objeto
    let result = await response.json()
    console.log(result)
}