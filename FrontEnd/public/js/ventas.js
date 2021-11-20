window.addEventListener('DOMContentLoaded', inicio, false);

function inicio(){
    document.getElementById('btnAgregar').addEventListener('click', crearDiv, false);
    //document.getElementById('form3').addEventListener('submit', confirmarVenta, false);
}

let cantidad = 1;

function crearDiv(){ //Esta funcion crea un grupo de input de manera dinamica.
    let newCont = document.createElement('div');
    newCont.className = 'row';
    let puntero = document.getElementById('contenedor');
    puntero.appendChild(newCont);
    let newCont2 = document.createElement('div');
    newCont2.className = 'col-lg-3';
    newCont.appendChild(newCont2);
    let nueCont3 = document.createElement('div');
    nueCont3.className = 'input-group mb-3';
    newCont2.appendChild(nueCont3);
    
    cantidad++;
    let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'form-control';
    newInput.name = 'codigoProducto';
    newInput.placeholder = 'Código';
    nueCont3.appendChild(newInput);
    let newInput2 = document.createElement('input');
    newInput2.type = 'button';
    newInput2.id = 'btnConsultar'+cantidad;
    newInput2.className = 'btn btn-info';
    newInput2.value = 'Consultar';
    nueCont3.appendChild(newInput2);
    
    puntero.appendChild(newCont);
    newCont2 = document.createElement('div');
    newCont2.className = 'col-lg-3';
    newCont.appendChild(newCont2);
    nueCont3 = document.createElement('div');
    nueCont3.className = 'input-group';
    newCont2.appendChild(nueCont3);

    let newInput3 = document.createElement('input');
    newInput3.type = 'text';
    newInput3.className = 'form-control';
    newInput3.name = 'nombreProducto';
    newInput3.setAttribute('disabled', '');
    nueCont3.appendChild(newInput3);

    puntero.appendChild(newCont);
    newCont2 = document.createElement('div');
    newCont2.className = 'col-lg-2';
    newCont.appendChild(newCont2);
    nueCont3 = document.createElement('div');
    nueCont3.className = 'input-group';
    newCont2.appendChild(nueCont3);

    let newInput4 = document.createElement('input');
    newInput4.type = 'number';
    newInput4.className = 'form-control';
    newInput4.name = 'cantidad';
    newInput4.min = '1';
    newInput4.value = '1'
    nueCont3.appendChild(newInput4);
    
    puntero.appendChild(newCont);
    newCont2 = document.createElement('div');
    newCont2.className = 'col-lg-2';
    newCont.appendChild(newCont2);
    nueCont3 = document.createElement('div');
    nueCont3.className = 'input-group';
    newCont2.appendChild(nueCont3);
    
    let newInput5 = document.createElement('input');
    newInput5.type = 'number';
    newInput5.className = 'form-control';
    newInput5.name = 'valorTotal';
    newInput5.setAttribute('disabled', '');
    nueCont3.appendChild(newInput5);
}
/*function confirmarVenta(e){
    e.preventDefault();
}*/