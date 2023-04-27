"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosPorDefecto = void 0;
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../var_entorno.env' });
function crearConexionDB() {
    return mysql_1.default.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
    });
}
function productosPorDefecto() {
    return new Promise((res, rej) => {
        let conexion = crearConexionDB();
        conexion.connect();
        conexion.query('SELECT * FROM Producto', (err, result) => {
            if (err)
                rej(err);
            conexion.end();
            res(result.map(elem => { return Object.assign({}, elem); }));
        });
    });
}
exports.productosPorDefecto = productosPorDefecto;
