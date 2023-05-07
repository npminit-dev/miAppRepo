import mysql, { Connection } from 'mysql'
import dotenv from 'dotenv';
import { prod, prodYImgs } from '../interfaces/Interfaces';

dotenv.config({path: '../var_entorno.env'})

function crearConexionDB() : Connection {
  return mysql.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASS,
    database : process.env.DBNAME
  });
}

export function productosPorDefecto(): Promise<prod[]>{
  return new Promise((res, rej) : void => {
    let conexion : Connection = crearConexionDB();
    conexion.connect();
    conexion.query('SELECT * FROM Producto', 
    (err: Error, result: Array<prod>) : void => {
     if(err) rej(err);
     conexion.end();
     res(result.map(elem => { return {...elem} }))
   })
  })
}




