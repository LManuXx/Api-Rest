const Articulo = require("../modelos/Articulo");
const { validarDatos } = require("../helper/validarDatos");
const fs = require('fs');
const path = require('path');



const crear = async (req, res) => {
  // Recoger parametros por post a guardar
  let parametros = req.body;

  // Validar los datos

  try {

    validarDatos(parametros);

  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos"
    });
  }

  // Crear el objeto
  const articulo = new Articulo(parametros);

  // Guardar el articulo usando async/await
  try {
    const articuloGuardado = await articulo.save();

    return res.status(200).json({
      mensaje: "Objeto guardado",
      articulo: articuloGuardado
    });
  } catch (error) {
    return console.log(error);
  }
};

const conseguir_articulos = (req, res) => {

  let consulta = Articulo.find({});
  if (req.params.ultimos) {
    consulta.limit(req.params.ultimos);
  }

  consulta.sort({ fecha: -1 }).exec()
    .then(articulos => {
      return res.status(200).send({
        doc: articulos
      })
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        messagge: "Error al obtener llos datos"
      });
    })
}

const conseguir_articulo = (req, res) => {
  const tituloBucado = req.params.titulo;
  Articulo.findOne({ titulo: tituloBucado }).exec()
    .then(articulo => {
      return res.status(200).send({
        doc: articulo
      })
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        messagge: "Error al obtener llos datos"
      });
    })
}

const borrar_articulo = (req, res) => {
  let id = req.params.id;
  Articulo.findByIdAndDelete(id).exec()
    .then(articulo => {
      return res.status(200).send({
        mensaje: "Articulo eliminado correctamente",
        doc: articulo
      })
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        messagge: "Error al obtener llos datos"
      });
    })

}


const actualizar_articulo = (req, res) => {
  const id = req.params.id; // Se obtiene el ID del artículo a actualizar desde los parámetros de la URL
  const { titulo, contenido } = req.body; // Se obtienen los datos actualizados del artículo desde el cuerpo de la solicitud

  try {

    validarDatos(parametros);

  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos"
    });
  }

  // Crear un objeto con los campos a actualizar
  const camposActualizados = {};
  if (titulo) camposActualizados.titulo = titulo;
  if (contenido) camposActualizados.contenido = contenido;

  // Usar findByIdAndUpdate para buscar y actualizar el artículo por su ID
  Articulo.findByIdAndUpdate(id, camposActualizados, { new: true }) // El parámetro { new: true } devuelve el artículo actualizado en lugar del original
    .then(articulo => {
      // Verificar si el artículo fue encontrado y actualizado correctamente
      if (!articulo) {
        return res.status(404).send({ message: 'Artículo no encontrado' });
      }

      return res.status(200).send({ doc: articulo });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).send({ message: 'Error al actualizar el artículo' });
    });
};


const subirImagen = (req, res) => {

  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "Error",
      mensaje: "No hay imagen"
    });
  }

  // nombre del archivo
  let nombre = req.file.originalname;
  //extension del archivo
  let archivo = nombre.split("\.");
  let extension = archivo[1];

  // comprobar extension
  if (extension != 'png' && extension != 'jpg' && extension != 'jpeg' && extension != 'gif') {
    // borrar archivo
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "Error",
        mensaje: "Extension invalida"
      });
    })

  } else {

    // editar archivo

    const id = req.params.id; // Se obtiene el ID del artículo a actualizar desde los parámetros de la URL
    const camposActualizados = { imagen: req.file.filename }

    // Usar findByIdAndUpdate para buscar y actualizar el artículo por su ID
    Articulo.findByIdAndUpdate(id, camposActualizados, { new: true }) // El parámetro { new: true } devuelve el artículo actualizado en lugar del original
      .then(articulo => {
        // Verificar si el artículo fue encontrado y actualizado correctamente
        if (!articulo) {
          return res.status(404).send({ message: 'Artículo no encontrado' });
        }

        return res.status(200).send({ doc: articulo });
      })
      .catch(error => {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar el artículo' });
      });

  }

}

const mostrarImagen = (req, res ) => {
  const fichero = req.params.fichero;
  let camino = "./imagenes/articulos/"+ fichero;
  fs.stat(camino, (error,existe)=>{
    if(existe){
      return res.sendFile(path.resolve(camino))
    }else{
      return res.status(404).send({ message: 'Artículo no encontrado' });

    }
  })

}

const buscador = (req, res ) => {
  // sacar el string de busqueda
  let busqueda = req.params.busqueda;

  // find or 
  Articulo.find({
    "$or":[
      {'titulo': {"$regex" : busqueda , "$options": "i"}}
    ]
  })
  // orden

  // ejecutar consulta

  //devolver resultado
}


module.exports = {
  crear,
  conseguir_articulos,
  conseguir_articulo,
  borrar_articulo,
  actualizar_articulo,
  subirImagen,
  mostrarImagen,
  buscador
};
