const express = require('express');
const router = express.Router();
const productos = require('../controllers/subirProductos');

//--------------- INDEX/AUTENTICACION ---------

router.get("/", productos.cargarFormProducto);

router.post("/subirCSV", productos.subirArchivoCSV);

module.exports = router;