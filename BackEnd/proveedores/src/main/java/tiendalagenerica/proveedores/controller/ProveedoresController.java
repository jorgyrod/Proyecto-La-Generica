package tiendalagenerica.proveedores.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tiendalagenerica.proveedores.model.Proveedores;
import tiendalagenerica.proveedores.repository.ProveedorRepository;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")

public class ProveedoresController {
	@Autowired
	  ProveedorRepository proveedorRepository;

	  @GetMapping("/proveedores")
	  public ResponseEntity<List<Proveedores>> getAllProveedores() {
		  try {
			    List<Proveedores> proveedores = new ArrayList<Proveedores>();
			    proveedorRepository.findAll().forEach(proveedores::add);

			    if (proveedores.isEmpty()) {
			      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			    }

			    return new ResponseEntity<>(proveedores, HttpStatus.OK);
			  } catch (Exception e) {
			    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			  }
	  }

	  @GetMapping("/proveedores/{nit}")
	  public ResponseEntity<Proveedores> getProveedoresByNit(@PathVariable("nit") int nit) {
		  Optional<Proveedores> proveedor = proveedorRepository.findById(nit);

		  if (proveedor.isPresent()) {
		    return new ResponseEntity<>(proveedor.get(), HttpStatus.OK);
		  } else {
		    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		  }
	  }

	  @PostMapping("/proveedores")
	  public ResponseEntity<Proveedores> createProveedores(@RequestBody Proveedores proveedor) {
		  try {
			  Proveedores _proveedor = proveedorRepository.save(new Proveedores(proveedor.getNit(),proveedor.getNombre(),proveedor.getDireccion(),proveedor.getTelefono(),proveedor.getCiudad()));
			    return new ResponseEntity<>(_proveedor, HttpStatus.CREATED);
			  } catch (Exception e) {
			    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			  }
	  }

	  @PutMapping("/proveedores/{nit}")
	  public ResponseEntity<Proveedores> updateClientesByCedula(@PathVariable("nit") int nit, @RequestBody Proveedores proveedor) {
		  Optional<Proveedores> proveedorFind = proveedorRepository.findById(nit);

		  if (proveedorFind.isPresent()) {
			  Proveedores _proveedor = proveedorFind.get();
			  
			  _proveedor.setNombre(proveedor.getNombre());
			  _proveedor.setDireccion(proveedor.getDireccion());
			  _proveedor.setTelefono(proveedor.getTelefono());
			  _proveedor.setCiudad(proveedor.getCiudad());

		    
		    return new ResponseEntity<>(proveedorRepository.save(_proveedor), HttpStatus.OK);
		  } else {
		    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		  }
	  }

	  @DeleteMapping("/proveedores/{nit}")
	  public ResponseEntity<HttpStatus> deleteClienteByNit(@PathVariable("nit") int nit) {
		  try {
			  proveedorRepository.deleteById(nit);
			    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			  } catch (Exception e) {
			    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			  }
	  }


	
}




