const form = document.getElementById('form');
const metodo = document.getElementById('metodo');
const crear = document.getElementById('crear');
const actualizar = document.getElementById('actualizar');
const eliminar = document.getElementById('borrar');
const buscar = document.getElementById('consultar');
const cedula = document.getElementsByName('cedula');

crear.addEventListener('click', () =>{
    form.action = "/clientes/newCliente";
    metodo.value = 'POST';
    console.log(`Entramos a crear, con el metodo: ${metodo.value} , en javascript` );
})

actualizar.addEventListener('click', () =>{
    form.action = "/clientes/" + cedula[0].value;
    metodo.value = 'PUT';
    console.log(`Entramos a crear, con el metodo: ${metodo.value} , en javascript` );
})

eliminar.addEventListener('click', () =>{
    form.action = "/clientes/" + cedula[0].value;
    metodo.value = 'DELETE';
    console.log(`Entramos a crear, con el metodo: ${metodo.value} , en javascript` );
})

buscar.addEventListener('click', () =>{
    form.action = "/clientes/newCliente";
    metodo.value = 'GET';
    console.log(`Entramos a crear, con el metodo: ${metodo.value} , en javascript` );
})