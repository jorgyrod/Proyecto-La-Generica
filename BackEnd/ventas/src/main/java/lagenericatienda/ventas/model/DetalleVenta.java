package lagenericatienda.ventas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DetalleVentas")
public class DetalleVenta {
	
	@Id
	private String detalleV;
	private int cantidad;
	private int codigo_producto;
	private float valor_Total;
	private float valor_Venta;
	private float valor_Iva;
	
	public DetalleVenta() {
		
	}

	public DetalleVenta(int cantidad, int codigo_producto, float valor_Total, float valor_Venta, float valor_Iva) {
		this.cantidad = cantidad;
		this.codigo_producto = codigo_producto;
		this.valor_Total = valor_Total;
		this.valor_Venta = valor_Venta;
		this.valor_Iva = valor_Iva;
	}

	
	


	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public int getCodigo_producto() {
		return codigo_producto;
	}

	public void setCodigo_producto(int codigo_producto) {
		this.codigo_producto = codigo_producto;
	}

	public float getValor_Total() {
		return valor_Total;
	}

	public void setValor_Total(float valor_Total) {
		this.valor_Total = valor_Total;
	}

	public float getValor_Venta() {
		return valor_Venta;
	}

	public void setValor_Venta(float valor_Venta) {
		this.valor_Venta = valor_Venta;
	}

	public float getValor_Iva() {
		return valor_Iva;
	}

	public void setValor_Iva(float valor_Iva) {
		this.valor_Iva = valor_Iva;
	}

	@Override
	public String toString() {
		return "DetalleVenta [detalleV=" + detalleV + ", cantidad=" + cantidad + ", codigo_producto=" + codigo_producto
				+ ", valor_Total=" + valor_Total + ", valor_Venta=" + valor_Venta + ", valor_Iva=" + valor_Iva + "]";
	}
	
	
	
	
	
	
	
}
