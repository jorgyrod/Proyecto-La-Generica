package tiendalagenerica.proveedores.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import tiendalagenerica.proveedores.model.Proveedores;


public interface ProveedorRepository extends MongoRepository<Proveedores, Integer>{

}
