var proveedorService = require('../services/proveedorService');

//Muestra el formulario para crear un nuevo cliente
exports.nuevoProveedor = function(req,res){
    var proveedor = {};
    res.render('newProveedor', {proveedor: proveedor});
}

//Creamos un nuevo usuario
exports.crearProveedor = function(req,res){
    console.log("Entramos al controlador crear");
    //Creamos un objeto javascript cliente
    // y le asignamos los datos que traemos de la vista con el name
    var proveedor = {
        nit : req.body.nit,
        nombre : req.body.nombre,
        direccion : req.body.direccion,
        telefono : req.body.telefono,
        ciudad : req.body.ciudad
    }
    //Llamamos a la funcion crear cliente del servicio cliente
    // y le pasamos el objeto cliente y la funcion
    proveedorService.crearProveedor(proveedor, function(proveedor, err){
        if(err) {
            console.log('Error al crear el proveedor');
        } else {
            console.log('Proveedor creado: ', proveedor);
            res.redirect('/proveedores');
        }
    });
};

//Actualizar cliente 
exports.actualizarProveedor = function(req, res) {
    var proveedor = {
        nit : req.body.nit,
        nombre : req.body.nombre,
        direccion : req.body.direccion,
        telefono : req.body.telefono,
        ciudad : req.body.ciudad
    }

    proveedorService.updateProveedor(proveedor, function(proveedor,err){
        if(err) {
            console.log('Error al actualizar el proveedor');
        } else {
            console.log('proveedor modificado: ', proveedor);
            res.redirect('/proveedores');
        }
    });
};

//Buscar Proveedor por nit
exports.buscarProveedor = function(req, res){
    const nit = req.body.nit;

    proveedorService.loadProveedor(nit, function(proveedor, err){
        if(err){
            console.log('Error al encontrar el proveedor');
        } else {
            console.log('Proveedor encontrado: ', proveedor);
        }
    });
};

//Listar Proveedores
exports.listarProveedor = function(req, res) {
    proveedorService.listarProveedor(function(proveedor, err){
        if(err){
            console.log('Error al listar los proveedores');
        } else {
            console.log('Proveedores encontrados: ', proveedor);
        }
    });
};

//Eliminar proveedores usando su nit
exports.eliminarProveedor = function(req, res){
    const nit = req.body.nit;

    proveedorService.deleteProveedor(nit, function(err){
        if(err){
            console.error('Error al eliminar el Proveedor');
        } else {
            console.log('Proveedor eliminado: ', nit);
            res.redirect('/proveedores');
        }
    });
};