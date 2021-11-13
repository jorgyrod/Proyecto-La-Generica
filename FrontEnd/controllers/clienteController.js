var clienteService = require('../services/clienteService');

//Muestra el formulario para crear un nuevo cliente
exports.cargarFormCliente = function(req,res){
    var cliente = {};
    res.render('newCliente', {cliente: cliente});
}

//Creamos un nuevo usuario
exports.crearCliente = function(req,res){
    //Creamos un objeto javascript cliente
    // y le asignamos los datos que traemos de la vista con el name
    var cliente = {
        cedula : req.body.cedula,
        nombre : req.body.nombre,
        direccion : req.body.direccion,
        telefono : req.body.telefono,
        email : req.body.email
    }
    //Llamamos a la funcion crear cliente del servicio cliente
    // y le pasamos el objeto cliente y la funcion
    clienteService.crearCliente(cliente, function(cliente, err){
        if(err) {
            console.log('Error al crear el cliente');
        } else {
            console.log('Cliente creado: ', cliente);
            res.redirect('/clientes');
            //Aqui iria un mensaje de confirmacion visual al usuario
        }
    });
};

//Actualizar cliente 
exports.actualizarCliente = function(req, res) {
    var cliente = {
        cedula : req.body.cedula,
        nombre : req.body.nombre,
        direccion : req.body.direccion,
        telefono : req.body.telefono,
        email : req.body.email
    }

    clienteService.updateCliente(cliente, function(cliente,err){
        if(err) {
            console.log('Error al actualizar el cliente');
        } else {
            console.log('Cliente modificado: ', cliente);
            res.redirect('/clientes');
            //Aqui iria un mensaje de confirmacion visual al usuario
        }
    });
};

//Buscar Cliente por cedula
exports.buscarCliente = function(req, res){
    const cedula = req.body.cedula;

    clienteService.loadCliente(cedula, function(cliente, err){
        if(err){
            console.log('Error al encontrar el cliente');
        } else {
            console.log('Cliente encontrado: ', cliente);
             //Aqui iria donde vamos a listar el cliente encontrado
             //Aqui iria un mensaje de confirmacion visual al usuario
        }
    });
};

//Listar Clientes
exports.listarClientes = function(req, res) {
    clienteService.listarClientes(function(clientes, err){
        if(err){
            console.log('Error al listar los clientes');
        } else {
            console.log('Clientes encontrados: ', clientes);
            //Aqui iria donde vamos a listar los clientes encontrados
            //Aqui iria un mensaje de confirmacion visual al usuario
        }
    });
};

//Eliminar cliente usando su cedula
exports.eliminarCliente = function(req, res){
    const cedula = req.body.cedula;

    clienteService.deleteCliente(cedula, function(err){
        if(err){
            console.error('Error al eliminar el cliente');
        } else {
            console.log('Cliente eliminaado: ', cedula);
            res.redirect('/clientes');
            //Aqui iria un mensaje de confirmacion visual al usuario
        }
    });
};