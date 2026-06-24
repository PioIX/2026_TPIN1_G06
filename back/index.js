var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */
app.get('/emojies', async function(req,res){
    let respuesta;
    if (req.query.id != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Emojies WHERE id=${req.query.id}`)
    } else {
        respuesta = await realizarQuery("SELECT * FROM Emojies");
    }    
    res.send(respuesta);
})
app.get('/peliculas', async function(req,res){
    let respuesta;
    if (req.query.id != undefined) {
        respuesta = await realizarQuery(`SELECT * FROM Peliculas WHERE id=${req.query.id}`)
    } else {
        respuesta = await realizarQuery("SELECT * FROM Peliculas");
    }    
    res.send(respuesta);
})

app.post('/emojies', async function(req,res) {
 console.log(req.body) //Los pedidos post reciben los datos del req.body
 let existe = []   
 if (req.body.id != undefined) {
         existe = await realizarQuery(`
            SELECT id =${req.body.id} FROM Emojies
        `)
        
    }

    if (existe.length > 0) {
        res.send({ message: "Emojies ya existe" })

    } else {
        await realizarQuery(`
        INSERT INTO Emojies (nombre,tipo) VALUES
        ("${req.body.nombre}","${req.body.tipo}")
    `)
    res.send({ message: "Emojie agregado" });
    }
})

app.post('/peliculas', async function(req,res) {
 console.log(req.body) //Los pedidos post reciben los datos del req.body
 let existe = []   
 if (req.body.id != undefined) {
         existe = await realizarQuery(`
            SELECT id =${req.body.id} FROM Peliculas
        `)
        
    }

    if (existe.length > 0) {
        res.send({ message: "La pelicula ya existe" })

    } else {
        await realizarQuery(`
        INSERT INTO Peliculas (duracion, fecha_estreno, genero, es_saga, es_animado, titulo) VALUES
        ("${req.body.duracion}","${req.body.fecha_estreno}","${req.body.genero}",${req.body.es_saga},${req.body.es_animado},"${req.body.titulo}")
    `)
    res.send({ message: "Pelicula agregada" });
    }
})

app.put('/emojies', async function(req, res){
    console.log("req.body del put :",req.body)
    const respuesta = await realizarQuery(`
        UPDATE Emojies SET nombre = "${req.body.nombreP}", tipo = "${req.body.tipoP}"
        WHERE id=${req.body.id}
     `)
    res.send({ message: "Emojie modificado" })

})

app.put('/peliculas', async function(req, res){
    console.log("req.body del put :",req.body)
    const respuesta = await realizarQuery(`
        UPDATE Peliculas SET duracion = "${req.body.duracion}", fecha_estreno = "${req.body.fecha}",genero = "${req.body.genero}", es_saga = ${req.body.saga}, es_animado = ${req.body.animado}, titulo = "${req.body.titulo}"
        WHERE id=${req.body.id}
     `)
    res.send({ message: "Pelicula modificado" })

})

app.delete('/emojies', function(req, res){
    console.log(req.body)
    realizarQuery(`
        DELETE FROM Emojies WHERE id = "${req.body.id}"
     `)
    res.send({message:"Emojie eliminado"})

} )

app.delete('/peliculas', function(req, res){
    console.log(req.body)
    realizarQuery(`
        DELETE FROM Peliculas WHERE id = "${req.body.id}"
     `)
    res.send({message:"Pelicula eliminado"})

} )

app.post("/registro", async function(req, res) { // <-- Agregado 'async'
    console.log(req.body);

    // Creamos el objeto de respuesta por defecto (falla por defecto)
    let respuesta = {
        ok: false,
        msg: "No se pudo registrar"
    };

    try {
        // 1 - Ver si ya existe el usuario (Buscamos solo por el nombre de usuario o mail)
        let existe = await realizarQuery(`
            SELECT * FROM Usuarios WHERE user = '${req.body.user}' OR mail = '${req.body.mail}'
        `);

        // 2 - Si ya existe, se lo digo modificando el objeto respuesta
        if (existe.length > 0) {
            respuesta.msg = "El nombre de usuario o el email ya están en uso.";
            return res.send(respuesta); 
        }

        // 3 - Si no existe lo registro
        await realizarQuery(`
            INSERT INTO Usuarios (id, user, contra, mail, es_admin) VALUES
            ('${req.body.id}', '${req.body.user}', '${req.body.contra}', '${req.body.mail}', '${req.body.es_admin}');
        `);

        // Si llegó hasta acá, todo salió bien, modificamos la respuesta a éxito
        respuesta.ok = true;
        respuesta.msg = "Usuario registrado con éxito";
        
        // 4 - Le devuelvo lo que sea que pasó
        res.send(respuesta);

    } catch (error) {
        console.error("Error en base de datos:", error);
        respuesta.msg = "Error interno al intentar registrar.";
        res.status(500).send(respuesta);
    }
});


app.post('/usuarios', async function(req, res) {
    console.log(req.body);
    
    let respuesta = await realizarQuery(`   
        SELECT * FROM Usuarios WHERE user = "${req.body.user}" and contra = "${req.body.contra}"
    `); 

    if (respuesta.length > 0) {
        if (req.body.user === "guadalupita" && req.body.contra === "missHim32") {
            res.send({ message: "ingreso exitoso ADMINISTRADOR", tipoUsuario: "admin" });
        } else {
            // Si es cualquier otro usuario de la base de datos
            res.send({ message: "ingreso exitoso NORMAL", tipoUsuario: "comun" });
        }
    } else {
        res.send({ message: "usuario no existe registrate" });
    }
});