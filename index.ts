import {Application, Router} from 'express';
import dotenv from 'dotenv';
import express from 'express'
import cors, { CorsOptions } from "cors";
import prodsRouter from './routers/prods';
import accControlFuncts from './routers/cuenta' 
import usuarioRouter from './routers/usuario'
// import archivosRouter from './routers/archivos'
import morgan from 'morgan'

const app: Application = express()

// configurcion de los origenes permitidos
// const origenesPermitidos = ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:3002']
// const corsOpciones: CorsOptions = {
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   origin: (origen, llamada) => {
//     console.log(origen)
//     if(origenesPermitidos.some(permitidos => permitidos === origen)) llamada(null, true)
//     else llamada(new Error('Origen de solicitud no permitido por el servidor!'))
//   }
// }

// utilidades del proyecto
dotenv.config({path: 'var_entorno.env'}) // variables de entorno
app.use(morgan('dev')) // morgan para obtener informacion de las solicitudes
app.use(cors(/*corsOpciones*/)) // uso del modo cors con la configuracion especiicada
app.use(express.json()) // permite interpretar JSON que provienen de las solicitudes 
app.use(express.text()) // permite interpretar texto que provienen de las solicitudes 


///* controladores *///

// controladores sobre productos y reseñas (usuarios sin inicio de sesion)
app.use(prodsRouter)


// controladores sobre creacion, sesion, modificacion de cuentas y datos de cuentas
const accControlRouter = Router();
accControlRouter.post('/usuarios/registrar', accControlFuncts.registrar_Controlador)
accControlRouter.post('/usuarios/iniciarsesion', accControlFuncts.iniciarSesion_Controlador)
// usuario 1 jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc3VhcmlvSUQiOjEsIkFsaWFzVXN1YXJpbyI6Ik5pY29UaGVGdWNraW5nS2luZzIiLCJOb21icmVzIjoiTmljb2xhcyBNYXJpYW5vIiwiQXBlbGxpZG8iOiJHb256YWxleiIsImlhdCI6MTY4NDU4NzExMSwiZXhwIjoxNjg1ODgzMTExfQ.PIui2lrZDaLTTnvAefWPu-mva7_IP17_WE8RCTdjmA4
accControlRouter.post('/usuarios/misdatos', accControlFuncts.datosCuenta_Controlador)
/* // formato del body para modificar: 
[
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc3VhcmlvSUQiOjEsIkFsaWFzVXN1YXJpbyI6Ik5pY29UaGVGdWNraW5nS2luZzIiLCJOb21icmVzIjoiTmljb2xhcyBSaWNhcmRvIiwiQXBlbGxpZG8iOiJHb256YWxleiIsImlhdCI6MTY4NDU3ODg4MCwiZXhwIjoxNjg1ODc0ODgwfQ.oCR5JBFT9GTbtiOGhlxmpqbr5pDAdfLgZ0dVVl1xzOk"
  , 
  [
    "Nicolas Ricardo",
    "Gonzalez",
    "4-7-1996",
    27,
    "431-1123-111"
  ] 
]
*/
accControlRouter.put('/usuarios/modificar', accControlFuncts.modificarDatos_Controlador)
accControlRouter.post('/usuarios/verificaralias', accControlFuncts.verificarAlias)
app.use(accControlRouter)
// tener en cuenta que al modificar los datos de usuario los tokens viejos pueden no volver a funcionar


// controladores de carrito, producto y reseñas
app.use(usuarioRouter)
// usuario 7 jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc3VhcmlvSUQiOjcsIkFsaWFzVXN1YXJpbyI6IkZyYW5jaXNGb3JkQ29wcG9sYSIsIk5vbWJyZXMiOiJGcmFuY2lzY28gSmF2aWVyIiwiQXBlbGxpZG8iOiJTY2h3YXJ0em1hbm4iLCJpYXQiOjE2ODQ2Mzk3NTIsImV4cCI6MTY4NTkzNTc1Mn0.-dpwKByxQIqsKSbkTUyrL6mqMoPvuNplja8vBZoJGaA

// controladores de archivos
// app.use(archivosRouter);

app.listen(process.env.PORT || 3000)
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`) 

