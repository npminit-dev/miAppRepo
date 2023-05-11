import { Connection } from 'mysql'
import dotenv from 'dotenv';

import queries from './queries'
import { chequearHash, crearJWT, hashearContraseña, revertirFecha, crearConexionDB, SQLQuery, quitarReferencia } from './utilidades';
import { datosRegistro, existeAlias, jwt, prod, prodYImgs, reseña, usuarioBasico, existeElMail } from '../interfaces/interfaces&Tuplas';

dotenv.config({path: '../var_entorno.env'})

export function prodsPorDefecto(): Promise<prod[]>{
  return new Promise(async (res, rej) => {
    try {
      let conexion: Connection = crearConexionDB();
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
      let conexion: Connection = crearConexionDB();
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
      let conexion: Connection = crearConexionDB();
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
      let conexion: Connection = crearConexionDB();
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
      let conexion: Connection = crearConexionDB();
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
      let conexion: Connection = crearConexionDB();
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
      let conexion: Connection = crearConexionDB();
      conexion.connect()
      let resultadoConsulta: Array<Object> = await SQLQuery(conexion, queries.prodsPorCatDesc);
      conexion.end()
      res(quitarReferencia(resultadoConsulta));
    } catch(err) {
      rej(`Error en la ejecucion de prodsPorCatDesc(): ${err}`)
    }
  })
}

// export function reseñasAsc(productoID: number) : Promise<reseña[]|string> {
//   return new Promise((res, rej): void => {
//     let conexion = crearConexionDB();
//     conexion.connect();
//     conexion.query(queries.reseñasAsc(productoID), 
//     (err: Error, result: Array<reseña>) => {
//       conexion.end()
//       if(err) rej(err)
//       if(!result.length) res('no hay sobre este producto... aun!')
//       res(result.map(elem => { return {...elem} }))
//     })
//   })
// }

export function reseñasAsc(ProductoID: number): Promise<reseña[]|string> {
  return new Promise(async (res, rej) => {
    try {
      let conexion: Connection = crearConexionDB();
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
      let conexion: Connection = crearConexionDB();
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
      let conexion: Connection = crearConexionDB();
      conexion.connect();
      let consultaResultado = await SQLQuery(conexion, queries.existeElAlias(aliasAComropbar))
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
      let conexion: Connection = crearConexionDB();
      conexion.connect();
      let consultaResultado = await SQLQuery(conexion, queries.existeElMail(mailAComprobar))
      if(consultaResultado.length) rej(true)
      res(false)
    } catch(err){
      console.log(`Error en la ejecucion de existeElMail: ${err}`)
    }
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

export function iniciarSesion(aliasUsuario: string, contraseña: string): Promise<jwt|string|undefined> {
  return new Promise((res, _rej) => {
    let conexion = crearConexionDB();
    conexion.connect();
    conexion.query(queries.existeElUsuario(aliasUsuario),
    (err: Error, resultado: Array<usuarioBasico>) => {
      if(err) throw new Error('error al realizar la querie que comprueba que existe el usuario y devuelve el id y contraseña')
      if(resultado.length === 0 || resultado.length > 1) throw new Error('no se ha encontrado el nombre de usuario (o se ha devuelto mas de un usuario)')
      chequearHash(contraseña, resultado[0].Contraseña)
      .then(escorrecta => {
        if(!escorrecta) throw new Error('el usuario existe, pero la contraseña es invalida')
        conexion.query(queries.devolverJWTData(aliasUsuario),
        (err: Error, resultado: Array<jwt>) => {
          if(err) throw new Error('error al realizar la querie que devuelve los datos del jwt recibiendo el alias del usuario')
          let datos: jwt = resultado.map((elem: any) => {return {...elem}})[0]
          crearJWT(datos)
          .then(jwtstring => res(jwtstring))
        }) 
      })
    })
  })
}

