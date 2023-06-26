"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utilidades_1 = require("../mismodulos/utilidades");
const consultasFuncts_1 = require("../mismodulos/consultasFuncts");
const usuarioRouter = (0, express_1.Router)();
usuarioRouter.post('/usuarios/micarrito', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let jwtdecodificado = yield (0, utilidades_1.verificarYDecodificarJWT)(req.body);
        let carrito = yield (0, consultasFuncts_1.miCarrito)(jwtdecodificado);
        if (!carrito.length)
            throw new Error('el carrito se encuentra vacio!');
        console.log(carrito);
        res.status(200).send(carrito);
    }
    catch (err) {
        res.status(409).send(`Error: ${err}`);
    }
})));
usuarioRouter.post('/usuarios/micarrito/total', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let jwtdecoded = yield (0, utilidades_1.verificarYDecodificarJWT)(req.body);
        let total = yield (0, consultasFuncts_1.obtenerTotalCarrito)(jwtdecoded);
        res.status(200).send(`${(total).toFixed(2)}`);
    }
    catch (err) {
        res.status(409).send(`Error: ${err}`);
    }
})));
usuarioRouter.put('/usuarios/micarrito/agregar', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let datos = req.body;
        datos[0] = (yield (0, utilidades_1.verificarYDecodificarJWT)(datos[0]));
        let msj = yield (0, consultasFuncts_1.agregarAlCarrito)(datos[0], datos[1].ProductoID, datos[1].Cantidad);
        yield (0, consultasFuncts_1.actualizarFechaModCarrito)(datos[0]);
        res.status(200).send(msj);
    }
    catch (err) {
        res.status(409).send(`Error: ${err}`);
    }
})));
usuarioRouter.delete('/usuarios/micarrito/vaciar', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let jwt = yield (0, utilidades_1.verificarYDecodificarJWT)(req.body);
        let msj = yield (0, consultasFuncts_1.vaciarCarrito)(jwt);
        yield (0, consultasFuncts_1.actualizarFechaModCarrito)(jwt);
        res.status(200).send(msj);
    }
    catch (err) {
        res.status(409).send(`Error: ${err}`);
    }
})));
usuarioRouter.post('/usuarios/miresena', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let datos = req.body;
        datos[0] = (yield (0, utilidades_1.verificarYDecodificarJWT)(datos[0]));
        let reseña = yield (0, consultasFuncts_1.miReseña)(...datos);
        res.status(200).send(reseña);
    }
    catch (err) {
        res.status(409).send(`Error: ${err}`);
    }
})));
usuarioRouter.put('/usuarios/puntuar', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let datos = req.body;
        datos[0] = (yield (0, utilidades_1.verificarYDecodificarJWT)(datos[0]));
        let existe = yield (0, consultasFuncts_1.existeLaPuntuacion)(datos[0], datos[1]);
        if (!existe) {
            yield (0, consultasFuncts_1.insertarPuntuacion)(...datos);
            res.status(200).send('puntuacion insertada');
        }
        else {
            yield (0, consultasFuncts_1.modificarPuntuacion)(...datos);
            res.status(200).send('puntuacion modificada');
        }
    }
    catch (err) {
        res.status(409).send(`Error: ${err}`);
    }
})));
usuarioRouter.put('/usuarios/comentar', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let datos = req.body;
        datos[0] = (yield (0, utilidades_1.verificarYDecodificarJWT)(datos[0]));
        let validarCom = yield (0, consultasFuncts_1.validacionComentario)(datos[0], datos[1]);
        console.log(validarCom[1]);
        let msj;
        validarCom[0] === 1
            ? msj = yield (0, consultasFuncts_1.insertarComentario)(...datos)
            : msj = yield (0, consultasFuncts_1.modificarComentario)(...datos);
        res.status(200).send(msj);
    }
    catch (err) {
        res.status(409).send(`Error: ${err}`);
    }
})));
usuarioRouter.delete('/usuarios/eliminarcomentario', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let datos = req.body;
    if (!datos)
        res.status(400).send('body de la peticion vacio');
    try {
        datos[0] = (yield (0, utilidades_1.verificarYDecodificarJWT)(datos[0]));
        let msj = yield (0, consultasFuncts_1.borrarComentario)(...datos);
        res.status(200).send(msj);
    }
    catch (err) {
        res.status(400).send(`Error: ${err}`);
    }
})));
exports.default = usuarioRouter;
