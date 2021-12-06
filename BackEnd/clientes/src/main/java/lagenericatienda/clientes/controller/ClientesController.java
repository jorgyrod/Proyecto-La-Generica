package lagenericatienda.clientes.controller;

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

import lagenericatienda.clientes.model.Clientes;
import lagenericatienda.clientes.repository.ClientesRepository;



@CrossOrigin("*")
@RestController
@RequestMapping("/api")


public class ClientesController {

	@Autowired
	  ClientesRepository clientesRepository;

	  @GetMapping("/clientes")
	  public ResponseEntity<List<Clientes>> getAllClientes() {
		  try {
			    List<Clientes> clientes = new ArrayList<Clientes>();
			    clientesRepository.findAll().forEach(clientes::add);

			    if (clientes.isEmpty()) {
			      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			    }

			    return new ResponseEntity<>(clientes, HttpStatus.OK);
			  } catch (Exception e) {
			    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			  }
	  }

	  @GetMapping("/clientes/{cedula}")
	  public ResponseEntity<Clientes> getClientesByCedula(@PathVariable("cedula") int cedula) {
		  Optional<Clientes> cliente = clientesRepository.findById(cedula);

		  if (cliente.isPresent()) {
		    return new ResponseEntity<>(cliente.get(), HttpStatus.OK);
		  } else {
		    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		  }
	  }

	  @PostMapping("/clientes")
	  public ResponseEntity<Clientes> createClientes(@RequestBody Clientes cliente) {
		  try {
			  Clientes _cliente = clientesRepository.save(new Clientes(cliente.getCedula(), cliente.getNombre(), cliente.getDireccion(),cliente.getTelefono(),cliente.getEmail()));
			    return new ResponseEntity<>(_cliente, HttpStatus.CREATED);
			  } catch (Exception e) {
			    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			  }
	  }

	  @PutMapping("/clientes/{cedula}")
	  public ResponseEntity<Clientes> updateClientesByCedula(@PathVariable("cedula") int cedula, @RequestBody Clientes cliente) {
		  Optional<Clientes> clienteFind = clientesRepository.findById(cedula);

		  if (clienteFind.isPresent()) {
			  Clientes _cliente = clienteFind.get();
			  
			  _cliente.setNombre(cliente.getNombre());
			  _cliente.setDireccion(cliente.getDireccion());
			  _cliente.setTelefono(cliente.getTelefono());
			  _cliente.setEmail(cliente.getEmail());
		 
		    
		    return new ResponseEntity<>(clientesRepository.save(_cliente), HttpStatus.OK);
		  } else {
		    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		  }
	  }

	  @DeleteMapping("/clientes/{cedula}")
	  public ResponseEntity<HttpStatus> deleteClienteByCedula(@PathVariable("cedula") int cedula) {
		  try {
			  clientesRepository.deleteById(cedula);
			    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			  } catch (Exception e) {
			    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			  }
	  }

	
}


