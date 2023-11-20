const validator = require("validator");

const validarDatos = (parametros) => {

    
    let validarTitulo = !validator.isEmpty(parametros.titulo);
    let validarContenido = !validator.isEmpty(parametros.contenido);
    
    if (!validarTitulo || !validarContenido) {
      throw new Error("Faltan datos");
    }
    
    
}

module.exports = {
    validarDatos
}