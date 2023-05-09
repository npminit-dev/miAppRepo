import mysql, { Connection } from 'mysql'
import dotenv from 'dotenv';
import { datosRegistro, existeAlias, existeElMail, prod, prodYImgs, reseña } from '../interfaces/Interfaces&Tuplas';
import queries from "./Queries";
import bcrypt from "bcrypt";

dotenv.config({path: '../var_entorno.env'})

function crearConexionDB(multiple?: string) : Connection {
  return mysql.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASS,
    database : process.env.DBNAME,
    multipleStatements : multiple ? true : false
  });
}

export function obtenerFechaActual(): string{
  let fecha = new Date(Date.now());
  let año = fecha.getFullYear();
  let mes = `${fecha.getMonth() + 1}`;
  let dia = `${fecha.getDate()}`;
  if(mes.length === 1) mes = '0'.concat(mes)
  if(dia.length === 1) dia = '0'.concat(dia)
  return `${año}-${mes}-${dia}`
}

export const hashearContraseña = (contraseña: string): Promise<string> => new Promise((res, rej) => bcrypt.hash(contraseña, 12, (err: Error|undefined, hash: string) => err ? rej(err) : res(hash)))
// export function hashearContraseña(contraseña: string): Promise<string>{
//   return new Promise((res, rej) => 
//     bcrypt.hash(contraseña, 12, (err: Error|undefined, hash: string) => err ? rej(err) : res(hash))
//   )
// }

// convierte un formato dd-mm-yyyy a yyyy-mm-dd para guardar en la ddbb

export function revertirFecha(fecha:string): string{
  let check = fecha.split('-');
  check.reverse();
  return check.join('-')
}

export function prodsPorDefecto(): Promise<prod[]> {
  return new Promise((res, rej): void => {
    let conexion: Connection = crearConexionDB();
    conexion.connect();
    conexion.query(queries.prodsPorDefecto, 
    (err: Error, result: Array<prod>) : void => {
      if(err) rej(err);
      conexion.end();
      res(result.map(elem => { return {...elem} }))
    })
  })
}

export function prodsPorNombreAsc(): Promise<prodYImgs[]> {
  return new Promise((res, rej): void => {
    let conexion: Connection = crearConexionDB();
    conexion.connect();
    conexion.query(queries.prodsPorNombreAsc, 
    (err: Error, result: Array<prodYImgs>) => {
      if(err) rej(err)
      conexion.end();
      res(result.map(elem => { return {...elem} }))
    })
  })
}

export function prodsPorNombreDesc(): Promise<prodYImgs[]> {
  return new Promise((res, rej): void => {
    let conexion: Connection = crearConexionDB();
    conexion.connect();
    conexion.query(queries.prodsPorNombreDesc, 
    (err: Error, result: Array<prodYImgs>) => {
      if(err) rej(err)
      conexion.end();
      res(result.map(elem => { return {...elem} }))
    })
  })
}

export function prodsPorPrecioAsc(): Promise<prodYImgs[]> {
  return new Promise((res, rej): void => {
    let conexion: Connection = crearConexionDB();
    conexion.connect();
    conexion.query(queries.prodsPorPrecioAsc, 
    (err: Error, result: Array<prodYImgs>) => {
      if(err) rej(err)
      conexion.end();
      res(result.map(elem => { return {...elem} }))
    })
  })
}

export function prodsPorPrecioDesc(): Promise<prodYImgs[]> {
  return new Promise((res, rej): void => {
    let conexion: Connection = crearConexionDB();
    conexion.connect();
    conexion.query(queries.prodsPorPrecioDesc, 
    (err: Error, result: Array<prodYImgs>) => {
      if(err) rej(err)
      conexion.end();
      res(result.map(elem => { return {...elem} }))
    })
  })
}

export function prodsPorCatAsc(): Promise<prodYImgs[]> {
  return new Promise((res, rej): void => {
    let conexion: Connection = crearConexionDB();
    conexion.connect();
    conexion.query(queries.prodsPorCatAsc, 
    (err: Error, result: Array<prodYImgs>) => {
      if(err) rej(err)
      conexion.end();
      res(result.map(elem => { return {...elem} }))
    })
  })
}

export function prodsPorCatDesc(): Promise<prodYImgs[]> {
  return new Promise((res, rej): void => {
    let conexion: Connection = crearConexionDB();
    conexion.connect();
    conexion.query(queries.prodsPorCatDesc, 
    (err: Error, result: Array<prodYImgs>) => {
      if(err) rej(err)
      conexion.end();
      res(result.map(elem => { return {...elem} }))
    })
  })
}

export function reseñasAsc(productoID: number) : Promise<reseña[]|string> {
  return new Promise((res, rej): void => {
    let conexion = crearConexionDB();
    conexion.connect();
    conexion.query(queries.reseñasAsc(productoID), 
    (err: Error, result: Array<reseña>) => {
      conexion.end()
      if(err) rej(err)
      if(!result.length) res('no hay sobre este producto... aun!')
      res(result)
    })
  })
}

export function reseñasDesc(productoID: number) : Promise<reseña[]|string> {
  return new Promise((res, rej): void => {
    let conexion = crearConexionDB();
    conexion.connect();
    conexion.query(queries.reseñasDesc(productoID), 
    (err: Error, result: Array<reseña>) => {
      conexion.end()
      if(err) rej(err)
      if(!result.length) res('no hay sobre este producto... aun!')
      res(result)
    })
  })
}

export function existeElAlias(aliasAComprobar: string): Promise<boolean> {
  return new Promise((res, rej): void => {
    let conexion: Connection = crearConexionDB()
    conexion.connect()
    conexion.query(queries.existeElAlias(aliasAComprobar), 
    (err: Error, result: Array<existeAlias> | []) => {
      if(err) rej(err)
      conexion.end()
      console.log(result)
      if(result.length) res(true)
      rej(false)
    })
  })
}

export function existeElMail(mailAComprobar: string): Promise<boolean> {
  return new Promise((res, rej): void => {
    let conexion: Connection = crearConexionDB();
    conexion.connect();
    conexion.query(queries.existeElMail(mailAComprobar), 
    (err: Error, response: Array<existeElMail> | []) => {
      if(err) rej(err)
      conexion.end()
      if(response.length) res(true)
      rej(false)
    })
  })
}

export function registrar(datos: datosRegistro): Promise<string> {
  return new Promise((res, rej) => {
    let conexion: Connection = crearConexionDB('multiple');
    conexion.connect();
    hashearContraseña(datos.contraseña)
    .then(hasheada => {
      conexion.query(queries.registrar(datos.Alias, datos.Nombres, datos.Apellido, revertirFecha(datos.FechaNac), 
      datos.edad, datos.email, datos.telefono, hasheada),
      (err: Error|null, result: any): void => {
        conexion.end();
        if(err) rej('registro incorrecto') // si el usuario ya se encontraba, entonces devolvera que la subquerie devolvio mas de una columna 
        res('registro correcto')
      })
    })
  })
}
