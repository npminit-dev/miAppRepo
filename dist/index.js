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
// reseñasAsc(106) 
//   .then(resultado => console.log(resultado))
// reseñasDesc()
// reseñasDesc(106)
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
const jwtusuario2 = {
    UsuarioID: 2,
    AliasUsuario: 'MyNewAlias',
    Nombres: 'Anita Maria',
    Apellido: 'Garcia Perez'
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
// obtener carrito
// (async () => {
//   try {
//     let carrito = await miCarrito(jwtdecodificado);
//     console.log(carrito)
//   } catch (err) {
//     console.log(err)
//   }
// })();
// obtener total del carrito
// (async() => {
//   try{
//     let total = await obtenerTotalCarrito(jwtdecodificado)
//     console.log(total)
//   } catch(err) {
//     console.log(err)
//   }
// })();
// agregar al carrito
// (async() => {
//   try {
//     let respuesta = await agregarAlCarrito(jwtusuario2, 136, 2)
//     console.log(respuesta)
//   } catch(err) {
//     console.log(err)
//   }
// })();
// vaciar carrito (usamos el jwt del usuario 2 declarado mas arriba)
// (async() => {
//   try {
//     let respuesta = await vaciarCarrito(jwtusuario2);
//     console.log(respuesta)
//   } catch(err) {
//     console.log(err)
//   } 
// })(); // volvemos a agregar los productos desde sql workbench
// modificar fecha de modificacion del carrito
// (async() => {
//   try {
//     let respuesta = await actualizarFechaModCarrito(jwtdecodificado)
//     console.log(respuesta)
//   } catch (err) {
//     console.log(err)
//   }
// })();
// mi reseña
// (async() => {
//   try {
//     let reseña = await miReseña(jwtusuario2, 153);
//     console.log(reseña)
//   } catch(err){
//     console.log(err);
//   }
// })();
// existe la puntuacion (esto sirve para validar las consultas posteriores)
// (async() => {
//   try {
//     let resultado = await existeLaPuntuacion(jwtusuario2, 153)
//     console.log(resultado)
//   } catch(err) {
//     console.log(err)
//   }
// })();
// insertar/modificar puntuacion (usamos la consulta anterior para validar que hacer en cada caso)
// (async () => {
//   try {
//     let existe = await existeLaPuntuacion(jwtusuario2, 112);
//     let resultado: string;
//     if(!existe) resultado = await insertarPuntuacion(jwtusuario2, 112, 2);
//     else resultado = await modificarPuntuacion(jwtusuario2, 112, 2);
//     console.log(resultado);
//   } catch(err) {
//     console.log(err)  
//   } 
// })();
// insertar/modificar comentario (la logica se encuentra en queries.ts):
// (async() => {
//   try {
//     let exito;
//     let respuesta = await validacionComentario(jwtdecodificado, 106) // validamos primero
//     if(respuesta[0] === 1) {
//       console.log(respuesta[1])
//       exito = await insertarComentario(jwtdecodificado, 106, 'no habia comentado anteriormente, no le doy 5 estrellas porque la chica que me atendio fue muy seca en el trato, por lo demas excelente servicio')
//       console.log(exito)
//     } 
//     if(respuesta[0] === 2) {
//       console.log(respuesta[1]) 
//       exito = await modificarComentario(jwtdecodificado, 106, 'no habia comentado anteriormente, no le doy 5 estrellas porque la chica que me atendio fue muy seca en el trato, por lo demas excelente servicio')
//       console.log(exito)
//     }
//   } catch(err) {
//     console.log(err)
//   }
// })();
app.listen(process.env.PORT || 3000);
console.log(`App Express escuchando en el puerto ${process.env.PORT || 3000}`);
