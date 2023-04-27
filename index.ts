import {Request, Response} from 'express';
import dotenv from 'dotenv';
import express from 'express'
import decirhola from './mismodulos/mimodulo';

const app = express()

dotenv.config({path: 'var_entorno.env'})

app.get('/', (req: Request, res: Response) => {
  res.send('this is the home page')
})

console.log(decirhola('Jorge'))

app.listen(process.env.PORT || 3000)
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`)