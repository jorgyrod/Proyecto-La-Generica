import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  //Guardaremos el resultado arrojado
  resultados:any;

  //Guardaremos el contenido del cliente buscado
  contenido:any;

  constructor(private objetohttp:HttpClient) { }

  //Url de la API
  urlApi: string = "http://localhost:8090/api/clientes";
  //Almacenaremos la respuesta 
  res : any;
  //Variable que contendra el codigo de respuesta
  codigoRespuesta!: number;
  //Variables que utilizaremos para los campos a registrar
  cedula!:string;
  nombre!:string;
  direccion!:string;
  telefono!:string;
  email!:string;
  limpiarCampos(){
    this.cedula = "";
    this.nombre = "";
    this.direccion = "";
    this.email = "";
    this.telefono = "";
  }

  validar(){
    if(!this.cedula || !this.nombre || !this.direccion
      || !this.email ||!this.telefono){
        //En dado caso que haya algun campo vacio mostramos una notrificacion
        this.advertencia();
      }
    else{
        this.insertarCliente();
      }
  }

  //Funcion Registrar o Crear nuevo Cliente
  insertarCliente(){
    this.objetohttp.post<any>(this.urlApi,
      {
        //Aqui va el JSON
        "cedula": this.cedula,
        "direccion": this.direccion,
        "email": this.email,
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

  //Funcion Actualizar Cliente
  actualizarCliente(){
    this.objetohttp.put(this.urlApi + '/' + this.cedula,
    {
      //Aqui va el JSON
      "cedula": this.cedula,
      "direccion": this.direccion,
      "email": this.email,
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

  //Funcion Eliminar Cliente
  eliminarCliente(){
    this.objetohttp.delete(this.urlApi + '/' + this.cedula,
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

  cedulaBusqueda!:string;
  nombreBusqueda!:string;
  direccionBusqueda!:string;
  telefonoBusqueda!:string;
  emailBusqueda!:string;

  bool : boolean = false;

  consultar(){
    if(!this.cedula){
      this.advertencia();
    }else{
      this.buscarCliente();
    }
  }
  //Funcion consulta de cliente
  buscarCliente(){
    try{
      
      this.res = this.objetohttp.get(this.urlApi + "/" + this.cedula);
      this.bool = true;
      this.res.subscribe((datos:any[]) =>{
        this.contenido = datos;
        console.log(this.contenido);
        this.cedulaBusqueda = this.contenido.cedula;
        this.nombreBusqueda = this.contenido.nombre;
        this.direccionBusqueda = this.contenido.direccion;
        this.telefonoBusqueda = this.contenido.telefono;
        this.emailBusqueda = this.contenido.email;
      });
      Swal.fire('Deslize abajo del formulario')
    }catch (e) {
      console.error("BK DOWN");
      this.contenido = []
      this.fallo();
    } 
  }

  //Funcion ocultar Cliente
  ocultar(){
    this.bool = false;
  }
  //------------------ NOTIFICIACIONES -------------------
  
  //Notificacion de exito
  exito(){
    Swal.fire({
      icon: 'success',
      title: 'El Cliente ha sido creado satisfactoriamente',
      showConfirmButton: false,
      timer: 2000
    })
  }

  //Notificacion de exito Update
  exitoUpdate(){
      Swal.fire({
        icon: 'success',
        title: 'El Cliente ha sido actualizado satisfactoriamente',
        showConfirmButton: false,
        timer: 2000
      })
  }


  //Noificacion de Eliminacion
  eliminacion(){
    if(!this.cedula) this.advertencia();
    else{
      Swal.fire({
        title: 'Esta seguro de borrar el cliente?',
        text: "Si desea puede cancelarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#118e00',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarCliente();
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
      text : 'El Cliente ha sido eliminado.',
      icon : 'success',
      confirmButtonColor: '#118e00',
      confirmButtonText: 'OK'
    }
    )
  }

  ngOnInit(): void {
  }

}
