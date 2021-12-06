import { Component, OnInit } from '@angular/core';
import { ProductoserviceService } from './productoservice.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  //Creamos una instancia del servicio (Donde leemos el csv)
  constructor( private productoService : ProductoserviceService) { }

  //Variable donde guardaremos los codigos de respuesta 
  resultados:any;

  //Variable donde almacenaremos el archivo que vamos a subir
  file!:File;

  //Funcion que se ejecutara donde guardaremos el archivo temporalmente cuando cambie el archivo
  onChange(event:any){
    //Almacenaremos el archivo
    this.file=event.target.files[0];
  }
  bool : boolean = false;

  //Funcion asincrona que verificara si el archivo quedo subida y dara respuesta
  //Si se cumplio la promesa
  async onUpload(){
    this.bool = true;
    //Esperamos a que de respuesta si la promesa se cumplio
    this.resultados = await this.productoService.upload(this.file);
    //Cuando se cumplio la promesa imprimimos el resultado
    console.log(this.resultados);
  }


  ngOnInit(): void {
  }

}
