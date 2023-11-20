const { Schema, model } = require("mongoose");

const schema = new Schema({
    titulo: {
        type: String,
        require: true
    },
    contenido: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: "imagen.png"
    }
})

module.exports = model("Articulo", schema, "articulos");