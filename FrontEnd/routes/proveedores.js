const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');


//--------------- PROVEEDORES --------------------

//GET - Listar proveedores


//GET - Mostrar el formulario de Clientes
router.get('/', proveedorController.nuevoProveedor);

//POST - Crear cliente 
router.post('/newProveedor', proveedorController.crearProveedor);

//GET - Buscar proveedor por nit (Falta pagina para asignar el proveedor)
//router.get('/:nit', proveedorController.buscarProveedor);

//PUT - Actualizar cliente
router.put('/:nit', proveedorController.actualizarProveedor);

//DELETE - Eliminar cliente
router.delete('/:nit', proveedorController.eliminarProveedor);

module.exports = router;