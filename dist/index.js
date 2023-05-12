"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config({ path: 'var_entorno.env' }); // variables de entorno
app.use((0, cors_1.default)()); // modo cors
app.get('/', (req, res) => {
    res.send('this is the home page');
});
// TESTING
// prodsPorDefecto:
// prodsPorDefecto()
//   .then(resultado => console.log(resultado))
// prodsPorNombreAsc
// prodsPorNombreAsc()
//   .then(resultado => console.log(resultado))
// prodsPorPrecioAsc
// prodsPorPrecioAsc()
//   .then(resultado => console.log(resultado))
// prodsPorPrecioDesc
// prodsPorPrecioDesc()
//   .then(resultado => console.log(resultado))
// prodsPorCatAsc
// prodsPorCatAsc()
//   .then(resultado => console.log(resultado))
// prodsPorCatDesc
// prodsPorCatDesc()
//   .then(resultado => console.log(resultado))
// reseñasAsc()
// reseñasAsc(152) 
//   .then(resultado => console.log(resultado))
// reseñasDesc()
// reseñasDesc(153)
//   .then(resultado => console.log(resultado))
// existeElAlias() (si existe devolvera la promesa rechazada, por lo que debemos capturar el error con un .catch() en el caso de usar la sintaxis de then
// o con un try/catch en caso de usar async/await)
// En TypeScript, puedes crear una función flecha ejecutada inmediatamente (también conocida como IIFE, Immediately Invoked Function Expression) utilizando el siguiente formato:
// (async () => {
//   try{
//     let resultado = await existeElAlias('NicoTheKing');
//     console.log(resultado)
//   } catch (err) {
//     console.log(err)
//   }
// })();
// existeElMail()
// ( async () => {
//   try {
//     let resultado = await existeElMail('Abaddd@gmail.com')
//     console.log(resultado)
//   } catch (err) {
//     console.log(err)
//   }
// })();
// registrar() creamos un objeto (haciendo las veces de)
// const datos: datosRegistro = {
//   Alias: 'monikkkk',
//   Nombres: 'Monica Lucia', 
//   Apellido: 'Gonzalez', 
//   FechaNac: '14-08-1993', 
//   Edad: 33, 
//   Email: 'monicaLuciAAA@gmail.com', 
//   Telefono: '+5411326577', 
//   Contraseña: 'moniquitalaloquita'
// };
// (async () => {
//   try{
//     let fueExitoso = await registrar(datos);
//     console.log(fueExitoso)
//   } catch(err){
//     console.log(err)
//   }
// })();
// iniciarSesion()
// en este ejemplo se inicia sesion con alias y contraseña usando la funcion iniciarSesion(), si esta es correcta se devuelve el JWT, 
// encadenandola con verificarJWT esta verifica la validez del token, lo decodifica y lo devuelve
// (async () => {
//   try{
//     console.log('holaaaa')
//     let jsonwebt = await iniciarSesion('NicoTheKing', 'NicolasElCapo')
//     if(!jsonwebt) jsonwebt = ''
//     console.log(jsonwebt)
//     let decodificado = await verificarYDecodificarJWT(jsonwebt)
//     console.log(decodificado)
//   } catch(err) {
//     console.log(err) 
//   }
// })(); 
const jwtdecodificado = {
    UsuarioID: 1,
    AliasUsuario: 'NicoTheFuckingKing2',
    Nombres: 'Nicolas Ricardo',
    Apellido: 'Gonzalez',
    iat: 1683916048,
    exp: 1685212048
};
// obtener mis datos
// (async() => {
//   try{
//     let datos = await obtenerMisDatos(jwtdecodificado);
//     console.log(datos)
//   } catch(err) {
//     console.log(err)
//   }
// })();
// modificar datos
// datos nuevos:
// const datosNuevos: tuplaNuevosDatos = ['NicoTheFuckingKing2', 'Nicolas Ricardo', 'Gonzalez', '23-02-1995', 31, 'NicoThecapoo@gmail.com', '431-1123-111'];
// datosNuevos[3] = revertirFecha(datosNuevos[3]);
// (async() => {
//   try {
//     let resultado = await modificarMisDatos(jwtdecodificado, datosNuevos); // esto devolvera un nuevo JWT que represente los datos cambiados
//     console.log(resultado); 
//     if(!resultado) resultado = ''
//     let decoded = await verificarYDecodificarJWT(resultado) // lo decodificamos para verificar que los datos se aplicaron
//     console.log(decoded)
//   } catch(err) {
//     console.log(err)
//   }
// })()
// // obtener total del carrito
// (async() => {
//   try{
//     let total = await obtenerTotalCarrito(jwtdecodificado)
//     console.log(total)
//   } catch(err) {
//     console.log(err)
//   }
// })() 
app.listen(process.env.PORT || 3000);
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`);
