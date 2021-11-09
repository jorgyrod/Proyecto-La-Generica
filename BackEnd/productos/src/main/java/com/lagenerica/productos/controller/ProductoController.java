package com.lagenerica.productos.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.lagenerica.productos.model.CSVProducto;
import com.lagenerica.productos.model.Productos;
import com.lagenerica.productos.repository.IProductosRepository;

//Para que solo se pueda acceder mediante este puerto
@CrossOrigin("*")
//Controlador API REST
@RestController
//Mapeo de direccion
@RequestMapping("/api")
public class ProductoController {
	
	@Autowired
	IProductosRepository productoRepository;
	
	@PostMapping("/producto")
	public ResponseEntity<List<Productos>>subirArchivo(@RequestParam("file") MultipartFile file){
		System.out.println("Entramos a la carga de archivos");
		try {
			List<Productos> listaProductos = CSVProducto.csvProductos(file.getInputStream());
			productoRepository.saveAll(listaProductos);
			
			//Le pasamos la lista y el codigo de estatus http que fue creado
			return new ResponseEntity<>(listaProductos, HttpStatus.CREATED);
		}catch(Exception e) {
			//En caso de error, devuelve una lista nula y el error interno
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/producto")
	public ResponseEntity<List<Productos>> listar(){
		try {
			//Creammos una nueva lista
			List<Productos> listaProductos = new ArrayList<>();
			
			//Por cada producto encontrado en productosBD se lo añadimos a la listaProductos
			//Mediante un ciclo forEach
			productoRepository.findAll().forEach(listaProductos::add);
			
			//Si la lista esta vacia retornamos un codigo de estado http
			if(listaProductos.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			//Si todo salio bien y no esta vacia retornamos la lista de productos y el codigo de estado OK
			return new ResponseEntity<>(listaProductos, HttpStatus.OK);
			
		}catch(Exception e) {
			//En caso de error, devuelve una lista nula y el error interno
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/producto/{id}")
	public ResponseEntity<Productos> productoById(@PathVariable int id){
		Optional<Productos> producto = productoRepository.findById(id);
		
		if(producto.isPresent()) {
			return new ResponseEntity<>(producto.get(),HttpStatus.OK);
		}else {
			//Retornamos un codigo de estado que no se encontro
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
