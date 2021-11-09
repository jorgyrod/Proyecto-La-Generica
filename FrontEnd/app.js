const usuario = "admininicial";
const password = "admin123456";

//Para obtener los datos del input
const bodyParser = require('body-parser')

const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, '..', 'FrontEnd/public');
//app.use(express.static(path.join(__dirname,'public')));
/**** TENER EN CUENTA USO DE SESSION */
//const session = require('express-session');
//Colocamos en true, para que acepte valores que no sean json
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(request,response) =>{
    //response.sendFile(__dirname + "/public/login.html");
    response.sendFile(path.join(publicPath, 'login.html'));
})



app.post('/producto',(request,response) => {
    const {txtUsuario,txtPassword} = request.body;
    console.log(request.body);
    console.log(`usuario: ${txtUsuario}, password: ${txtPassword}`);
    if(usuario === txtUsuario && password === txtPassword){
        //response.sendFile(path.join(publicPath, 'producto.html'));
        // No funciona - response.redirect('http://localhost:3000/public/producto.html');
    }else{
        console.log("Error al autenticar el usuario");
    }

})

//Le indicamos que el puerto se correra por el 3000
app.listen(3000,() => {
    console.log('Servidor Inicia puerto 3000');
    
})