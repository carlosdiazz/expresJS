//Estamos requiriendo un modulo
const express = require('express');
//Aqui estoy requiriendo Morgan
const morgan = require('morgan');

//Aqui estoy ejecutando el servidor y creo un objecto para que me devuelva
const app = express();

//Comando para ejeutar con nodemon
//npx nodemon index.js, ahora modifique el package con npm start lo inicio


function logger(req,res,next){
    console.log("Peticion Recibida");
    //Aqui imprimo por cual protocolo en este caso es http, por cual ruta,ene ste caso es localhost
    console.log(`Ruta recibida: ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}



//Esta linea es para decirle a exprexx que pueda leer archivos json
app.use(express.json());
//Aqui estoy llamando a la funcion que mediante app.use MIDDLEWARE
app.use(logger);

//Aqui llamo a la funcion Middleware que traje de morgan
app.use(morgan('dev'))

//Esta cunion es de exprese, y es que podemos ahcer algo antes de que llegue a la ruta en si
//Para todas las rutas /user van a pasar por aqui primero
app.all('/user/:id',(req,res,next)=>{
    console.log('Alguien paso por aqui');
    //res.send('Listo')
    //Con el next lo mando a que siga con la ruta en si pero primero debe de pasar por esta funcion
    next();
});



//Aqui hago una petecion Get
//Petiicon Get sirve para devolver cosa
app.get('/o',(req,res)=>{
    res.send('Hola Mundo por peticion GET');
});

//Aqui hago una peticion por post
//Para recibir detemrinado datos y guardalo en una base de datos o procesador y devolver una respeusta

app.post('/hola',(req,res)=>{
    res.send('Peticion POST Recibida');
});


//Petiicon por PUT
//Para tomar los datos del front y actualizarlo en una base de dato
app.put('/test',(req,res)=>{
    res.send('PETICION PUT');
});

//Para borrar algo dentro de servidor y dar una respuesta
app.delete('/test/:userid',(req,res)=>{
    res.send(`El usuario ${req.params.userid} ha sido borrado`);
});

//Aqui amndo un JSON
app.get("/user",(req, res)=>{
    res.json({
        username:"Carlos0008",
        nombre:"Carlos",
        apellido:"Diaz"
    })
})

//Aqui con /: indico que voy a recibir un id para hacer una apgina dinamica
app.post("/user/:id",(req,res)=>{
    //Este comando me imprimi el JSON
    console.log(req.body);
    //Este comadno mi imprimi el parametro que recibe mendiante la URL
    console.log(req.params)
    res.send("POST RECIBIDO");
})

app.use(express.static('public'));

app.listen(5000,()=> {
    console.log("Server en el puerto 5000");
});


//Minuto 53