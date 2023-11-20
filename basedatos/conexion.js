const mongoose = require("mongoose");

const conexion = async() => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/blog")
        console.log("Conectado correctamente");

    }catch(error){
        console.log(error);
        throw new Error("Error al conectarse");
    }

}

module.exports = {
    conexion
}