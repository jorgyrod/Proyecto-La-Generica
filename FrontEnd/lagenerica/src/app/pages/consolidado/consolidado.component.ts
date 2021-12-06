import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css']
})
export class ConsolidadoComponent implements OnInit {

  //Cargamos el listado de Ventas
  urlApiVentas : string = "http://localhost:8110/api/ventas";
  res : any;
  bool : boolean = false;
  contenidoVentas : any;

  totalTienda : number = 0;
  constructor(private objetohttp:HttpClient) { }
  
  //Funcion que controlara los errores
  handleError(error: HttpErrorResponse){
    let errorMessage = 'Error desconocido';
    if(error.error instanceof ErrorEvent){
      //Mostrara errores del lado del cliente
      errorMessage = `Error: ${error.error.message}\n ${error.status}`;
    }else {
      //Mostrara errores del lado del servidor
      errorMessage = `Codigo de Error: ${error.status} \n Mensaje: ${error.message}`;
    }
        //Mostrara un error en una alerta 
    //window.alert(errorMessage)
    return throwError(errorMessage);
  }

  //Cargar Ventas
  cargarVentas(){
      this.res = this.objetohttp.get(this.urlApiVentas).pipe(catchError(this.handleError));
      this.res.subscribe((datos:any[])=>{
          this.contenidoVentas = datos;
          let total = 0;
          for(let ventas of this.contenidoVentas){
            total+= ventas.total_venta;
          }
          //console.log("Contenido: ",this.contenidoVentas);

          let ciudad ={
            nombre : 'Bogota',
            total : total.toFixed(2)
          }
          this.consolidado.push(ciudad);
          //console.log("El consolidado es: ",this.consolidado);
          let totalT = 0;
            for(let ciudad of this.consolidado){
              totalT += ciudad.total;
            }
            this.totalTienda = total;
            //console.log("El total de la tienda es:",this.totalTienda);
        }
      );
      
  }

  consolidado = new Array();

  ngOnInit(): void {
    this.cargarVentas();
  }

}
