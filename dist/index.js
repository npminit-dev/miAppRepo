"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prods_1 = __importDefault(require("./routers/prods"));
const cuenta_1 = __importDefault(require("./routers/cuenta"));
const usuario_1 = __importDefault(require("./routers/usuario"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_2.default)();
// utilidades del proyecto
dotenv_1.default.config({ path: 'var_entorno.env' }); // variables de entorno
app.use((0, morgan_1.default)('dev')); // morgan para obtener informacion de las solicitudes
app.use((0, cors_1.default)()); // modo cors
app.use(express_2.default.json()); // permite interpretar JSON que provienen de las solicitudes 
app.use(express_2.default.text()); // permite interpretar texto que provienen de las solicitudes 
// controladores sobre productos y reseñas (usuarios sin inicio de sesion)
app.use(prods_1.default);
// controladores sobre creacion, sesion, modificacion de cuentas y datos de cuentas
const accControlRouter = (0, express_1.Router)();
accControlRouter.post('/usuarios/registrar', cuenta_1.default.registrar_Controlador);
accControlRouter.post('/usuarios/iniciarsesion', cuenta_1.default.iniciarSesion_Controlador);
// usuario 1 jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc3VhcmlvSUQiOjEsIkFsaWFzVXN1YXJpbyI6Ik5pY29UaGVGdWNraW5nS2luZzIiLCJOb21icmVzIjoiTmljb2xhcyBNYXJpYW5vIiwiQXBlbGxpZG8iOiJHb256YWxleiIsImlhdCI6MTY4NDU4NzExMSwiZXhwIjoxNjg1ODgzMTExfQ.PIui2lrZDaLTTnvAefWPu-mva7_IP17_WE8RCTdjmA4
accControlRouter.post('/usuarios/misdatos', cuenta_1.default.datosCuenta_Controlador);
/* // formato del body para modificar:
[
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc3VhcmlvSUQiOjEsIkFsaWFzVXN1YXJpbyI6Ik5pY29UaGVGdWNraW5nS2luZzIiLCJOb21icmVzIjoiTmljb2xhcyBSaWNhcmRvIiwiQXBlbGxpZG8iOiJHb256YWxleiIsImlhdCI6MTY4NDU3ODg4MCwiZXhwIjoxNjg1ODc0ODgwfQ.oCR5JBFT9GTbtiOGhlxmpqbr5pDAdfLgZ0dVVl1xzOk"
  ,
  [
    "Nicolas Ricardo",
    "Gonzalez",
    "4-7-1996",
    27,
    "431-1123-111"
  ]
]
*/
accControlRouter.put('/usuarios/modificar', cuenta_1.default.modificarDatos_Controlador);
app.use(accControlRouter);
// tener en cuenta que al modificar los datos de usuario los tokens viejos pueden no volver a funcionar
// controladores de carrito, producto y reseñas
app.use(usuario_1.default);
// usuario 7 jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc3VhcmlvSUQiOjcsIkFsaWFzVXN1YXJpbyI6IkZyYW5jaXNGb3JkQ29wcG9sYSIsIk5vbWJyZXMiOiJGcmFuY2lzY28gSmF2aWVyIiwiQXBlbGxpZG8iOiJTY2h3YXJ0em1hbm4iLCJpYXQiOjE2ODQ2Mzk3NTIsImV4cCI6MTY4NTkzNTc1Mn0.-dpwKByxQIqsKSbkTUyrL6mqMoPvuNplja8vBZoJGaA
app.listen(process.env.PORT || 3000);
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`);
