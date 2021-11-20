var ventaService = require('../services/ventaService');
const clienteController = require('../controllers/clienteController');
//Muestra el formulario para crear una nueva venta
exports.cargarFormVentas = function(req,res){
    var venta = {};
    ventaService.cargarId(function(venta,err){
        if (err) {
			console.error('Error al recuperar el id de la venta');
			res.render('error', {
				message: 'Se ha producido un error. Contacte con el administrador.',
				error: null
			});
		} else {
			console.log('Id recuperado:', venta);
			res.render('ventas', {venta: venta});
		}
	});
}

//Creamos un nuevo usuario
exports.crearVenta = function(req,res){
    //Creamos un objeto javascript detalle

    let detalle = {
        cantidad : req.body.cantidad,
        codigoProducto : req.body.codigoProducto,
        Iva : 0,
        Total : 0,
        Subtotal : 0
    }
    
    //Creamos un objeto javascript venta
    // y le asignamos los datos que traemos de la vista con el name
    var venta = {
        cedula : req.body.nmbCedulaCliente,
        codigoVenta : req.body.txtConsec,
        detalles : req.body.nombre,
        iva : req.body.totalIva,
        total : req.body.totalConIva,
        subtotal : req.body.totalVenta
    }
};