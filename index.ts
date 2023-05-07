import {Request, Response} from 'express';
import dotenv from 'dotenv';
import express from 'express'
import { productosPorDefecto } from './mismodulos/ConsultasFuncts';
import { prod } from './interfaces/Interfaces';
import cors from "cors";

const app = express()

dotenv.config({path: 'var_entorno.env'})
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('this is the home page')
})

productosPorDefecto()
  .then(res => console.log(res[0]))
  .catch(err => console.log(err))


app.listen(process.env.PORT || 3000)
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`)