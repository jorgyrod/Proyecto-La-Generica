const usuario = "admininicial";
const password = "admin123456";

//Para mostrar la pagina del login al iniciar
exports.home = function(req,res){
    res.render('login',{layout: 'login'});
};

exports.autenticacion = function(req,res){
    const user = req.body.usuario;
    const pass = req.body.password;

    console.log("Entramos al metodo autenticacion");
    if(usuario === user && password === pass){
        console.log("Acceso concedido");
        res.redirect('productos');
    }else{
        console.log("Usuario o contraseña incorrecta");
    }
};

