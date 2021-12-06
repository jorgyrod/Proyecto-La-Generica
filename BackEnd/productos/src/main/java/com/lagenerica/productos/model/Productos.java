package com.lagenerica.productos.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//Coleccion Productos de BD no relacional
@Document(collection = "productos")

public class Productos {

	
	  @Id
	  private int idproducto;
	  private String nombreproducto;
	  private int 	 nitproveedor;
	  private double   preciocompra;
	  private double   ivacompra;
	  private double   precioventa;
	  

	  
	public Productos(int idproducto, String nombreproducto, int nitproveedor, double preciocompra, double ivacompra,
			double precioventa) {
		this.idproducto = idproducto;
		this.nombreproducto = nombreproducto;
		this.nitproveedor = nitproveedor;
		this.preciocompra = preciocompra;
		this.ivacompra = ivacompra;
		this.precioventa = precioventa;
	}

	public Productos() {
		
	}

	public int getIdproducto() {
		return idproducto;
	}

	public void setIdproducto(int idproducto) {
		this.idproducto = idproducto;
	}

	public String getNombreproducto() {
		return nombreproducto;
	}

	public void setNombreproducto(String nombreproducto) {
		this.nombreproducto = nombreproducto;
	}

	public int getNitproveedor() {
		return nitproveedor;
	}

	public void setNitproveedor(int nitproveedor) {
		this.nitproveedor = nitproveedor;
	}

	public double getPreciocompra() {
		return preciocompra;
	}

	public void setPreciocompra(double preciocompra) {
		this.preciocompra = preciocompra;
	}

	public double getIvacompra() {
		return ivacompra;
	}

	public void setIvacompra(double ivacompra) {
		this.ivacompra = ivacompra;
	}

	public double getPrecioventa() {
		return precioventa;
	}

	public void setPrecioventa(double precioventa) {
		this.precioventa = precioventa;
	}

	@Override
	public String toString() {
		return "Productos [idproducto=" + idproducto + ", nombreproducto=" + nombreproducto + ", nitproveedor="
				+ nitproveedor + ", preciocompra=" + preciocompra + ", ivacompra=" + ivacompra + ", precioventa="
				+ precioventa + "]";
	}
	
	

}
