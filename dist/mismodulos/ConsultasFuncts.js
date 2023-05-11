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
exports.iniciarSesion = exports.registrar = exports.existeElMail = exports.existeElAlias = exports.reseñasDesc = exports.reseñasAsc = exports.prodsPorCatDesc = exports.prodsPorCatAsc = exports.prodsPorPrecioDesc = exports.prodsPorPrecioAsc = exports.prodsPorNombreDesc = exports.prodsPorNombreAsc = exports.prodsPorDefecto = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const queries_1 = __importDefault(require("./queries"));
const utilidades_1 = require("./utilidades");
dotenv_1.default.config({ path: '../var_entorno.env' });
function prodsPorDefecto() {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            let conexion = (0, utilidades_1.crearConexionDB)();
            conexion.connect();
            let resultadoConsulta = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.prodsPorDefecto);
            conexion.end();
            res((0, utilidades_1.quitarReferencia)(resultadoConsulta));
        }
        catch (err) {
            rej(`Error en la ejecucion de prodsPorDefecto(): ${err}`);
        }
    }));
}
exports.prodsPorDefecto = prodsPorDefecto;
function prodsPorNombreAsc() {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            let conexion = (0, utilidades_1.crearConexionDB)();
            conexion.connect();
            let resultadoConsulta = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.prodsPorNombreAsc);
            conexion.end();
            res((0, utilidades_1.quitarReferencia)(resultadoConsulta));
        }
        catch (err) {
            rej(`Error en la ejecucion de prodsPorNombreAsc(): ${err}`);
        }
    }));
}
exports.prodsPorNombreAsc = prodsPorNombreAsc;
function prodsPorNombreDesc() {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            let conexion = (0, utilidades_1.crearConexionDB)();
            conexion.connect();
            let resultadoConsulta = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.prodsPorNombreDesc);
            conexion.end();
            res((0, utilidades_1.quitarReferencia)(resultadoConsulta));
        }
        catch (err) {
            rej(`Error en la ejecucion de prodsPorNombreDesc(): ${err}`);
        }
    }));
}
exports.prodsPorNombreDesc = prodsPorNombreDesc;
function prodsPorPrecioAsc() {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            let conexion = (0, utilidades_1.crearConexionDB)();
            conexion.connect();
            let resultadoConsulta = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.prodsPorPrecioAsc);
            conexion.end();
            res((0, utilidades_1.quitarReferencia)(resultadoConsulta));
        }
        catch (err) {
            rej(`Error en la ejecucion de prodsPorPrecioAsc(): ${err}`);
        }
    }));
}
exports.prodsPorPrecioAsc = prodsPorPrecioAsc;
function prodsPorPrecioDesc() {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            let conexion = (0, utilidades_1.crearConexionDB)();
            conexion.connect();
            let resultadoConsulta = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.prodsPorPrecioDesc);
            conexion.end();
            res((0, utilidades_1.quitarReferencia)(resultadoConsulta));
        }
        catch (err) {
            rej(`Error en la ejecucion de prodsPorPrecioDesc(): ${err}`);
        }
    }));
}
exports.prodsPorPrecioDesc = prodsPorPrecioDesc;
function prodsPorCatAsc() {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            let conexion = (0, utilidades_1.crearConexionDB)();
            conexion.connect();
            let resultadoConsulta = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.prodsPorCatAsc);
            conexion.end();
            res((0, utilidades_1.quitarReferencia)(resultadoConsulta));
        }
        catch (err) {
            rej(`Error en la ejecucion de prodsPorCatAsc(): ${err}`);
        }
    }));
}
exports.prodsPorCatAsc = prodsPorCatAsc;
function prodsPorCatDesc() {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            let conexion = (0, utilidades_1.crearConexionDB)();
            conexion.connect();
            let resultadoConsulta = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.prodsPorCatDesc);
            conexion.end();
            res((0, utilidades_1.quitarReferencia)(resultadoConsulta));
        }
        catch (err) {
            rej(`Error en la ejecucion de prodsPorCatDesc(): ${err}`);
        }
    }));
}
exports.prodsPorCatDesc = prodsPorCatDesc;
// export function reseñasAsc(productoID: number) : Promise<reseña[]|string> {
//   return new Promise((res, rej): void => {
//     let conexion = crearConexionDB();
//     conexion.connect();
//     conexion.query(queries.reseñasAsc(productoID), 
//     (err: Error, result: Array<reseña>) => {
//       conexion.end()
//       if(err) rej(err)
//       if(!result.length) res('no hay sobre este producto... aun!')
//       res(result.map(elem => { return {...elem} }))
//     })
//   })
// }
function reseñasAsc(ProductoID) {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            let conexion = (0, utilidades_1.crearConexionDB)();
            conexion.connect();
            let resultadoConsulta = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.reseñasAsc(ProductoID));
            conexion.end();
            if (!resultadoConsulta.length)
                res('no hay comentarios sobre este producto... aun!');
            res((0, utilidades_1.quitarReferencia)(resultadoConsulta));
        }
        catch (err) {
            rej(`Error en la ejecucion de reseñasAsc: ${err}`);
        }
    }));
}
exports.reseñasAsc = reseñasAsc;
function reseñasDesc(ProductoID) {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            let conexion = (0, utilidades_1.crearConexionDB)();
            conexion.connect();
            let resultadoConsulta = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.reseñasDesc(ProductoID));
            conexion.end();
            if (!resultadoConsulta.length)
                res('no hay comentarios sobre este producto... aun!');
            res((0, utilidades_1.quitarReferencia)(resultadoConsulta));
        }
        catch (err) {
            rej(`Error en la ejecucion de reseñasDesc: ${err}`);
        }
    }));
}
exports.reseñasDesc = reseñasDesc;
function existeElAlias(aliasAComropbar) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                let conexion = (0, utilidades_1.crearConexionDB)();
                conexion.connect();
                let consultaResultado = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.existeElAlias(aliasAComropbar));
                if (consultaResultado.length)
                    rej(true);
                res(false);
            }
            catch (err) {
                console.log(`Error en la ejecucion de existeElAlias: ${err}`);
            }
        }));
    });
}
exports.existeElAlias = existeElAlias;
function existeElMail(mailAComprobar) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                let conexion = (0, utilidades_1.crearConexionDB)();
                conexion.connect();
                let consultaResultado = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.existeElMail(mailAComprobar));
                if (consultaResultado.length)
                    rej(true);
                res(false);
            }
            catch (err) {
                console.log(`Error en la ejecucion de existeElMail: ${err}`);
            }
        }));
    });
}
exports.existeElMail = existeElMail;
function registrar(datos) {
    return new Promise((res, rej) => {
        let conexion = (0, utilidades_1.crearConexionDB)('multiple');
        conexion.connect();
        (0, utilidades_1.hashearContraseña)(datos.contraseña)
            .then(hasheada => {
            conexion.query(queries_1.default.registrar(datos.Alias, datos.Nombres, datos.Apellido, (0, utilidades_1.revertirFecha)(datos.FechaNac), datos.edad, datos.email, datos.telefono, hasheada), (err, result) => {
                conexion.end();
                if (err)
                    rej('registro incorrecto'); // si el usuario ya se encontraba, entonces devolvera que la subquerie devolvio mas de una columna 
                res('registro correcto');
            });
        });
    });
}
exports.registrar = registrar;
function iniciarSesion(aliasUsuario, contraseña) {
    return new Promise((res, _rej) => {
        let conexion = (0, utilidades_1.crearConexionDB)();
        conexion.connect();
        conexion.query(queries_1.default.existeElUsuario(aliasUsuario), (err, resultado) => {
            if (err)
                throw new Error('error al realizar la querie que comprueba que existe el usuario y devuelve el id y contraseña');
            if (resultado.length === 0 || resultado.length > 1)
                throw new Error('no se ha encontrado el nombre de usuario (o se ha devuelto mas de un usuario)');
            (0, utilidades_1.chequearHash)(contraseña, resultado[0].Contraseña)
                .then(escorrecta => {
                if (!escorrecta)
                    throw new Error('el usuario existe, pero la contraseña es invalida');
                conexion.query(queries_1.default.devolverJWTData(aliasUsuario), (err, resultado) => {
                    if (err)
                        throw new Error('error al realizar la querie que devuelve los datos del jwt recibiendo el alias del usuario');
                    let datos = resultado.map((elem) => { return Object.assign({}, elem); })[0];
                    (0, utilidades_1.crearJWT)(datos)
                        .then(jwtstring => res(jwtstring));
                });
            });
        });
    });
}
exports.iniciarSesion = iniciarSesion;
