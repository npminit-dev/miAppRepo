import mysql, { Connection } from 'mysql'
import bcrypt from 'bcrypt';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { jwt } from '../interfaces&tuplas/tipos';

export function crearConexionDB(multiple?: string) : Connection {
  return mysql.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASS,
    database : process.env.DBNAME,
    multipleStatements : multiple ? true : false
  });
}

export async function SQLQuery(conexion: Connection, consulta: string): Promise<any> {
  return new Promise((res, rej) => {
    conexion.query(consulta, (err, resultado) => {
      if(err) rej(err)
      res(resultado)
    })
  })
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

export function agregarCeros(fecha: string): string {
  let fechaarray: Array<string> = fecha.split('-')
  return fechaarray.map((elem) => {
    if(elem.length === 1) return `0${elem}`
    else return elem
  }).join('-')
}

export const hashearContraseña = (contraseña: string): Promise<string> => new Promise((res, rej) => bcrypt.hash(contraseña, 12, (err: Error|undefined, hash: string) => err ? rej(err) : res(hash)))
// export function hashearContraseña(contraseña: string): Promise<string>{
//   return new Promise((res, rej) => 
//     bcrypt.hash(contraseña, 12, (err: Error|undefined, hash: string) => err ? rej(err) : res(hash))
//   )
// }

// convierte un formato dd-mm-yyyy a yyyy-mm-dd para guardar en la ddbb

export async function chequearHash(cadena: string, hash: string): Promise<boolean> {
  try {
    let result = await bcrypt.compare(cadena, hash)
    return result
  } catch(err) {
    return false
  }
    // .then(result => result ? res(true) : rej('contraseña incorrecta'))
  
}

export function crearJWT(datos: jwt): Promise<string|undefined> {
  return new Promise((res, rej) => {
    jsonwebtoken.sign(datos, JSON.stringify(process.env.SECRET), { expiresIn: `${process.env.JWTEXP}d` },
    (err, token): void => err ? rej(new Error(`error al crear el jwt: ${err}`)) : res(token))
  })
}

export function verificarYDecodificarJWT(jwtstring: string): Promise<JwtPayload|string|undefined> {
  return new Promise((res, rej) => {
    jsonwebtoken.verify(jwtstring, JSON.stringify(process.env.SECRET), (err, decoded) => {
      if(err) rej(Error(`error al decodificar el jwt: ${err}`))
      if(!decoded) rej(Error('el verify no ha devuelto un error, sino un decode undefined!'))
      res(decoded)
    })
  })
}

export function revertirFecha(fecha:string): string{
  let check = fecha.split('-');
  check.reverse();
  return check.join('-')
}

export const quitarReferencia = (arreglo: Array<any>) : Array<any> => arreglo.map((elem): any => { return {...elem} })