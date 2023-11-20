const {conexion} = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");
const routerArticulo = require("./rutas/articulo");
const bodyParser = require("body-parser");

//conectar base de datos
conexion();

//crear servidor node

const app = express();
const port = 3900;

//configurar corse

app.use(cors());

//convertir body a json

app.use(bodyParser.json());
app.use(express.json());// recibir datos con content type app/json
app.use(express.urlencoded({extended:true})); // Conseguir la key y el value y comvertirlos a json


//crear rutas
app.use("/api",routerArticulo)

//escuchar peticiones http
app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);

});