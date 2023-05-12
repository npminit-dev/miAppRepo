import { Connection } from 'mysql'
import dotenv from 'dotenv';

import queries from './queries'
import { chequearHash, crearJWT, hashearContraseña, revertirFecha, crearConexionDB, SQLQuery, quitarReferencia } from './utilidades';
import { datosRegistro, existeAlias, jwt, prod, prodYImgs, reseña, usuarioBasico, existeElMail, misDatos, tuplaNuevosDatos } from '../interfaces/interfaces&Tuplas';

dotenv.config({path: '../var_entorno.env'})

export function prodsPorDefecto(): Promise<prod[]>{
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect()
      let resultadoConsulta: Array<Object> = await SQLQuery(conexion, queries.prodsPorDefecto);
      conexion.end()
      res(quitarReferencia(resultadoConsulta));
    } catch(err) {
      rej(`Error en la ejecucion de prodsPorDefecto(): ${err}`)
    }
  })
}

export function prodsPorNombreAsc(): Promise<prodYImgs[]>{
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect()
      let resultadoConsulta: Array<Object> = await SQLQuery(conexion, queries.prodsPorNombreAsc);
      conexion.end()
      res(quitarReferencia(resultadoConsulta));
    } catch(err) {
      rej(`Error en la ejecucion de prodsPorNombreAsc(): ${err}`)
    }
  })
}

export function prodsPorNombreDesc(): Promise<prodYImgs[]>{
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect()
      let resultadoConsulta: Array<Object> = await SQLQuery(conexion, queries.prodsPorNombreDesc);
      conexion.end()
      res(quitarReferencia(resultadoConsulta));
    } catch(err) {
      rej(`Error en la ejecucion de prodsPorNombreDesc(): ${err}`)
    }
  })
}

export function prodsPorPrecioAsc(): Promise<prodYImgs[]>{
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect()
      let resultadoConsulta: Array<Object> = await SQLQuery(conexion, queries.prodsPorPrecioAsc);
      conexion.end()
      res(quitarReferencia(resultadoConsulta));
    } catch(err) {
      rej(`Error en la ejecucion de prodsPorPrecioAsc(): ${err}`)
    }
  })
}

export function prodsPorPrecioDesc(): Promise<prodYImgs[]>{
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect()
      let resultadoConsulta: Array<Object> = await SQLQuery(conexion, queries.prodsPorPrecioDesc);
      conexion.end()
      res(quitarReferencia(resultadoConsulta));
    } catch(err) {
      rej(`Error en la ejecucion de prodsPorPrecioDesc(): ${err}`)
    }
  })
}

export function prodsPorCatAsc(): Promise<prodYImgs[]>{
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect()
      let resultadoConsulta: Array<Object> = await SQLQuery(conexion, queries.prodsPorCatAsc);
      conexion.end()
      res(quitarReferencia(resultadoConsulta));
    } catch(err) {
      rej(`Error en la ejecucion de prodsPorCatAsc(): ${err}`)
    }
  })
}

export function prodsPorCatDesc(): Promise<prodYImgs[]>{
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect()
      let resultadoConsulta: Array<Object> = await SQLQuery(conexion, queries.prodsPorCatDesc);
      conexion.end()
      res(quitarReferencia(resultadoConsulta));
    } catch(err) {
      rej(`Error en la ejecucion de prodsPorCatDesc(): ${err}`)
    }
  })
}

export function reseñasAsc(ProductoID: number): Promise<reseña[]|string> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let resultadoConsulta = await SQLQuery(conexion, queries.reseñasAsc(ProductoID))
      conexion.end();
      if(!resultadoConsulta.length) res('no hay comentarios sobre este producto... aun!')
      res(quitarReferencia(resultadoConsulta))
    } catch(err) {
      rej(`Error en la ejecucion de reseñasAsc: ${err}`)
    }
  })
}

export function reseñasDesc(ProductoID: number): Promise<reseña[]|string> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let resultadoConsulta = await SQLQuery(conexion, queries.reseñasDesc(ProductoID))
      conexion.end();
      if(!resultadoConsulta.length) res('no hay comentarios sobre este producto... aun!')
      res(quitarReferencia(resultadoConsulta))
    } catch(err) {
      rej(`Error en la ejecucion de reseñasDesc: ${err}`)
    }
  })
}

export async function existeElAlias(aliasAComropbar: string): Promise<boolean>{
  return new Promise(async (res, rej) => {
    try{
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let consultaResultado = await SQLQuery(conexion, queries.existeElAlias(aliasAComropbar))
      conexion.end();
      if(consultaResultado.length) rej(true)
      res(false)
    } catch(err){
      console.log(`Error en la ejecucion de existeElAlias: ${err}`)
    }
  })
}

export async function existeElMail(mailAComprobar: string): Promise<boolean>{
  return new Promise(async (res, rej) => {
    try{
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let consultaResultado = await SQLQuery(conexion, queries.existeElMail(mailAComprobar))
      conexion.end();
      if(consultaResultado.length) rej(true)
      res(false)
    } catch(err){
      console.log(`Error en la ejecucion de existeElMail: ${err}`)
    }
  })
}

export async function registrar(datos: datosRegistro): Promise<string> {
  return new Promise(async (res, rej) => {
    try{
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      let hash: string = await hashearContraseña(datos.Contraseña);
      let resultadoConsulta = await SQLQuery(conexion, queries.registrar(datos.Alias, datos.Nombres, datos.Apellido, revertirFecha(datos.FechaNac),
      datos.Edad, datos.Email, datos.Telefono, hash));
      conexion.end();
      res('registro correcto');
    } catch (err) {
      rej(`Error en la ejecucion de registrar: ${err}`);
    }
  })
}

export async function iniciarSesion(aliasUsuario: string, contraseña: string): Promise<string|undefined> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let resultado = await SQLQuery(conexion, queries.existeElUsuario(aliasUsuario))
      if(resultado.length === 0 || resultado.length > 1) throw new Error('no se ha encontrado el nombre de usuario (o se ha devuelto mas de un usuario)');
      let esCorrecta: boolean = await chequearHash(contraseña, resultado[0].Contraseña);
      if(!esCorrecta) throw new Error('el usuario existe, pero la contraseña es invalida');
      let jwtdatos: jwt[] = await SQLQuery(conexion, queries.devolverJWTData(aliasUsuario));
      jwtdatos = quitarReferencia(jwtdatos);
      let jwtcodificado = crearJWT(jwtdatos[0]);
      conexion.end();
      res(jwtcodificado);
    } catch (err){
      rej(`Error en la ejecucion de iniciarSesion:${err}`)
    }
  })
}

// ahora debemos usar el jwt para estas funciones, debemos pasarlo como parametros ya decodificado:

export async function obtenerMisDatos(datos: jwt): Promise<misDatos>{
  return new Promise(async (res, rej) => {
    try{
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let resultado = await SQLQuery(conexion, queries.misDatos(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido))
      conexion.end();
      resultado = quitarReferencia(resultado)
      res(resultado)
    } catch(err) {
      rej(`Error en la ejecucion de obtenerMisDatos: ${err}`)
    }
  })
}

export async function modificarMisDatos(datos: jwt, nuevosDatos: tuplaNuevosDatos): Promise<string|undefined> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      await SQLQuery(conexion, queries.modificarMisDatos(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido, ...nuevosDatos))
      conexion.end();
      let newJwtData: jwt = { UsuarioID: datos.UsuarioID, AliasUsuario: nuevosDatos[0], Nombres: nuevosDatos[1], Apellido: nuevosDatos[2] }
      let newjwt = await crearJWT(newJwtData);
      res(newjwt);
    } catch (err) {
      rej(`Error en la ejecucion de modificarMisDatos: ${err}`)
    }
  })
}

export async function obtenerTotalCarrito(datos: jwt): Promise<number> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      let total = await SQLQuery(conexion, queries.totalMiCarrito(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido))
      total = quitarReferencia(total)
      conexion.end();
      res(total[0].Total_Carrito)
    } catch(err){
      rej(err)
    }
  })
}
