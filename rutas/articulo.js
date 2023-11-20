const express = require("express");
const router = express.Router();
const ArticuloController = require("../controladores/articulo");
const multer = require("multer");

const almacenamiento = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imagenes/articulos/')
    },

    filename: function (req, file, cb) {
        cb(null, 'articulo' + Date.now() + file.originalname);
    }
})

const subidas = multer({
    storage: almacenamiento
})



//rutas de prueba


router.post("/crear", ArticuloController.crear);

router.get("/conseguir-articulos/:ultimos?", ArticuloController.conseguir_articulos);

router.get("/conseguir-articulo/:titulo", ArticuloController.conseguir_articulo);

router.delete("/borrar-articulo/:id", ArticuloController.borrar_articulo);

router.put("/actualizar/:id", ArticuloController.actualizar_articulo);

router.post("/subir-imagen/:id", [subidas.single("file0")], ArticuloController.subirImagen);

router.get("/conseguir-imagen/:fichero", ArticuloController.mostrarImagen);

router.get("/buscar/:busqueda", ArticuloController.buscador);


module.exports = router;
