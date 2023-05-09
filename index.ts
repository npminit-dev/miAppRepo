import {Request, Response} from 'express';
import dotenv from 'dotenv';
import express from 'express'
import { prodsPorDefecto, prodsPorNombreAsc, revertirFecha, prodsPorPrecioDesc, prodsPorPrecioAsc, prodsPorCatDesc, prodsPorCatAsc, existeElAlias, existeElMail, obtenerFechaActual, registrar, reseñasAsc, reseñasDesc } from './mismodulos/ConsultasFuncts';
import { datosRegistro, prod } from './interfaces/Interfaces&Tuplas';
import cors from "cors";
import queries from './mismodulos/Queries'

const app = express()

dotenv.config({path: 'var_entorno.env'}) // variables de entorno
app.use(cors()) // modo cors

app.get('/', (req: Request, res: Response) => {
  res.send('this is the home page')
})


// Alias: string, Nombres: string, Apellido: string, FechaNac: string, Edad: number, Email: string, Telefono: string, ContraseñaHasheada: string
let reqbody: datosRegistro = {
  Alias: 'monikkkkk',
  Nombres: 'Monica Belen',
  Apellido: 'Argento',
  FechaNac: '13-8-1990',
  edad: 33,
  email: 'monikakapa@hotmail.com',
  telefono: '+541176839009',
  contraseña: 'mimoniquitalaloquita'
}

reseñasAsc(153)
  .then((result: any) => console.log(result))

app.listen(process.env.PORT || 3000)
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`)