import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Producto } from './producto';
import { DetalleProducto } from './detalleVenta';
import { Venta } from './ventas';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  cantidad : number = 3;

  //Url de la API
  urlApi: string = "http://localhost:8110/api/ventas";

  //Respuesta de la Id Venta
  res : any;
  //Contenido de la Respuesta de la Api Ventas
  consecutivo : any;

  constructor(private objetohttp:HttpClient) { }

  //Funcion encargada de limpiar los campos
  limpiarCampos(){
    this.cedulaCliente = "";
    this.nombreCliente = "";
    this.codigoProducto1 = "";
    this.codigoProducto2 = "";
    this.codigoProducto3 = "";
    this.cantidadProducto1 = 1;
    this.cantidadProducto2 = 1;
    this.cantidadProducto3 = 1;
    this.totalProducto1 = 0;
    this.totalProducto2 = 0;
    this.totalProducto3 = 0;
    this.subtotal = 0;
    this.ivaventa = 0;
    this.totalventa = 0;
  }

  //Funcion Carga de Numero Consecutivo

  getConsecutivo(){
    this.res = this.objetohttp.get(this.urlApi + "/IdCuenta");
    this.res.subscribe((id:any)=>{
      this.consecutivo = id + 1;
      console.log(this.consecutivo);
    })
  }

  //-------------------------------------------
  //Variables para guardar el cliente
  cedulaCliente!:string;
  nombreCliente!:string;

  urlApiCliente : string = "http://localhost:8090/api/clientes";

  resCliente : any;
  contenidoCliente : any;
  //--------------------------------------------
  //Funcion Obtener Cliente

  getCliente(){
    try{
      this.resCliente = this.objetohttp.get(this.urlApiCliente + "/" + this.cedulaCliente);
      this.resCliente.subscribe((datos:any[])=>{
        this.contenidoCliente = datos;
        this.nombreCliente = this.contenidoCliente.nombre;
      });
    }catch(e){
      this.contenidoCliente = [];
      //Aqui ira la alera fallida
    }
  }

  //-------------------------------------------
  //Variables para guardar el producto

  //Producto, url de la Api, respuesta y contenido
  urlApiProductos : string = "http://localhost:8080/api/producto";
  resProducto:any;
  contenidoProducto:any;

  //Codigos de Productos
  codigoProducto1!:   string;
  codigoProducto2!: string;
  codigoProducto3!: string;

  //Lista de producto
  listaDetalleProductos = new Array<DetalleProducto>();
  
   //--------------------------------------------

  producto1 : Producto={
    idProducto : '',
    nombre : '',
    preciocompra : 0,
    ivacompra : 0,
    precioventa : 0,
  }

  producto2 : Producto={
    idProducto : '',
    nombre : '',
    preciocompra : 0,
    ivacompra : 0,
    precioventa : 0,
  }

  producto3 : Producto={
    idProducto : '',
    nombre : '',
    preciocompra : 0,
    ivacompra : 0,
    precioventa : 0,
  }

  //Buscara el producto 1
  buscarProducto1(){
    this.getProducto(this.codigoProducto1,this.producto1);
  }
  //Buscara el producto 2
  buscarProducto2(){
    this.getProducto(this.codigoProducto2,this.producto2);
  }
  //Buscara el producto 3
  buscarProducto3(){
    this.getProducto(this.codigoProducto3,this.producto3);
  }

  //Aqui asignamos los valores al producto enviado
  asignarProducto(producto : Producto, data:any){
    producto.idProducto = data.idproducto;
    producto.nombre = data.nombreproducto;
    producto.preciocompra = data.preciocompra;
    producto.precioventa = data.precioventa;
    producto.ivacompra = data.ivacompra;
    console.log(producto);
  }

  getProducto(idProducto:string, producto : Producto){
    try{
        this.resProducto = this.objetohttp.get(this.urlApiProductos + "/" + idProducto);
        this.resProducto.subscribe((datos:any[])=>{
        this.contenidoProducto = datos;
        this.asignarProducto(producto,this.contenidoProducto);
        //console.log(this.producto1);
      });
    }catch(e){
      this.contenidoCliente = [];
      //Aqui ira la alera fallida
      console.log("Algo Paso");
    }
  }



  //Calcularemos los valores y se agregara el detalle venta

  //Producto 1
  cantidadProducto1 : number = 1;
  totalProducto1 : number = 0;

  detalleProducto1 : DetalleProducto={
    cantidad : 0,
    codigo_producto : "0",
    valor_Iva : 0,
    valor_Venta : 0,
    valor_Total : 0
  }

  //Producto 2
  cantidadProducto2 : number = 1;
  totalProducto2 : number = 0;

  detalleProducto2 : DetalleProducto={
    cantidad : 0,
    codigo_producto : "0",
    valor_Iva : 0,
    valor_Venta : 0,
    valor_Total : 0
  }

    //Producto 3
  cantidadProducto3 : number = 1;
  totalProducto3 : number = 0;

  detalleProducto3 : DetalleProducto={
    cantidad : 0,
    codigo_producto : "0",
    valor_Iva : 0,
    valor_Venta : 0,
    valor_Total : 0
  }

  //Funcion encargada de calcular
  asignarDetalle(producto : Producto, detalle : DetalleProducto, cantidad : number){
    let subtotal = cantidad * producto.precioventa;
    let total = (subtotal * producto.ivacompra) / 100;

    detalle.cantidad = cantidad;
    detalle.codigo_producto = producto.idProducto;
    detalle.valor_Iva = producto.ivacompra;
    detalle.valor_Venta = subtotal;
    detalle.valor_Total = total;
    //Añadimos a la lista de detalles
    this.listaDetalleProductos.push(detalle);
    console.log(this.listaDetalleProductos);
    //console.log(producto, "El detalle es: ", detalle);
  }

  //Para el producto 1
  precioProducto1(){
    this.asignarDetalle(this.producto1,this.detalleProducto1, this.cantidadProducto1);
    this.calcularTotales();
  }

  //Para el producto 2
  precioProducto2(){
      this.asignarDetalle(this.producto2,this.detalleProducto2,this.cantidadProducto2);
      this.calcularTotales();
  }

  //Para el producto 3
  precioProducto3(){
      this.asignarDetalle(this.producto3,this.detalleProducto3,this.cantidadProducto3);
      this.calcularTotales();
  }

  //------------------------------------------------------
  //Variables de Venta
  codigoRespuesta !: number;
  //Confirmacion de Venta
  subtotal : number = 0;
  ivaventa : number = 0;
  totalventa : number = 0;
  

  calcularTotales(){
    this.subtotal = this.detalleProducto1.valor_Venta + this.detalleProducto2.valor_Venta + this.detalleProducto3.valor_Venta;
    this.ivaventa  = (this.subtotal * 19) / 100;
    this.totalventa = this.subtotal + this.ivaventa;
  }

  venta : Venta = {
    cedulaCliente : 0,
    codigoVenta: 0,
    detalleVenta : [],
    iva : 0,
    subtotal : 0,
    total : 0
  }

  crearVenta(){
    this.objetohttp.post<any>(this.urlApi,
      {
        "cedula_cliente" : this.cedulaCliente,
        "codigo_venta"   : this.consecutivo,
        "detalleVenta": this.listaDetalleProductos,
        "iva_venta" : this.ivaventa,
        "total_venta" : this.totalventa,
        "valor_venta" : this.subtotal
      },
      {observe:'response'}
      ).subscribe((response:any)=>{
        this.codigoRespuesta = response.status;

        if(this.codigoRespuesta === 201){
            this.creada();
            this.limpiarCampos();
        }else{
          this.fallo();
        }
      })
  }

  //Se encargara antes de cargar la pagina llamar la funcion
  ngOnInit(): void {
    this.getConsecutivo();
  }

  //NOTIFICACIONES-----------------------

   //Notificacion de Fallo
  fallo(){
    Swal.fire({
      icon: 'success',
      title: 'Error, no se pudo hacer la solicitud!',
      showConfirmButton: false,
      timer: 2000
    })
  }

  //Noificacion de Confirmacion
  confirmacion(){
      if(!this.cedulaCliente)this.advertencia();
      else{
        if(!this.codigoProducto1 && !this.codigoProducto2 && !this.codigoProducto3)
          this.advertenciaProducto();
        else{
          Swal.fire({
            title: 'Esta seguro de añadir la venta?',
            text: "Si desea puede cancelarla!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#118e00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.crearVenta();
            }
          })
        }
      }
    }

    //Notificacion de confirmacion de eliminacion
    creada(){
      Swal.fire({
        title : 'Creada!',
        text : 'La venta ha sido añadida.',
        icon : 'success',
        confirmButtonColor: '#118e00',
        confirmButtonText: 'OK'
      }
      )
    }

    //Notificacion de advertencia
    advertencia(){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Debe llenar todos los campos',
        showConfirmButton: false,
        timer: 2000
      })
    }

    //Notificacion de advertencia
    advertenciaProducto(){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Debe agregar por lo menos 1 producto',
        showConfirmButton: false,
        timer: 2000
      })
    }


}
