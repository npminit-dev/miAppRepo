import { RequestHandler, Router } from "express";
import { jwt, carrito, prodAgregado } from '../interfaces&tuplas/tipos';
import { verificarYDecodificarJWT } from "../mismodulos/utilidades";
import { actualizarFechaModCarrito, agregarAlCarrito, existeLaPuntuacion, insertarComentario, insertarPuntuacion, miCarrito, miReseña, modificarComentario, modificarPuntuacion, obtenerTotalCarrito, vaciarCarrito, validacionComentario } from "../mismodulos/consultasFuncts";

const usuarioRouter: Router = Router();


usuarioRouter.post('/usuarios/micarrito', (async (req: any, res: any) => {
  try {
    let jwtdecodificado: jwt = await verificarYDecodificarJWT(req.body) as jwt
    let carrito: carrito[] = await miCarrito(jwtdecodificado);
    if(!carrito.length) throw new Error('el carrito se encuentra vacio!')
    console.log(carrito)
    res.status(200).send(carrito);
  } catch(err) {
    res.status(409).send(`Error: ${err}`);
  }
}) as RequestHandler)


usuarioRouter.post('/usuarios/micarrito/total', (async (req: any, res: any) => {
  try {
    let jwtdecoded: jwt = await verificarYDecodificarJWT(req.body) as jwt
    let total = await obtenerTotalCarrito(jwtdecoded);
    res.status(200).send(`${(total).toFixed(2)}`)
  } catch(err) {
    res.status(409).send(`Error: ${err}`)
  }
}) as RequestHandler)


usuarioRouter.put('/usuarios/micarrito/agregar', (async (req: any, res: any) => {
  try {
    let datos: [string | jwt, prodAgregado] = req.body
    datos[0] = await verificarYDecodificarJWT(datos[0] as string) as jwt
    let msj = await agregarAlCarrito(datos[0], datos[1].ProductoID, datos[1].Cantidad)
    await actualizarFechaModCarrito(datos[0]);
    res.status(200).send(msj)
  } catch(err) {
    res.status(409).send(`Error: ${err}`)
  }
}) as RequestHandler)


usuarioRouter.delete('/usuarios/micarrito/vaciar', (async (req: any, res: any) => {
  try {
    let jwt: jwt = await verificarYDecodificarJWT(req.body) as jwt;
    let msj = await vaciarCarrito(jwt);
    await actualizarFechaModCarrito(jwt);
    res.status(200).send(msj);
  } catch(err) {
    res.status(409).send(`Error: ${err}`);
  }
}) as RequestHandler)


usuarioRouter.post('/usuarios/miresena', (async (req: any, res: any) => {
  try {
    let datos: [string | jwt, number] = req.body;
    datos[0] = await verificarYDecodificarJWT(datos[0] as string) as jwt
    let reseña = await miReseña(...datos as [jwt, number])
    res.status(200).send(reseña)
  } catch(err) {
    res.status(409).send(`Error: ${err}`)
  }
}) as RequestHandler)


usuarioRouter.put('/usuarios/puntuar', (async (req: any, res: any) => {
  try {
    let datos: [string | jwt, number, number] = req.body
    datos[0] = await verificarYDecodificarJWT(datos[0] as string) as jwt
    let existe = await existeLaPuntuacion(datos[0], datos[1])
    if(!existe) {
      await insertarPuntuacion(...datos as [jwt, number, number])
      res.status(200).send('puntuacion insertada')
    } else {
      await modificarPuntuacion(...datos as [jwt, number, number])
      res.status(200).send('puntuacion modificada')
    }
  } catch(err) {
    res.status(409).send(`Error: ${err}`)
  }
}) as RequestHandler)


usuarioRouter.put('/usuarios/comentar', (async (req: any, res: any) => {
  try {
    let datos: [string | jwt, number, string] = req.body;
    datos[0] = await verificarYDecodificarJWT(datos[0] as string) as jwt
    let validarCom = await validacionComentario(datos[0], datos[1])
    console.log(validarCom[1])
    let msj;
    validarCom[0] === 1 
    ? msj = await insertarComentario(...datos as [jwt, number, string]) 
    : msj = await modificarComentario(...datos as [jwt, number, string])
    res.status(200).send(msj)
  } catch(err) {
    res.status(409).send(`Error: ${err}`)
  }
}) as RequestHandler)

export default usuarioRouter