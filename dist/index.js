"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const ConsultasFuncts_1 = require("./mismodulos/ConsultasFuncts");
const app = (0, express_1.default)();
dotenv_1.default.config({ path: 'var_entorno.env' });
app.get('/', (req, res) => {
    res.send('this is the home page');
});
(0, ConsultasFuncts_1.productosPorDefecto)()
    .then(res => console.log(res[0]))
    .catch(err => console.log(err));
app.listen(process.env.PORT || 3000);
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`);
