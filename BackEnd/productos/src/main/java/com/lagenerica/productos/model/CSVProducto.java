package com.lagenerica.productos.model;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;


public class CSVProducto {
	
	//Esto seran los titulos o cabeceras que se tienen en el arhcivo csv que corresponden
	//a cada columna
	static String[] HEADERs = { "Id", "Producto", "Nit_Proveedor", "Precio_Compra", "IVA_Compra", "Precio_Venta"};
	
	/*
	 * Con este metodo leeremos los datos del csv y los guardaremos en una lista
	 * la cual retornaremos para que en la clase ProductosImplementacion la guarde 
	 * en la base de datos
	 */
	public static List<Productos> csvProductos(InputStream is){
		
		//Declaramos una variable fileReader de tipo BufferedReader para que nos lea el archivo
		//por buffer ademas le indicamos que el ingreso de datos tiene como formato UTF-8
		
		try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
				/*
				 * En este paso, vamos a utilizar una dependencia más llamada Apache Commons CSV.
				 * Proporciona muchas clases incorporadas como CSVParser, CSVRecord, CSVFormat 
				 * para leer y escribir los datos del archivo CSV.
				 */
				
				//El CSVParser viene de la dependencia, esto nos permitira converitr el 
				CSVParser csvParser = new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {
			//ya dentro del try vamos a crear una lista y un iterable
			List<Productos> listaProductos = new ArrayList<>();
			
			/*
			 * Creamos un iterable de tipo CSVRecord(de la dependencia) en la cual vamos guardando cada registro 
			 * Con getRecords() que devuelve el contenido presente del archivo CSV que convertimos
			 *  en forma de registro
			 */
			
			Iterable<CSVRecord> csvRecords = csvParser.getRecords();
			
			//Creamos un ciclo en el cual vamos obteniendo los datos de cada registro del iterable
		    //y lo vamos agregando a la lista listaProductos que es la que vamos a retornar
			for(CSVRecord csvRec : csvRecords) {
				//Creamos un objeto producto donde vamos enviando los datos de su respectivo titulo
				//por cada registro
				Productos producto = new Productos(
						Integer.parseInt(csvRec.get("Id")),
						csvRec.get("Producto"),
						Integer.parseInt(csvRec.get("Nit_Proveedor")),
						Double.parseDouble(csvRec.get("Precio_Compra")),
						Double.parseDouble(csvRec.get("IVA_Compra")),
						Double.parseDouble(csvRec.get("Precio_Venta"))
						);
				//Agregamos el producto a la lista
				listaProductos.add(producto);
			}
			
			//Retornamos la lista
			return listaProductos;
			
		}catch(IOException e) {
			//Si ocurre algun error mostramos el mensaje
		      throw new RuntimeException("Fallo al convertir el archivo CSV " + e.getMessage());
		}
	}
	 
}
