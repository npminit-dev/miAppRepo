"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrar = exports.existeElMail = exports.existeElAlias = exports.reseñasDesc = exports.reseñasAsc = exports.prodsPorCatDesc = exports.prodsPorCatAsc = exports.prodsPorPrecioDesc = exports.prodsPorPrecioAsc = exports.prodsPorNombreDesc = exports.prodsPorNombreAsc = exports.prodsPorDefecto = exports.revertirFecha = exports.hashearContraseña = exports.obtenerFechaActual = void 0;
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
const Queries_1 = __importDefault(require("./Queries"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config({ path: '../var_entorno.env' });
function crearConexionDB(multiple) {
    return mysql_1.default.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        multipleStatements: multiple ? true : false
    });
}
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
const hashearContraseña = (contraseña) => new Promise((res, rej) => bcrypt_1.default.hash(contraseña, 12, (err, hash) => err ? rej(err) : res(hash)));
exports.hashearContraseña = hashearContraseña;
// export function hashearContraseña(contraseña: string): Promise<string>{
//   return new Promise((res, rej) => 
//     bcrypt.hash(contraseña, 12, (err: Error|undefined, hash: string) => err ? rej(err) : res(hash))
//   )
// }
// convierte un formato dd-mm-yyyy a yyyy-mm-dd para guardar en la ddbb
function revertirFecha(fecha) {
    let check = fecha.split('-');
    check.reverse();
    return check.join('-');
}
exports.revertirFecha = revertirFecha;
function prodsPorDefecto() {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.prodsPorDefecto, (err, result) => {
            if (err)
                rej(err);
            conexion.end();
            res(result.map(elem => { return Object.assign({}, elem); }));
        });
    });
}
exports.prodsPorDefecto = prodsPorDefecto;
function prodsPorNombreAsc() {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.prodsPorNombreAsc, (err, result) => {
            if (err)
                rej(err);
            conexion.end();
            res(result.map(elem => { return Object.assign({}, elem); }));
        });
    });
}
exports.prodsPorNombreAsc = prodsPorNombreAsc;
function prodsPorNombreDesc() {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.prodsPorNombreDesc, (err, result) => {
            if (err)
                rej(err);
            conexion.end();
            res(result.map(elem => { return Object.assign({}, elem); }));
        });
    });
}
exports.prodsPorNombreDesc = prodsPorNombreDesc;
function prodsPorPrecioAsc() {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.prodsPorPrecioAsc, (err, result) => {
            if (err)
                rej(err);
            conexion.end();
            res(result.map(elem => { return Object.assign({}, elem); }));
        });
    });
}
exports.prodsPorPrecioAsc = prodsPorPrecioAsc;
function prodsPorPrecioDesc() {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.prodsPorPrecioDesc, (err, result) => {
            if (err)
                rej(err);
            conexion.end();
            res(result.map(elem => { return Object.assign({}, elem); }));
        });
    });
}
exports.prodsPorPrecioDesc = prodsPorPrecioDesc;
function prodsPorCatAsc() {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.prodsPorCatAsc, (err, result) => {
            if (err)
                rej(err);
            conexion.end();
            res(result.map(elem => { return Object.assign({}, elem); }));
        });
    });
}
exports.prodsPorCatAsc = prodsPorCatAsc;
function prodsPorCatDesc() {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.prodsPorCatDesc, (err, result) => {
            if (err)
                rej(err);
            conexion.end();
            res(result.map(elem => { return Object.assign({}, elem); }));
        });
    });
}
exports.prodsPorCatDesc = prodsPorCatDesc;
function reseñasAsc(productoID) {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.reseñasAsc(productoID), (err, result) => {
            conexion.end();
            if (err)
                rej(err);
            if (!result.length)
                res('no hay sobre este producto... aun!');
            res(result);
        });
    });
}
exports.reseñasAsc = reseñasAsc;
function reseñasDesc(productoID) {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.reseñasDesc(productoID), (err, result) => {
            conexion.end();
            if (err)
                rej(err);
            if (!result.length)
                res('no hay sobre este producto... aun!');
            res(result);
        });
    });
}
exports.reseñasDesc = reseñasDesc;
function existeElAlias(aliasAComprobar) {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.existeElAlias(aliasAComprobar), (err, result) => {
            if (err)
                rej(err);
            conexion.end();
            console.log(result);
            if (result.length)
                res(true);
            rej(false);
        });
    });
}
exports.existeElAlias = existeElAlias;
function existeElMail(mailAComprobar) {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query(Queries_1.default.existeElMail(mailAComprobar), (err, response) => {
            if (err)
                rej(err);
            conexion.end();
            if (response.length)
                res(true);
            rej(false);
        });
    });
}
exports.existeElMail = existeElMail;
function registrar(datos) {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB('multiple');
        conexion.connect();
        (0, exports.hashearContraseña)(datos.contraseña)
            .then(hasheada => {
            conexion.query(Queries_1.default.registrar(datos.Alias, datos.Nombres, datos.Apellido, revertirFecha(datos.FechaNac), datos.edad, datos.email, datos.telefono, hasheada), (err, result) => {
                conexion.end();
                if (err)
                    rej('registro incorrecto'); // si el usuario ya se encontraba, entonces devolvera que la subquerie devolvio mas de una columna 
                res('registro correcto');
            });
        });
    });
}
exports.registrar = registrar;
