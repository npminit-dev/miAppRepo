import express, { RequestHandler, Router } from 'express';
import { prodsPorCatAsc, prodsPorCatDesc, prodsPorDefecto, prodsPorNombreAsc, prodsPorNombreDesc, prodsPorPrecioAsc, prodsPorPrecioDesc, reseñasAsc, reseñasDesc } from '../mismodulos/consultasFuncts';
import { prodYImgs, reseña, reseñaBody } from '../interfaces&tuplas/tipos';

const prodsRouter: Router = express.Router();

prodsRouter.get('/prods', (req, res) => {
  res.status(200).send('pagina de productos principal')
})

prodsRouter.get('/prods/defecto', (req, res) => {
  prodsPorDefecto()
    .then(prods => res.status(200).send(prods))
    .catch(err => res.status(404).send(err))
})

prodsRouter.get('/prods/nombre/:criterio', (async (req, res) => {
  let prods: prodYImgs[];
  try {
    if(req.params.criterio === 'asc') prods = await prodsPorNombreAsc();
    else if(req.params.criterio === 'desc') prods = await prodsPorNombreDesc();
    else throw new Error('Bad request params')
    res.status(200).send(prods)
  } catch(err) {
    res.status(404).send(err)
  }
}) as RequestHandler)

prodsRouter.get('/prods/precio/:criterio', (async (req, res) => {
  let prods: prodYImgs[];
  try {
    if(req.params.criterio === 'asc') prods = await prodsPorPrecioAsc();
    else if(req.params.criterio === 'desc') prods = await prodsPorPrecioDesc();
    else throw new Error('Bad request params')
    res.status(200).send(prods)
  } catch(err) {
    res.status(404).send(err)
  }
}) as RequestHandler)

prodsRouter.get('/prods/categoria/:criterio', (async (req, res) => {
  let prods: prodYImgs[];
  try {
    if(req.params.criterio === 'asc') prods = await prodsPorCatAsc();
    else if(req.params.criterio === 'desc') prods = await prodsPorCatDesc();
    else throw new Error('Bad request params')
    res.status(200).send(prods)
  } catch(err) {
    res.status(404).send(err)
  }
}) as RequestHandler)

prodsRouter.post('/prods/resena/:criterio', (async (req, res) => {
  let datos: reseñaBody = req.body;
  let prods: reseña[] | string;
  try {
    if(req.params.criterio === 'asc') prods = await reseñasAsc(datos.ProductoID);
    else if(req.params.criterio === 'desc') prods = await reseñasDesc(datos.ProductoID)
    else throw new Error('Bad Request params')
    res.status(200).send(prods)
  } catch(err) {
    res.status(404).send(err)
  }
}) as RequestHandler)

export default prodsRouter;
