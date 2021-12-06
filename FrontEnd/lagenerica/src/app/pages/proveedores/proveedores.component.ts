import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

    //Guardaremos el resultado arrojado
    resultados:any;

    //Guardaremos el contenido del Proveedor buscado
    contenido:any;
  
    constructor(private objetohttp:HttpClient) { }

  //Url de la API
  urlApi: string = "http://localhost:8100/api/proveedores";
  //Almacenaremos la respuesta 
  res : any;
  //Variable que contendra el codigo de respuesta
  codigoRespuesta!: number;
  //Variables que utilizaremos para los campos a registrar
  nit!:string;
  nombre!:string;
  direccion!:string;
  telefono!:string;
  ciudad!:string;
  limpiarCampos(){
    this.nit = "";
    this.nombre = "";
    this.direccion = "";
    this.ciudad = "";
    this.telefono = "";
  }


  validar(){
    if(!this.nit || !this.nombre || !this.direccion
      || !this.ciudad ||!this.telefono){
        //En dado caso que haya algun campo vacio mostramos una notrificacion
        this.advertencia();
      }
    else{
        this.insertarProveedor();
      }
  }

  //Funcion Registrar o Crear nuevo Proveedor
  insertarProveedor(){
    this.objetohttp.post<any>(this.urlApi,
      {
        //Aqui va el JSON
        "nit": this.nit,
        "direccion": this.direccion,
        "ciudad": this.ciudad,
        "nombre": this.nombre,
        "telefono": this.telefono
      },
      //Permitira mirar cual fue el codigo de respuesta
      {observe:'response'}
    ).subscribe((response: any) => {
      //Aqui guardaremos el codigo de respuesta
      this.codigoRespuesta = response.status;
      //Dependiendo el codigo de respuesta podemos mostrar una notificacion
      if(this.codigoRespuesta === 201){
        this.exito();
      }else{
        this.fallo();
      }
      this.limpiarCampos();
    });
  }

  //Funcion Actualizar Proveedor
  actualizarProveedor(){
    if(!this.nit){
      this.advertencia();
    }
    this.objetohttp.put(this.urlApi + '/' + this.nit,
    {
      //Aqui va el JSON
      "nit": this.nit,
      "direccion": this.direccion,
      "ciudad": this.ciudad,
      "nombre": this.nombre,
      "telefono": this.telefono
    },
    { observe : 'response'}
    ).subscribe((response:any)=>{
      this.codigoRespuesta = response.status;
            //Dependiendo el codigo de respuesta podemos mostrar una notificacion
      if(this.codigoRespuesta === 200){
        this.exitoUpdate();
      }else{
        this.fallo();
      }
        this.limpiarCampos();
    })
  }

  //Funcion Eliminar Proveedor
  eliminarProveedor(){
    this.objetohttp.delete(this.urlApi + '/' + this.nit,
    { observe: 'response'}
    ).subscribe((response:any)=>{
      this.codigoRespuesta = response.status;
      //Dependiendo el codigo de respuesta podemos mostrar una notificacion
      if(this.codigoRespuesta === 204){
        this.confirmacionEliminacion();
      }else{
        this.fallo();
      }
        this.limpiarCampos();
    })
  }

  nitBusqueda!:string;
  nombreBusqueda!:string;
  direccionBusqueda!:string;
  telefonoBusqueda!:string;
  ciudadBusqueda!:string;

  bool : boolean = false;

  consultar(){
    if(!this.nit){
      this.advertencia();
    }else{
      this.buscarProveedor();
    }
  }

  //Funcion consulta de Proveedor
  buscarProveedor(){
    try{
      
      this.res = this.objetohttp.get(this.urlApi + "/" + this.nit);
      this.bool = true;
      this.res.subscribe((datos:any[]) =>{
        this.contenido = datos;
        console.log(this.contenido);
        this.nitBusqueda = this.contenido.nit;
        this.nombreBusqueda = this.contenido.nombre;
        this.direccionBusqueda = this.contenido.direccion;
        this.telefonoBusqueda = this.contenido.telefono;
        this.ciudadBusqueda = this.contenido.ciudad;
      });
      Swal.fire('Deslize abajo del formulario')
    }catch (e) {
      console.error("BK DOWN");
      this.contenido = []
      this.fallo();
    } 
  }

  //Funcion ocultar Proveedor
  ocultar(){
    this.bool = false;
  }

//------------------ NOTIFICIACIONES -------------------
  
  //Notificacion de exito
  exito(){
    Swal.fire({
      icon: 'success',
      title: 'El Proveedor ha sido creado satisfactoriamente',
      showConfirmButton: false,
      timer: 2000
    })
  }

  //Notificacion de exito Update
  exitoUpdate(){
      Swal.fire({
        icon: 'success',
        title: 'El Proveedor ha sido actualizado satisfactoriamente',
        showConfirmButton: false,
        timer: 2000
      })
  }


  //Noificacion de Eliminacion
  eliminacion(){
    if(!this.nit) this.advertencia();
    else{
      Swal.fire({
        title: 'Esta seguro de borrar el Proveedor?',
        text: "Si desea puede cancelarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#118e00',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarProveedor();
        }
      })
    }
  }

  //Notificacion de Fallo
  fallo(){
    Swal.fire({
      icon: 'success',
      title: 'Error, no se pudo hacer la solicitud!',
      showConfirmButton: false,
      timer: 2000
    })
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

  //Notificacion de confirmacion de eliminacion
  confirmacionEliminacion(){
    Swal.fire({
      title : 'Eliminado!',
      text : 'El Proveedor ha sido eliminado.',
      icon : 'success',
      confirmButtonColor: '#118e00',
      confirmButtonText: 'OK'
    }
    )
  }

  ngOnInit(): void {
  }

}
