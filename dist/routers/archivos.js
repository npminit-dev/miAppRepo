"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
let router = (0, express_1.Router)();
router.get('/archivos/:nombre', ((req, res) => {
    try {
        let nombre = req.params.nombre;
        let path = __dirname.replace('dist', 'archivos').replace('routers', `${nombre}.gif`);
        let stream = (0, fs_1.createReadStream)(path, { highWaterMark: 1024 });
        res.setHeader('Content-Type', 'image/gif');
        stream.pipe(res);
    }
    catch (err) {
        res.status(404).send(`${err}`);
    }
}));
exports.default = router;
