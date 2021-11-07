package com.lagenerica.productos.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.lagenerica.productos.model.Productos;

public interface IProductosRepository extends MongoRepository<Productos,Integer>{

}
