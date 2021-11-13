package tiendalagenerica.proveedores.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "proveedores")

public class Proveedores {

	@Id
	private int nit;
	private String nombre;
	private String direccion;
	private int telefono;
	private String ciudad;
	
	public Proveedores() {
		
	}

	public Proveedores(int nit, String nombre, String direccion, int telefono, String ciudad) {
		this.nit = nit;
		this.nombre = nombre;
		this.direccion = direccion;
		this.telefono = telefono;
		this.ciudad = ciudad;
	}

	public int getNit() {
		return nit;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public int getTelefono() {
		return telefono;
	}

	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	@Override
	public String toString() {
		return "Proveedores [nit=" + nit + ", nombre=" + nombre + ", direccion=" + direccion + ", telefono=" + telefono
				+ ", ciudad=" + ciudad + "]";
	}
	
	
	
	
	

	
   	  
}
