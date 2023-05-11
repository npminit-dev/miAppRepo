import {Request, Response} from 'express';
import dotenv from 'dotenv';
import express from 'express'
import cors from "cors";
import { iniciarSesion, prodsPorDefecto, prodsPorNombreAsc, prodsPorPrecioAsc, prodsPorPrecioDesc, prodsPorCatAsc, prodsPorCatDesc, reseñasAsc, reseñasDesc, existeElAlias, existeElMail } from './mismodulos/consultasFuncts';
import { verificarYDecodificarJWT } from './mismodulos/utilidades';

const app = express()

dotenv.config({path: 'var_entorno.env'}) // variables de entorno
app.use(cors()) // modo cors

app.get('/', (req: Request, res: Response) => {
  res.send('this is the home page')
});

// TESTING

// prodsPorDefecto:
// prodsPorDefecto()
//   .then(resultado => console.log(resultado))

// prodsPorNombreAsc
// prodsPorNombreAsc()
//   .then(resultado => console.log(resultado))

// prodsPorPrecioAsc
// prodsPorPrecioAsc()
//   .then(resultado => console.log(resultado))

// prodsPorPrecioDesc
// prodsPorPrecioDesc()
//   .then(resultado => console.log(resultado))

// prodsPorCatAsc
// prodsPorCatAsc()
//   .then(resultado => console.log(resultado))

// prodsPorCatDesc
// prodsPorCatDesc()
//   .then(resultado => console.log(resultado))

// reseñasAsc()
// reseñasAsc(152) 
//   .then(resultado => console.log(resultado))

// reseñasDesc()
// reseñasDesc(153)
//   .then(resultado => console.log(resultado))

// existeElAlias() (si existe devolvera la promesa rechazada, por lo que debemos capturar el error con un .catch() en el caso de usar la sintaxis de then
// o con un try/catch en caso de usar async/await)
// En TypeScript, puedes crear una función flecha ejecutada inmediatamente (también conocida como IIFE, Immediately Invoked Function Expression) utilizando el siguiente formato:
// (async () => {
//   try{
//     let resultado = await existeElAlias('NicoTheKing');
//     console.log(resultado)
//   } catch (err) {
//     console.log(err)
//   }
// })();

// existeElMail()
// ( async () => {
//   try {
//     let resultado = await existeElMail('Abaddd@gmail.com')
//     console.log(resultado)
//   } catch (err) {
//     console.log(err)
//   }
// })();

  



// en este ejemplo se inicia sesion con alias y contraseña usando la funcion iniciarSesion(), si esta es correcta se devuelve el JWT, 
// encadenandola con verificarJWT esta verifica la validez del token, lo decodifica y lo devuelve
// iniciarSesion('NicoTheKing', 'NicolasElCapo')
// .then(result => {
//   console.log(result) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc3VhcmlvSUQiOjEsIkFsaWFzVXN1YXJpbyI6Ik5pY29UaGVLaW5nIiwiTm9tYnJlcyI6Ik5pY29sYXMgQWxhbiIsIkFwZWxsaWRvIjoiRmVybmFuZGV6IiwiaWF0IjoxNjgzNjU2MzY2LCJleHAiOjE2ODQ5NTIzNjZ9.-hXyZb25WREyoaOhMWOVe2ld94w_-HT8VLV1nZVKDMU
//   return verificarYDecodificarJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc3VhcmlvSUQiOjEsIkFsaWFzVXN1YXJpbyI6Ik5pY29UaGVLaW5nIiwiTm9tYnJlcyI6Ik5pY29sYXMgQWxhbiIsIkFwZWxsaWRvIjoiRmVybmFuZGV6IiwiaWF0IjoxNjgzNjU2MzY2LCJleHAiOjE2ODQ5NTIzNjZ9.-hXyZb25WREyoaOhMWOVe2ld94w_-HT8VLV1nZVKDMU')
// })
// .then(jwtdata => console.log(jwtdata))
// .catch(err => console.log(err))


app.listen(process.env.PORT || 3000)
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`) 