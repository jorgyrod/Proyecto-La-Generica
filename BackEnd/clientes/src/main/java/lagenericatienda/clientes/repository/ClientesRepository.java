package lagenericatienda.clientes.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import lagenericatienda.clientes.model.Clientes;


public interface ClientesRepository extends MongoRepository<Clientes, Integer>{

}
