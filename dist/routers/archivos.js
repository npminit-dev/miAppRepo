"use strict";
// import { RequestHandler, Router } from "express";
// import { createReadStream } from "fs";
// import path from "path";
// import { Stream } from "stream";
// let router: Router = Router();
// router.get('/archivos/:nombre', ((req, res) => {
//   try {
//     let nombre = req.params.nombre;
//     let path = __dirname.replace('dist', 'archivos'). replace('routers', `${nombre}.gif`)
//     let stream: Stream = createReadStream(path, { highWaterMark: 1024 })
//     res.setHeader('Content-Type', 'image/gif');
//     stream.pipe(res)
//   } catch (err) {
//     res.status(404).send(`${err}`)
//   }
// }) as RequestHandler)
// export default router;
