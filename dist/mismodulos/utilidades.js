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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quitarReferencia = exports.revertirFecha = exports.verificarYDecodificarJWT = exports.crearJWT = exports.chequearHash = exports.hashearContraseña = exports.agregarCeros = exports.obtenerFechaActual = exports.SQLQuery = exports.crearConexionDB = void 0;
const mysql_1 = __importDefault(require("mysql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function crearConexionDB(multiple) {
    return mysql_1.default.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        multipleStatements: multiple ? true : false
    });
}
exports.crearConexionDB = crearConexionDB;
function SQLQuery(conexion, consulta) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => {
            conexion.query(consulta, (err, resultado) => {
                if (err)
                    rej(err);
                res(resultado);
            });
        });
    });
}
exports.SQLQuery = SQLQuery;
function obtenerFechaActual() {
    let fecha = new Date(Date.now());
    let año = fecha.getFullYear();
    let mes = `${fecha.getMonth() + 1}`;
    let dia = `${fecha.getDate()}`;
    if (mes.length === 1)
        mes = '0'.concat(mes);
    if (dia.length === 1)
        dia = '0'.concat(dia);
    return `${año}-${mes}-${dia}`;
}
exports.obtenerFechaActual = obtenerFechaActual;
function agregarCeros(fecha) {
    let fechaarray = fecha.split('-');
    return fechaarray.map((elem) => {
        if (elem.length === 1)
            return `0${elem}`;
        else
            return elem;
    }).join('-');
}
exports.agregarCeros = agregarCeros;
const hashearContraseña = (contraseña) => new Promise((res, rej) => bcrypt_1.default.hash(contraseña, 12, (err, hash) => err ? rej(err) : res(hash)));
exports.hashearContraseña = hashearContraseña;
// export function hashearContraseña(contraseña: string): Promise<string>{
//   return new Promise((res, rej) => 
//     bcrypt.hash(contraseña, 12, (err: Error|undefined, hash: string) => err ? rej(err) : res(hash))
//   )
// }
// convierte un formato dd-mm-yyyy a yyyy-mm-dd para guardar en la ddbb
function chequearHash(cadena, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield bcrypt_1.default.compare(cadena, hash);
            return result;
        }
        catch (err) {
            return false;
        }
        // .then(result => result ? res(true) : rej('contraseña incorrecta'))
    });
}
exports.chequearHash = chequearHash;
function crearJWT(datos) {
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.sign(datos, JSON.stringify(process.env.SECRET), { expiresIn: `${process.env.JWTEXP}d` }, (err, token) => err ? rej(new Error(`error al crear el jwt: ${err}`)) : res(token));
    });
}
exports.crearJWT = crearJWT;
function verificarYDecodificarJWT(jwtstring) {
    return new Promise((res, rej) => {
        jsonwebtoken_1.default.verify(jwtstring, JSON.stringify(process.env.SECRET), (err, decoded) => {
            if (err)
                rej(Error(`error al decodificar el jwt: ${err}`));
            if (!decoded)
                rej(Error('el verify no ha devuelto un error, sino un decode undefined!'));
            res(decoded);
        });
    });
}
exports.verificarYDecodificarJWT = verificarYDecodificarJWT;
function revertirFecha(fecha) {
    let check = fecha.split('-');
    check.reverse();
    return check.join('-');
}
exports.revertirFecha = revertirFecha;
const quitarReferencia = (arreglo) => arreglo.map((elem) => { return Object.assign({}, elem); });
exports.quitarReferencia = quitarReferencia;
