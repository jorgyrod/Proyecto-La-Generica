package lagenericatienda.ventas.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import lagenericatienda.ventas.model.Ventas;

public interface IVentasRepository extends MongoRepository<Ventas,Integer>{

}
