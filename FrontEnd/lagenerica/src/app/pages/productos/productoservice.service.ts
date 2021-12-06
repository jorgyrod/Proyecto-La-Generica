import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoserviceService {

  apiURL:string="http://localhost:8080/api/producto";

  //Constructor con http
  constructor(private httpObject:HttpClient) { }

  //Como el csv nos trae muchos productos sera guardarlos en un array
  resultados = Array();

  codigoRespuesta : any;
  //Funcion encargada de la revision del archivo y separacion de los daatos

  //Funcion asincronica que se ejecutara hasta que algo ocurra o promises
  upload(file:any):Promise<any[]>{
    //Resolve si la promesa se cumplio, reject si no
    return new Promise<any[]>((resolve,reject)=>{
      //Objeto lector de archivos abre el archivo
      var reader = new FileReader();
      //Cuando la carga del archivo haya terminado y sido exitoso
      reader.onloadend = (e) =>{
        //La lineas va a ser igual al contenido leido
        let lineas = reader.result as string;
        //Ahora separaremos el contenido cuando haya un salto de linea
        //y los guardara en una lista
        let separados = lineas.split("\n");
        //Ya teniendo las lineas separadas enviaremos cada linea

        for(let lineactual of separados){
          //Tomaremos la linea actual y reemplazamos si la separacion 
          //es por punto ";" y coma lo reemplazamos por comas "," 
          lineactual.replace(";",",");
          //Separamos las columnas separadas por ","
          let columnas = lineactual.split(",");
          //Ahora conformaremos el objeto JSON y enviaremos la peticion
          this.httpObject.post(this.apiURL,
            {
              "idproducto" : columnas[0],
              "nombreproducto" : columnas[1],
              "nitproveedor" : columnas[2],
              "preciocompra" : columnas[3],
              "ivacompra" : columnas[4],
              "precioventa" : columnas[5]
            },
            { observe : 'response' }).subscribe(
              //Como parametro viene response
              (response:any)=>{
                this.codigoRespuesta = response.status;
                //Obtenemos el codigo de respuesta
                this.resultados.push(response.body);
                      //Dependiendo el codigo de respuesta podemos mostrar una notificacion
                if(this.codigoRespuesta === 201){
                  this.exito();
                }else{
                  this.fallo();
                }
              }
            );
        }
        //Se completo la promesa y se devuelve la lista
        resolve(this.resultados);
      }
      //Le indicamos que es un archivo de texto plano
      reader.readAsText(file);
    });
  };

    //------------------ NOTIFICIACIONES -------------------
  
  //Notificacion de exito
  exito(){
    Swal.fire({
      icon: 'success',
      title: 'El Archivo ha sido subido exitosamente',
      showConfirmButton: false,
      timer: 2000
    })
  }

  //Notificacion de Fallo
  fallo(){
    Swal.fire({
      icon: 'success',
      title: 'Error, no se pudo subir el archivo!',
      showConfirmButton: false,
      timer: 2000
    })
  }


}
