"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mimodulo_1 = __importDefault(require("./mismodulos/mimodulo"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: 'var_entorno.env' });
app.get('/', (req, res) => {
    res.send('this is the home page');
});
console.log((0, mimodulo_1.default)('Jorge'));
app.listen(process.env.PORT || 3000);
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`);
