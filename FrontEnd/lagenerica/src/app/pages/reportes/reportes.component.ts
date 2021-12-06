import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  //Mostramos la lista de Cliente
  clientes(){
    this.bool = false;
    this.boolClientes = true;
  }

  //Mostramos la lista de ventas por Cliente
  listdoVentaCliente(){
    this.lista = [];
    this.boolClientes = false;
    this.bool = true;
    //Llamamos la funcion para mostrar los datos
    this.listaClientesVenta();
  }

  constructor(private objetohttp:HttpClient) { }

  //------------------------------------------------------
  //Cargamos los Clientes
  urlApiClientes : string = "http://localhost:8090/api/clientes";
  res2 : any;
  contenido : any;
  listadoClientes = new Array();
  boolClientes : boolean = false;

  cargarClientes(){
      this.res2 = this.objetohttp.get(this.urlApiClientes);
      this.res2.subscribe((datos:any[])=>{
        this.contenido = datos;
        
        for(let cliente of this.contenido){
          this.listadoClientes.push(cliente);
        }
      });
      //console.log(this.listadoClientes);
  }

  //------------------------------------------------------

  //Cargamos el listado de Ventas
  urlApiVentas : string = "http://localhost:7000/api/ventas";
  res : any;
  bool : boolean = false;
  contenidoVentas : any;
  listadoVentas = new Array();
    
  //Cargar Ventas
  cargarVentas(){
    this.res = this.objetohttp.get(this.urlApiVentas);
    this.res.subscribe((datos:any[])=>{
      this.contenidoVentas = datos;
        //Agregamos cada venta que encuentre a nuestro listado de ventas
        for(let venta of this.contenidoVentas){
          this.listadoVentas.push(venta);
        }
      }
    );
    //console.log(this.listadoVentas);
  }

  lista = new Array();
  //------------------------------------------------------------------------
  //Funcion encargada de añadir a la lista el cliente con su total de ventas
  listaClientesVenta(){

    for(let cliente of this.listadoClientes){
      let ventaPorCliente ={
        cedula : cliente.cedula,
        nombre : cliente.nombre,

        totalVenta : this.totalCliente(cliente.cedula).toFixed(2)
      };
      this.lista.push(ventaPorCliente);
    }
    //console.log("Estamos en la funcion listarClienvesVenta")
    //console.log(this.lista);
  }

  //Calculamos el total de ventas del cliente
  totalCliente(cedula : number){
    //console.log("Estamos en la funcion totalCliente del Cliente:",cedula)

    var total = 0;
    for(let venta of this.listadoVentas){
      if(venta.cedula_cliente === cedula){
        total += venta.total_venta;
      }else{
        continue;
      }
    }
    //console.log("El total del cliente es de: ", total);
    return total;
  }

  //-------------------------------------------------------------------
  //Esta funcion cargara los datos antes de iniciar la pagina
  cargarDatos(){
    this.cargarClientes();
    //Primero se Ejecuta
    this.cargarVentas();
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

}
