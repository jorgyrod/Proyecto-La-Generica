const http = require('http');

//Parametros genericos de la api RestFul
const host = 'localhost';
const port = '7000';
var path = '/api/ventas'

exports.cargarId = function(next){
    path += '/IdCuenta';
    const options = {
        host: host,
        port: port,
        path: path,
        method: 'GET',
    };

    invocarServicio(options, null, function(venta, err) {
        if(err){
            next(null, err);
        }else{
            next(venta, null);
        }
    })

}
/*
    Funcion encargada de crear la venta
    - Recibe como parametro un objeto javascript llamado venta
    - Recibe como parametro un callback

    Un callback es una funcion que recibe como parametro otra funcion y la ejecuta
*/ 
exports.crearVenta = function(venta,next){
    //Cargamos en forma de objeto JSON los datos del venta
    const ventaData = JSON.stringify({
        "cedula_cliente" : venta.cedula,
        "codigo_venta" : venta.codigoVenta,
        "detalleVenta" : venta.detalles,
        "iva_venta" : venta.iva,
        "total_venta" : venta.total,
        "valor_venta" : venta.subtotal
    });

    //Establecemos los valores de carga para conectarnos a la api
    const options = {
        host: host,
        port: port,
        path: path,
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Content-Length": ventaData.length,
        }
    };

    /*Invocamos el servicio RestFul con las opciones configuradas
        y los datos del cliente
    */
    invocarServicio(options, ventaData, function(venta, err) {
        if(err){
            next(null, err);
        }else{
            next(venta, null);
        }
    })
};

//Funcion encargada de listar todos los usuarios
exports.listarVentas = function(next) {
    const options = {
        host: host,
        port: port,
        path: path,
        method: 'GET',
    };

    invocarServicio(options, null, function(venta,err){
        if(err){
            next(null, err);
        } else {
            next(venta, null);
        }
    });
};


/**
 * Función encargada de invocar los servicios RESTful y devolver
 * el objeto JSON correspondiente.
 * 
 * - Recibe como parametro
 *     - options: las opciones de la peticion para conectar con la api
 *     - jsonObject: objeto JSON que se construira en el body de la peticion
 *     - next: funcion callback que se invocará para tratar los resultados del servicio web.
 */
function invocarServicio(options, jsonObject, next) {
    //Creamos peticion (request) con las opciones del servicio y un callback
    var req = http.request(options, function(res) {
        //Recuperamos el tipo de datos del contenido de la respuesta
        const contentType = res.headers['content-type'];
        //Guardamos los datos de la apiRest
        var data = '';

        //Evento que se lanza cada vez que se leen datos de la respuesta
        //chunk son trozos o pedazos de la informacion obtenida
        res.on('data', function(chunk){
            data += chunk;
        }).on('end', function() {
            //Este sera un evento que se lanza cuando termina de recuperar  y procesar
            //la respuesta

            //Recibimos los datos procesados
            var response = data;
            //Evaluamos que el contentType no este vacio
            if(contentType){
                //Nos aseguramos de que sea tipo JSON
                if (contentType.indexOf('application/json') != -1) {
                    //Si es asi convertimos los datos obtenidos en un objeto
                    //JavaScript, para manipularlos y mostrarlos en la vista
					response = JSON.parse(data);
				}
            }
            // Invocamos el next con los datos de respuesta
            next(response,null);
        })
        // Si hay errores al PROCESAR LA RESPUESTA los mostramos en consola
        .on('error', function(err) {
            console.error('Error al procesar el mensaje: ' + err);
        })
        //Si obtenemos una EXPECION QUE NO CAPUTURAMOS la mostramos en consola
        .on('uncaughtException', function (err) {
            console.error('Error, excepcion: '+ err);
        });

    }).on('error', function(err) {
        //Si hay errores de PETICION los imprimimos por consola
        console.error('HTTP request failed: ' + err);
        // y se la pasamos a un callback para que la trate en otro archivo
        //esos errores
        next(null, err);
    });

    //Si la peticion tiene datos, estos se envian con la request
    //para mostrarlos en pantalla ejemplo envia el cliente que creamos o editamos
    if(jsonObject){
        req.write(jsonObject);
    }
    //Finalizamos la peticion
    req.end();
}