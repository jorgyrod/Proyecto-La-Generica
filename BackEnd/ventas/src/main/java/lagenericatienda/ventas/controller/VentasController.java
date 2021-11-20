package lagenericatienda.ventas.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lagenericatienda.ventas.model.Ventas;
import lagenericatienda.ventas.repository.IVentasRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")

public class VentasController {
	@Autowired
	IVentasRepository ventasRepository;
	
	@GetMapping("/ventas")
	public ResponseEntity<List<Ventas>> getAllVentas(){
		try {
			List<Ventas> ventas = new ArrayList<Ventas>();
			ventasRepository.findAll().forEach(ventas::add);
			
			if(ventas.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(ventas, HttpStatus.OK);
		}catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	}
	
	@PostMapping("/ventas")
	public ResponseEntity<Ventas> crearVenta(@RequestBody Ventas venta){
		try {
			Ventas _venta = ventasRepository.save(new Ventas(venta.getCodigo_venta(), venta.getCedula_cliente(),
															venta.getDetalleVenta(), venta.getIva_venta(),
															venta.getValor_venta(), venta.getTotal_venta()));
			return new ResponseEntity<>(_venta, HttpStatus.CREATED);
		}catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	}
	
	@GetMapping("/ventas/IdCuenta")
	public ResponseEntity<Integer> obtenerId(){
		try {
			int id = (int) ventasRepository.count();
			return new ResponseEntity<>(id, HttpStatus.OK);
		}catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	}
	
}
