package lagenericatienda.ventas.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Ventas")
public class Ventas {

	@Id
	private int codigo_venta;
	private int cedula_cliente;
	private List<DetalleVenta> detalleVenta;
	private float iva_venta;
	private float valor_venta;
	private float total_venta;
	
	public Ventas() {
	}

	public Ventas(int codigo_venta, int cedula_cliente, List<DetalleVenta> detalleVenta, float iva_venta,
			float valor_venta, float total_venta) {
		this.codigo_venta = codigo_venta;
		this.cedula_cliente = cedula_cliente;
		this.detalleVenta = detalleVenta;
		this.iva_venta = iva_venta;
		this.valor_venta = valor_venta;
		this.total_venta = total_venta;
	}

	public int getCodigo_venta() {
		return codigo_venta;
	}

	public void setCodigo_venta(int codigo_venta) {
		this.codigo_venta = codigo_venta;
	}

	public int getCedula_cliente() {
		return cedula_cliente;
	}

	public void setCedula_cliente(int cedula_cliente) {
		this.cedula_cliente = cedula_cliente;
	}

	public List<DetalleVenta> getDetalleVenta() {
		return detalleVenta;
	}

	public void setDetalleVenta(List<DetalleVenta> detalleVenta) {
		this.detalleVenta = detalleVenta;
	}

	public float getIva_venta() {
		return iva_venta;
	}

	public void setIva_venta(float iva_venta) {
		this.iva_venta = iva_venta;
	}

	public float getValor_venta() {
		return valor_venta;
	}

	public void setValor_venta(float valor_venta) {
		this.valor_venta = valor_venta;
	}

	public float getTotal_venta() {
		return total_venta;
	}

	public void setTotal_venta(float total_venta) {
		this.total_venta = total_venta;
	}

	@Override
	public String toString() {
		return "Ventas [codigo_venta=" + codigo_venta + ", cedula_cliente=" + cedula_cliente + ", detalleVenta="
				+ detalleVenta + ", iva_venta=" + iva_venta + ", valor_venta=" + valor_venta + ", total_venta="
				+ total_venta + "]";
	}
	
	
	
	
}
