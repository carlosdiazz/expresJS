//Todos los ejercicos de aqui son del video de expres de Fazt
//https://www.youtube.com/watch?v=794Q71KVw1k

//Estamos requiriendo un modulo
const express = require('express');
//Aqui estoy requiriendo Morgan
const morgan = require('morgan');
//Aqui estoy ejecutando el servidor y creo un objecto para que me devuelva
const app = express();
//Comando para ejeutar con nodemon
//npx nodemon index.js, ahora modifique el package con npm start lo inicio


//      Settings o Configuracion
//El el primer parametro colocamos el nombre de la variable, en el segundo el valor
app.set('AppName','Carlos Diaz');
//Aqui uso el nombre por defecto de port y especifico que puerto voy a utilizar
app.set('port',3000);

//Aqui especifico el motor de plantilla qu voy a utilizar
app.set('view engine','ejs');



//      Middlewares
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
//Esta funcion me imprimealgo asi 
//PUT /user/74443 200 9.829 ms - 33
app.use(morgan('dev'))




//      Routers o Rutas
//Esta cunion es de exprese, y es que podemos ahcer algo antes de que llegue a la ruta en si
//Para todas las rutas /user van a pasar por aqui primero
app.get("/",(req,res)=>{
    const data= [{name:'carlos'},{name:'carlos2'},{name:'carlos3'},{name:"carlos4"}];
    //Aqui declaro una variable con los mismos datos de data
    res.render('index.ejs', {people:data});
})

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

//Aqui estoy llamando la carperta public que es la parte del fronted para la pagina
app.use(express.static('public'));

//Aqui espoecifico el puerto que voy a utliar para escuchar
app.listen(app.get('port'),()=> {
    console.log(app.get('AppName'))
    console.log("Server en el puerto: ",app.get('port'));
});

app.put("/user/:userrid",(req,res)=>{
    console.log(req.params)
    res.send(`El user ${req.params.userrid} ha sido actualizado`)
})