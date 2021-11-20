const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventaController');

//--------------- VENTAS --------------------

//GET - Listar VENTAS

//GET - Mostrar el formulario de Clientes
router.get('/', ventasController.cargarFormVentas);

module.exports = router;