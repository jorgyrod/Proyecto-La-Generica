const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const clientes = require('./routes/clientes');
const login = require('./routes/login');
const productos = require('./routes/producto');
const methodOVerride = require('express-method-override');
const partials = require('express-partials');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOVerride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',login);
app.use('/productos',productos);
app.use('/clientes',clientes);


app.listen(3000, ()=>{
    console.log('Servidor Inicia puerto 3000');
})

module.exports = app;