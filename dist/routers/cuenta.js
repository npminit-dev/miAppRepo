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
const consultasFuncts_1 = require("../mismodulos/consultasFuncts");
const utilidades_1 = require("../mismodulos/utilidades");
const registrar_Controlador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let datosRegistro = req.body;
    let resultado;
    try {
        if (!datosRegistro)
            throw new Error('body de la peticion vacio');
        let validacion = yield Promise.all([(0, consultasFuncts_1.existeElAlias)(datosRegistro.Alias), (0, consultasFuncts_1.existeElMail)(datosRegistro.Email)]);
        if (validacion.every(elem => elem === false)) {
            resultado = yield (0, consultasFuncts_1.registrar)(datosRegistro);
            res.status(200).send(resultado);
        }
        else
            res.status(409).send(JSON.stringify(validacion));
    }
    catch (err) {
        res.status(404).send(err);
    }
});
const iniciarSesion_Controlador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let datosSesion = req.body;
    try {
        if (!datosSesion)
            throw new Error('body de la peticion vacio');
        let jwt = yield (0, consultasFuncts_1.iniciarSesion)(datosSesion.AliasUsuario, datosSesion.Contraseña);
        if (!jwt)
            res.status(500).send(new Error('Se ha devuelto un jwt undefined, chequear codigo'));
        res.status(200).send(jwt);
    }
    catch (err) {
        res.status(404).send(err);
    }
});
const datosCuenta_Controlador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let jwtcodificado = req.body;
    try {
        if (!jwtcodificado)
            throw new Error('body de la peticion vacio');
        let jwtdecodificado = yield (0, utilidades_1.verificarYDecodificarJWT)(jwtcodificado);
        let datosCuenta = yield (0, consultasFuncts_1.obtenerMisDatos)(jwtdecodificado);
        res.status(200).send(datosCuenta[0]);
    }
    catch (err) {
        res.status(409).send(`Error ${err}`);
    }
});
const modificarDatos_Controlador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let jwtYNuevosDatos = req.body;
    try {
        jwtYNuevosDatos[0] = (yield (0, utilidades_1.verificarYDecodificarJWT)(jwtYNuevosDatos[0]));
        jwtYNuevosDatos[1][3] = (0, utilidades_1.revertirFecha)((0, utilidades_1.agregarCeros)(jwtYNuevosDatos[1][3]));
        let newjwt = yield (0, consultasFuncts_1.modificarMisDatos)(...jwtYNuevosDatos);
        res.status(200).send(newjwt);
    }
    catch (err) {
        res.status(409).send(`Error ${err}`);
    }
});
const verificarAlias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body)
            res.status(404).send('el body de la peticion se encuentra vacio');
        let existe = yield (0, consultasFuncts_1.existeElAlias)(req.body);
        if (existe === false)
            res.status(200).send('false');
        else
            res.status(409).send(existe);
    }
    catch (error) {
        res.status(404).send(`Error ${error}`);
    }
});
exports.default = {
    registrar_Controlador,
    iniciarSesion_Controlador,
    datosCuenta_Controlador,
    modificarDatos_Controlador,
    verificarAlias
};
