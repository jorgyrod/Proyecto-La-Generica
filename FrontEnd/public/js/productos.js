window.addEventListener('DOMContentLoaded', inicio, false);
//Formulario
const form = document.getElementById("form-archivo");
//Input de Archivo
const input = document.getElementById("formFile");
//Boton de envio
const boton = document.getElementById("btnSubir");

function inicio(){
    document.getElementById('formFile').addEventListener('change', validacion, false);
}
function validacion(){
    //condicional que valida si hay un archivo cargado.
    if(input.value !== ''){        //en caso de que sea diferente a vacio, re habilita el botón
        boton.removeAttribute('disabled');
    }else{ //en caso que no haya un archivo cargado el boton queda inhabilitado
        boton.setAttribute("disabled", "true");
    }
}
