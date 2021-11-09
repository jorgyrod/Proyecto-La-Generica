const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, '..', 'FrontEnd/public');

app.get("/subirProducto",(request,response) =>{
    //response.sendFile(__dirname + "/public/login.html");
    response.sendFile(path.join(publicPath, 'producto.html'));
})

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

function subirArchivo(file){
	const url = "http://localhost:8080";
	var formData = new FormData();
	formData.append("file",file);
	
	//Envio
	var http = new XMLHttpRequest();
	http.open("POST", url+"/api/producto");
	
	http.onload = function() {
        console.log(http.responseText);
        var response = JSON.parse(http.responseText);
        if(http.status == 200 || http.status == 201) {
            console.log("Archivo subido correctamente!")
			/* parrafo.innerText="Archivo subido correctamente!"
			parrafo.classList.add("parrafo-green"); */
        } else {
            console.log("Error al subir el archivo! ", http.status);
            /* parrafo.innerText="Error al subir el archivo!"
			parrafo.classList.remove("parrafo-green");
			parrafo.classList.add("parrafo-red"); */
        }
    } 
	http.send(formData);
}

form.addEventListener('submit', function(event){
    var files = input.files;
    subirArchivo(files[0]);
    event.preventDefault();
}, true);