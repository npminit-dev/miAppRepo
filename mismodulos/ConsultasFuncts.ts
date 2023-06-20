import { Connection } from 'mysql'
import dotenv from 'dotenv';

import queries from './queries'
import { chequearHash, crearJWT, hashearContraseña, revertirFecha, crearConexionDB, SQLQuery, quitarReferencia } from './utilidades';
import { datosRegistro, jwt, prod, prodYImgs, reseña, existeElMail, misDatos, tuplaNuevosDatos, carrito, puntuacion, validacionComentario } from '../interfaces&tuplas/tipos';

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

export async function existeElAlias(aliasAComropbar: string): Promise<boolean|string>{
  return new Promise(async (res, rej) => {
    try{
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let consultaResultado = await SQLQuery(conexion, queries.existeElAlias(aliasAComropbar))
      conexion.end();
      if(consultaResultado.length) res('El alias de usuario ya existe en nuestros registros, intente con otro')
      res(false)
    } catch(err){
      console.log(`Error en la ejecucion de existeElAlias: ${err}`)
    }
  })
}

export async function existeElMail(mailAComprobar: string): Promise<boolean|string>{
  return new Promise(async (res, rej) => {
    try{
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let consultaResultado = await SQLQuery(conexion, queries.existeElMail(mailAComprobar))
      conexion.end();
      if(consultaResultado.length) res('La direccion de E-mail ya existe en nuestros registros, intente con otra')
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
      await SQLQuery(conexion, queries.registrar(datos.Alias, datos.Nombres, datos.Apellido, revertirFecha(datos.FechaNac),
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
      rej(`Error en la ejecucion de iniciarSesion: ${err}`)
    }
  })
}

// ahora debemos usar el jwt para estas funciones, debemos pasarlo como parametros ya decodificado:

export async function obtenerMisDatos(datos: jwt): Promise<misDatos[]>{
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

export async function miCarrito(datos: jwt): Promise<carrito[]>{
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let carrito = await SQLQuery(conexion, queries.miCarrito(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido))
      conexion.end();
      carrito = quitarReferencia(carrito)
      res(carrito)
    } catch (err) {
      rej(`Error en la ejecucion de miCarrito: ${err}`)
    }
  })
}

export async function obtenerTotalCarrito(datos: jwt): Promise<number> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      let total = await SQLQuery(conexion, queries.totalMiCarrito(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido))
      if(!total.length) res(0.0)
      total = quitarReferencia(total)
      conexion.end();
      res(total[0].Total_Carrito)
    } catch(err){
      rej(`Error en la ejecucion de obtenerTotalCarrito: ${err}`)
    }
  })
}

export async function agregarAlCarrito(datos: jwt, productoID: number, cantidad: number): Promise<string>{
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      await SQLQuery(conexion, queries.agregarAlCarrito(datos.UsuarioID, productoID, cantidad))
      conexion.end()
      res('agregado')
    } catch(err) {
      rej(`Error en la ejecucion de agregarAlCarrito: ${err}`)
    }
  })
}

export async function vaciarCarrito(datos: jwt): Promise<string> {
  return new Promise(async (res, rej) => {  
    try {
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      await SQLQuery(conexion, queries.vaciarMiCarrito(datos.UsuarioID))
      conexion.end();
      res('vaciado') 
    } catch(err) {
      rej(`Error en la ejecucion de vaciarCarrito: ${err}`)
    } 
  })
}

export async function actualizarFechaModCarrito(datos: jwt): Promise<string>{
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      await SQLQuery(conexion, queries.actualizarFechaModCarrito(datos.UsuarioID))
      conexion.end();
      res('fecha de modificacion del carrito actualizada');
    } catch(err) {
      rej(`Error en la ejecucion de actualizarFechaModCarrito: ${err}`)
    }
  })
}

export async function miReseña(datos: jwt, productoID: number): Promise<reseña|string> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let reseña = await SQLQuery(conexion, queries.miReseña(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido, productoID))
      reseña = quitarReferencia(reseña)
      if(reseña.length === 0) res('el usuario no ha reseñado el producto')
      if(reseña.length > 1) throw new Error('se ha devuelto mas de 1 reseña (y eso es malo)');
      conexion.end();
      res(reseña[0]);
    } catch(err) {
      rej(`Error en la ejecucion de miReseña: ${err}`)
    }
  })
}

export async function existeLaPuntuacion(datos: jwt, productoID: number): Promise<boolean> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB();
      conexion.connect();
      let resultado: puntuacion[] = await SQLQuery(conexion, queries.existeLaPuntuacion(datos.UsuarioID, productoID));
      resultado = quitarReferencia(resultado);
      conexion.end();
      if(!resultado.length) res(false)
      if(resultado.length > 1) throw new Error('se ha devuelto mas de una puntuacion del usuario con respecto al producto')
      else res(true)
    } catch(err) {
      rej(`Error en la ejecucion de existeLaPuntuacion: ${err}`)
    }
  })
}

export async function insertarPuntuacion(datos: jwt, productoID: number, puntuacion: number): Promise<string> {
  return new Promise( async(res, rej) => {
    try {
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      await SQLQuery(conexion, queries.insertarPuntuacion(datos.UsuarioID, productoID, puntuacion));
      conexion.end();
      res('puntuacion añadida')
    } catch(err) {
      rej(`Error en la ejecucion de insertarPuntuacion: ${err}`)
    }
  })
}

export async function modificarPuntuacion(datos: jwt, productoID: number, puntuacion: number): Promise<string> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      await SQLQuery(conexion, queries.modificarPuntuacion(datos.UsuarioID, productoID, puntuacion));
      conexion.end();
      res('puntuacion modificada')
    } catch(err) {
      rej(`Error en la ejecucion de modificarPuntuacion: ${err}`)
    }
  })
}

export async function validacionComentario(datos: jwt, productoID: number): Promise<[number, string]> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      let resultado: validacionComentario[] | [] = await SQLQuery(conexion, queries.validacionComentario(datos.UsuarioID, productoID));
      conexion.end();
      resultado = quitarReferencia(resultado)
      if(!resultado.length) throw new Error('no se puede comentar sin haber puntuado antes')
      if(resultado.length > 1) throw new Error('se ha devuelto mas de un comentario')
      if(!resultado[0].Comentario) res([1, 'existe la puntuacion pero no el comentario, se agregara un comentario nuevo'])
      else res([2,'existe la puntuacion y el comentario, se modificara el comentario'])
    } catch(err) {
      rej(`Error en la ejecucion de validacionComentario: ${err}`)
    }
  })
}

export async function insertarComentario(datos: jwt, productoID: number, comentario: string): Promise<string> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      await SQLQuery(conexion, queries.comentarioNuevo(datos.UsuarioID, productoID, comentario));
      res('nuevo comentario insertado');
      conexion.end();
    } catch(err) {
      rej(`Error en la ejecucion de insertarComentario: ${err}`)
    }
  })
}

export async function modificarComentario(datos: jwt, productoID: number, comentario: string): Promise<string> {
  return new Promise(async (res, rej) => {
    try {
      const conexion: Connection = crearConexionDB('multiple');
      conexion.connect();
      await SQLQuery(conexion, queries.modificarComentario(datos.UsuarioID, productoID, comentario));
      conexion.end();
      res('comentario modificado')
    } catch(err) {
      rej(`Error en la ejecucion de modificarComentario: ${err}`)
    }
  })
}
