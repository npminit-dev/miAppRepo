"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const ConsultasFuncts_1 = require("./mismodulos/ConsultasFuncts");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: 'var_entorno.env' }); // variables de entorno
app.use((0, cors_1.default)()); // modo cors
app.get('/', (req, res) => {
    res.send('this is the home page');
});
// Alias: string, Nombres: string, Apellido: string, FechaNac: string, Edad: number, Email: string, Telefono: string, ContraseñaHasheada: string
let reqbody = {
    Alias: 'monikkkkk',
    Nombres: 'Monica Belen',
    Apellido: 'Argento',
    FechaNac: '13-8-1990',
    edad: 33,
    email: 'monikakapa@hotmail.com',
    telefono: '+541176839009',
    contraseña: 'mimoniquitalaloquita'
};
(0, ConsultasFuncts_1.reseñasAsc)(153)
    .then((result) => console.log(result));
app.listen(process.env.PORT || 3000);
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`);
