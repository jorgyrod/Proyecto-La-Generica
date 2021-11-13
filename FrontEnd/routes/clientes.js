const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


//--------------- CLIENTES --------------------

//GET - Listar Clientes
//router.get('/', clienteController.listarClientes);

//GET - Mostrar el formulario de Clientes
router.get('/', clienteController.cargarFormCliente);

//POST - Crear cliente 
router.post('/newCliente', clienteController.crearCliente);

//GET - Buscar cliente por cedula (Falta pagina para asignar el cliente)
//router.get('/:cedula', clienteController.buscarCliente);

//PUT - Actualizar cliente
router.put('/:cedula', clienteController.actualizarCliente);

//DELETE - Eliminar cliente
router.delete('/:cedula', clienteController.eliminarCliente);

module.exports = router;