window.addEventListener('DOMContentLoaded', inicio, false);

function inicio(){
    document.getElementById('formFile').addEventListener('change', subirArchivo, false);
}
function subirArchivo(){
    let ref = document.getElementById('formFile'); //referencia al input file
    let btn = document.getElementById('btnSubir'); //referencia al boton
    //condicional que valida si hay un archivo cargado.
    if(ref.value !== ''){        //en caso de que sea diferente a vacio, re habilita el botón
        btn.removeAttribute('disabled');
    }else{ //en caso que no haya un archivo cargado el boton queda inhabilitado
        btn.setAttribute("disabled", "true");
    }
}