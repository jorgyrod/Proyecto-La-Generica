

exports.cargarFormProducto = function(req,res){
    res.render('producto');
};

exports.subirArchivoCSV = function(req,res){
    console.log("Entramos al subirArchivoCSV");
    const input = req.body.formFile;
    console.log("Input: ", input);
        //var files = input.files;
        subirArchivo(input);
};

//Posibilidad de esta funcion pasarla a la carpeta service
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

