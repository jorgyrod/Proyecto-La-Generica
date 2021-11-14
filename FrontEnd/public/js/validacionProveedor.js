const form = document.getElementById('form');
const metodo = document.getElementById('metodo');
const crear = document.getElementById('crear');
const actualizar = document.getElementById('actualizar');
const eliminar = document.getElementById('borrar');
const buscar = document.getElementById('consultar');
const nit = document.getElementsByName('nit');

crear.addEventListener('click', () =>{
    form.action = "/proveedores/newProveedor";
    metodo.value = 'POST';
    console.log(`Entramos a crear, con el metodo: ${metodo.value} , en javascript` );
})

actualizar.addEventListener('click', () =>{
    form.action = "/proveedores/" + nit[0].value;
    metodo.value = 'PUT';
    console.log(`Entramos a crear, con el metodo: ${metodo.value} , en javascript` );
})

eliminar.addEventListener('click', () =>{
    form.action = "/proveedores/" + nit[0].value;
    metodo.value = 'DELETE';
    console.log(`Entramos a crear, con el metodo: ${metodo.value} , en javascript` );
})

buscar.addEventListener('click', () =>{
    form.action = "/proveedores/newProveedor";
    metodo.value = 'GET';
    console.log(`Entramos a crear, con el metodo: ${metodo.value} , en javascript` );
})