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
exports.modificarComentario = exports.insertarComentario = exports.validacionComentario = exports.modificarPuntuacion = exports.insertarPuntuacion = exports.existeLaPuntuacion = exports.miReseña = exports.actualizarFechaModCarrito = exports.vaciarCarrito = exports.agregarAlCarrito = exports.obtenerTotalCarrito = exports.miCarrito = exports.modificarMisDatos = exports.obtenerMisDatos = exports.iniciarSesion = exports.registrar = exports.existeElMail = exports.existeElAlias = exports.reseñasDesc = exports.reseñasAsc = exports.prodsPorCatDesc = exports.prodsPorCatAsc = exports.prodsPorPrecioDesc = exports.prodsPorPrecioAsc = exports.prodsPorNombreDesc = exports.prodsPorNombreAsc = exports.prodsPorDefecto = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const queries_1 = __importDefault(require("./queries"));
const utilidades_1 = require("./utilidades");
dotenv_1.default.config({ path: '../var_entorno.env' });
function prodsPorDefecto() {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            const conexion = (0, utilidades_1.crearConexionDB)();
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
            const conexion = (0, utilidades_1.crearConexionDB)();
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
            const conexion = (0, utilidades_1.crearConexionDB)();
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
            const conexion = (0, utilidades_1.crearConexionDB)();
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
            const conexion = (0, utilidades_1.crearConexionDB)();
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
            const conexion = (0, utilidades_1.crearConexionDB)();
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
            const conexion = (0, utilidades_1.crearConexionDB)();
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
function reseñasAsc(ProductoID) {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        try {
            const conexion = (0, utilidades_1.crearConexionDB)();
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
            const conexion = (0, utilidades_1.crearConexionDB)();
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
                const conexion = (0, utilidades_1.crearConexionDB)();
                conexion.connect();
                let consultaResultado = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.existeElAlias(aliasAComropbar));
                conexion.end();
                if (consultaResultado.length)
                    rej('El alias ya existe');
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
                const conexion = (0, utilidades_1.crearConexionDB)();
                conexion.connect();
                let consultaResultado = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.existeElMail(mailAComprobar));
                conexion.end();
                if (consultaResultado.length)
                    rej('El mail ya existe');
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
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)('multiple');
                conexion.connect();
                let hash = yield (0, utilidades_1.hashearContraseña)(datos.Contraseña);
                yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.registrar(datos.Alias, datos.Nombres, datos.Apellido, (0, utilidades_1.revertirFecha)(datos.FechaNac), datos.Edad, datos.Email, datos.Telefono, hash));
                conexion.end();
                res('registro correcto');
            }
            catch (err) {
                rej(`Error en la ejecucion de registrar: ${err}`);
            }
        }));
    });
}
exports.registrar = registrar;
function iniciarSesion(aliasUsuario, contraseña) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)();
                conexion.connect();
                let resultado = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.existeElUsuario(aliasUsuario));
                if (resultado.length === 0 || resultado.length > 1)
                    throw new Error('no se ha encontrado el nombre de usuario (o se ha devuelto mas de un usuario)');
                let esCorrecta = yield (0, utilidades_1.chequearHash)(contraseña, resultado[0].Contraseña);
                if (!esCorrecta)
                    throw new Error('el usuario existe, pero la contraseña es invalida');
                let jwtdatos = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.devolverJWTData(aliasUsuario));
                jwtdatos = (0, utilidades_1.quitarReferencia)(jwtdatos);
                let jwtcodificado = (0, utilidades_1.crearJWT)(jwtdatos[0]);
                conexion.end();
                res(jwtcodificado);
            }
            catch (err) {
                rej(`Error en la ejecucion de iniciarSesion: ${err}`);
            }
        }));
    });
}
exports.iniciarSesion = iniciarSesion;
// ahora debemos usar el jwt para estas funciones, debemos pasarlo como parametros ya decodificado:
function obtenerMisDatos(datos) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)();
                conexion.connect();
                let resultado = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.misDatos(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido));
                conexion.end();
                resultado = (0, utilidades_1.quitarReferencia)(resultado);
                res(resultado);
            }
            catch (err) {
                rej(`Error en la ejecucion de obtenerMisDatos: ${err}`);
            }
        }));
    });
}
exports.obtenerMisDatos = obtenerMisDatos;
function modificarMisDatos(datos, nuevosDatos) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)('multiple');
                conexion.connect();
                yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.modificarMisDatos(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido, ...nuevosDatos));
                conexion.end();
                let newJwtData = { UsuarioID: datos.UsuarioID, AliasUsuario: nuevosDatos[0], Nombres: nuevosDatos[1], Apellido: nuevosDatos[2] };
                let newjwt = yield (0, utilidades_1.crearJWT)(newJwtData);
                res(newjwt);
            }
            catch (err) {
                rej(`Error en la ejecucion de modificarMisDatos: ${err}`);
            }
        }));
    });
}
exports.modificarMisDatos = modificarMisDatos;
function miCarrito(datos) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)();
                conexion.connect();
                let carrito = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.miCarrito(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido));
                conexion.end();
                carrito = (0, utilidades_1.quitarReferencia)(carrito);
                res(carrito);
            }
            catch (err) {
                rej(`Error en la ejecucion de miCarrito: ${err}`);
            }
        }));
    });
}
exports.miCarrito = miCarrito;
function obtenerTotalCarrito(datos) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)('multiple');
                conexion.connect();
                let total = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.totalMiCarrito(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido));
                if (!total.length)
                    res(0.0);
                total = (0, utilidades_1.quitarReferencia)(total);
                conexion.end();
                res(total[0].Total_Carrito);
            }
            catch (err) {
                rej(`Error en la ejecucion de obtenerTotalCarrito: ${err}`);
            }
        }));
    });
}
exports.obtenerTotalCarrito = obtenerTotalCarrito;
function agregarAlCarrito(datos, productoID, cantidad) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)('multiple');
                conexion.connect();
                yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.agregarAlCarrito(datos.UsuarioID, productoID, cantidad));
                conexion.end();
                res('agregado');
            }
            catch (err) {
                rej(`Error en la ejecucion de agregarAlCarrito: ${err}`);
            }
        }));
    });
}
exports.agregarAlCarrito = agregarAlCarrito;
function vaciarCarrito(datos) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)('multiple');
                conexion.connect();
                yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.vaciarMiCarrito(datos.UsuarioID));
                conexion.end();
                res('vaciado');
            }
            catch (err) {
                rej(`Error en la ejecucion de vaciarCarrito: ${err}`);
            }
        }));
    });
}
exports.vaciarCarrito = vaciarCarrito;
function actualizarFechaModCarrito(datos) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)();
                conexion.connect();
                yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.actualizarFechaModCarrito(datos.UsuarioID));
                conexion.end();
                res('fecha de modificacion del carrito actualizada');
            }
            catch (err) {
                rej(`Error en la ejecucion de actualizarFechaModCarrito: ${err}`);
            }
        }));
    });
}
exports.actualizarFechaModCarrito = actualizarFechaModCarrito;
function miReseña(datos, productoID) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)();
                conexion.connect();
                let reseña = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.miReseña(datos.UsuarioID, datos.AliasUsuario, datos.Nombres, datos.Apellido, productoID));
                reseña = (0, utilidades_1.quitarReferencia)(reseña);
                if (reseña.length === 0)
                    res('el usuario no ha reseñado el producto');
                if (reseña.length > 1)
                    throw new Error('se ha devuelto mas de 1 reseña (y eso es malo)');
                conexion.end();
                res(reseña[0]);
            }
            catch (err) {
                rej(`Error en la ejecucion de miReseña: ${err}`);
            }
        }));
    });
}
exports.miReseña = miReseña;
function existeLaPuntuacion(datos, productoID) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)();
                conexion.connect();
                let resultado = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.existeLaPuntuacion(datos.UsuarioID, productoID));
                resultado = (0, utilidades_1.quitarReferencia)(resultado);
                conexion.end();
                if (!resultado.length)
                    res(false);
                if (resultado.length > 1)
                    throw new Error('se ha devuelto mas de una puntuacion del usuario con respecto al producto');
                else
                    res(true);
            }
            catch (err) {
                rej(`Error en la ejecucion de existeLaPuntuacion: ${err}`);
            }
        }));
    });
}
exports.existeLaPuntuacion = existeLaPuntuacion;
function insertarPuntuacion(datos, productoID, puntuacion) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)('multiple');
                conexion.connect();
                yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.insertarPuntuacion(datos.UsuarioID, productoID, puntuacion));
                conexion.end();
                res('puntuacion añadida');
            }
            catch (err) {
                rej(`Error en la ejecucion de insertarPuntuacion: ${err}`);
            }
        }));
    });
}
exports.insertarPuntuacion = insertarPuntuacion;
function modificarPuntuacion(datos, productoID, puntuacion) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)('multiple');
                conexion.connect();
                yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.modificarPuntuacion(datos.UsuarioID, productoID, puntuacion));
                conexion.end();
                res('puntuacion modificada');
            }
            catch (err) {
                rej(`Error en la ejecucion de modificarPuntuacion: ${err}`);
            }
        }));
    });
}
exports.modificarPuntuacion = modificarPuntuacion;
function validacionComentario(datos, productoID) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)('multiple');
                conexion.connect();
                let resultado = yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.validacionComentario(datos.UsuarioID, productoID));
                conexion.end();
                resultado = (0, utilidades_1.quitarReferencia)(resultado);
                if (!resultado.length)
                    throw new Error('no se puede comentar sin haber puntuado antes');
                if (resultado.length > 1)
                    throw new Error('se ha devuelto mas de un comentario');
                if (!resultado[0].Comentario)
                    res([1, 'existe la puntuacion pero no el comentario, se agregara un comentario nuevo']);
                else
                    res([2, 'existe la puntuacion y el comentario, se modificara el comentario']);
            }
            catch (err) {
                rej(`Error en la ejecucion de validacionComentario: ${err}`);
            }
        }));
    });
}
exports.validacionComentario = validacionComentario;
function insertarComentario(datos, productoID, comentario) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)('multiple');
                conexion.connect();
                yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.comentarioNuevo(datos.UsuarioID, productoID, comentario));
                res('nuevo comentario insertado');
                conexion.end();
            }
            catch (err) {
                rej(`Error en la ejecucion de insertarComentario: ${err}`);
            }
        }));
    });
}
exports.insertarComentario = insertarComentario;
function modificarComentario(datos, productoID, comentario) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            try {
                const conexion = (0, utilidades_1.crearConexionDB)('multiple');
                conexion.connect();
                yield (0, utilidades_1.SQLQuery)(conexion, queries_1.default.modificarComentario(datos.UsuarioID, productoID, comentario));
                conexion.end();
                res('comentario modificado');
            }
            catch (err) {
                rej(`Error en la ejecucion de modificarComentario: ${err}`);
            }
        }));
    });
}
exports.modificarComentario = modificarComentario;
