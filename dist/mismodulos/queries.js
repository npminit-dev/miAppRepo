"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prodsPorDefecto = 'SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion FROM Producto p, Producto_Imagenes p_img WHERE p.ProductoID = p_img.ProductoID;';
const prodsPorNombreAsc = 'SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover FROM Producto p INNER JOIN Producto_Imagenes pi ON p.ProductoID = pi.ProductoID ORDER BY NombreProducto ASC;';
const prodsPorNombreDesc = 'SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover FROM Producto p INNER JOIN Producto_Imagenes pi ON p.ProductoID = pi.ProductoID ORDER BY NombreProducto DESC;';
const prodsPorPrecioAsc = 'SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover FROM Producto p INNER JOIN Producto_Imagenes pi ON p.ProductoID = pi.ProductoID ORDER BY Precio ASC;';
const prodsPorPrecioDesc = 'SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover FROM Producto p INNER JOIN Producto_Imagenes pi ON p.ProductoID = pi.ProductoID ORDER BY Precio DESC;';
const prodsPorCatAsc = 'SELECT prods.ProductoID, prods.CategoriaID, prods.NombreProducto, prods.Precio, prods.Descripcion, prods.Imagen, prods.Imagen_Hover, prods.Miniatura, prods.Miniatura_Hover FROM (SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover FROM Producto p INNER JOIN Producto_Imagenes pi ON p.ProductoID = pi.ProductoID) AS prods LEFT JOIN Categoria cat ON prods.categoriaID = cat.categoriaID ORDER BY ISNULL(cat.IndiceCalidad), cat.IndiceCalidad ASC;';
const prodsPorCatDesc = 'SELECT prods.ProductoID, prods.CategoriaID, prods.NombreProducto, prods.Precio, prods.Descripcion, prods.Imagen, prods.Imagen_Hover, prods.Miniatura, prods.Miniatura_Hover FROM (SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover FROM Producto p INNER JOIN Producto_Imagenes pi ON p.ProductoID = pi.ProductoID) AS prods LEFT JOIN Categoria cat ON prods.categoriaID = cat.categoriaID ORDER BY ISNULL(cat.IndiceCalidad), cat.IndiceCalidad DESC;';
const reseñasPorDefecto = (ProductoID) => `
SELECT reseñas.ProductoID, us.AliasUsuario, reseñas.Puntuacion, reseñas.Cuerpo Comentario, reseñas.FechaEmision
FROM Usuario us RIGHT JOIN
(SELECT ProductoID, UsuarioID, Puntuacion, Cuerpo, FechaEmision
FROM Puntuacion punt LEFT JOIN Comentario com
ON punt.ComentarioID = com.ComentarioID) reseñas
ON reseñas.UsuarioID = us.UsuarioID
WHERE reseñas.ProductoID = ${ProductoID};`;
const reseñasAsc = (ProductoID) => `
SELECT reseñas.ProductoID, us.AliasUsuario, reseñas.Puntuacion, reseñas.Cuerpo, reseñas.FechaEmision
FROM Usuario us RIGHT JOIN
(SELECT ProductoID, UsuarioID, Puntuacion, Cuerpo, FechaEmision
FROM Puntuacion punt LEFT JOIN Comentario com
ON punt.ComentarioID = com.ComentarioID) reseñas
ON reseñas.UsuarioID = us.UsuarioID
WHERE reseñas.productoID = ${ProductoID}
ORDER BY FechaEmision ASC;`;
const reseñasDesc = (ProductoID) => `
SELECT reseñas.ProductoID, us.AliasUsuario, reseñas.Puntuacion, reseñas.Cuerpo, reseñas.FechaEmision
FROM Usuario us RIGHT JOIN
(SELECT ProductoID, UsuarioID, Puntuacion, Cuerpo, FechaEmision
FROM Puntuacion punt LEFT JOIN Comentario com
ON punt.ComentarioID = com.ComentarioID) reseñas
ON reseñas.UsuarioID = us.UsuarioID
WHERE reseñas.ProductoID = ${ProductoID}
ORDER BY FechaEmision DESC;`;
// registrarse: 
// en el body de la consulta se reciben los datos necesarios para el registro, estos deben procesarse
// consta de varias consultas, primero hay que verificar que el alias de usuario no exista, y luego que el mail este disponible, si ambos estan disponibles se procede al registro
const existeElAlias = (AliasAComprobar) => `SELECT AliasUsuario FROM Usuario WHERE AliasUsuario = '${AliasAComprobar}';`;
const existeElMail = (MailAComprobar) => `SELECT Email FROM Usuario WHERE Email = '${MailAComprobar}';`;
// una vez comprobemos que ambas consultas devuelven consulta vacia (porque estan disponibles) procedemos al registro
// esta consta del insert en la tabla usuarios y de la creacion automatica de un carrito en la tabla Carritos para el usuario recien registrado
const registrar = (Alias, Nombres, Apellido, FechaNac, Edad, Email, Telefono, ContraseñaHasheada) => `
BEGIN;
INSERT INTO Usuario 
( AliasUsuario, Nombres, Apellido, FechaDeNacimiento, Edad, Email, Telefono, FechaDeRegistro, Contraseña )
VALUES
( '${Alias}', '${Nombres}', '${Apellido}', '${FechaNac}', ${Edad}, 
'${Email}', '${Telefono}', CURDATE(), '${ContraseñaHasheada}' );
INSERT INTO Carrito (UsuarioID, UltimaModificacion) VALUES (
 (SELECT UsuarioID FROM Usuario WHERE AliasUsuario = '${Alias}' AND Email = '${Email}'),
 NOW()
);
COMMIT;`;
// para iniciar sesion del usuario:
// comprobamos si el usuario existe, si existe devolvera el UsuarioID y la contraseña cifrada asociada
const existeElUsuario = (AliasUsuario) => `
SELECT UsuarioID, Contraseña FROM Usuario
WHERE AliasUsuario = '${AliasUsuario}';`;
// en este paso debemos comprobar si la contraseña del usuario (recibida desde el body de la request junto con el alias) matchea con la contraseña hasheada de la base de datos
// en caso afirmativo hacemos la consulta que devuelve los datos que necesitamos para el jwt:
const devolverJWTData = (AliasUsuario) => `
SELECT UsuarioID, AliasUsuario, Nombres, Apellido 
FROM Usuario WHERE AliasUsuario = '${AliasUsuario}';`;
// una vez creado el JWT, lo usamos para hacer el resto de consultas:
// obtener mis datos
const misDatos = (UsuarioID, AliasUsuario, Nombres, Apellido) => `
SELECT Nombres, Apellido, FechaDeNacimiento, Edad, EMail, Telefono, FechaDeRegistro FROM Usuario 
WHERE us.UsuarioID = ${UsuarioID} AND us.AliasUsuario = '${AliasUsuario}' AND us.Nombres = '${Nombres}' AND us.Apellido = '${Apellido}';`;
// modificar mis datos
// debemos reutilizar las funciones existeElAlias() y existeElMail() para verificar si el nuevo alias y el nuevo mail estan disponibles
// una vez verificado hacemos el update de la tabla Usuarios (La contraseña y la fecha de registro no pueden modificarse por esta consulta)
const modificarMisDatos = (UsuarioID, AliasUsuario, NombresUsuario, ApellidoUsuario, NAlias, NNombres, NApellido, NFechaDeNacimiento, NEdad, NEmail, NTelefono) => `
BEGIN;
UPDATE Usuario SET AliasUsuario = '${NAlias}', Nombres = '${NNombres}', Apellido = '${NApellido}', 
FechaDeNAcimiento = '${NFechaDeNacimiento}', Edad = ${NEdad}, Email = '${NEmail}', Telefono = '${NTelefono}'
WHERE UsuarioID = ${UsuarioID} AND AliasUsuario = '${AliasUsuario}' AND Nombres = '${NombresUsuario}' AND Apellido = '${ApellidoUsuario}'; 
COMMIT;`;
// obtener carrito
const miCarrito = (UsuarioID, AliasUsuario, Nombres, Apellido) => `
SELECT carrs.ProductoID, Prod.NombreProducto, Prod.Precio PrecioXUnidad, Cantidad FROM
(SELECT carr.CarritoID, carr.UsuarioID, ProductoID, Cantidad FROM Carrito carr
INNER JOIN Carrito_Detalles carr_dets
ON carr.CarritoID = carr_dets.CarritoID) AS carrs 
LEFT JOIN Usuario us ON us.UsuarioID = carrs.UsuarioID
LEFT JOIN Producto prod ON carrs.ProductoID = prod.ProductoID
WHERE us.UsuarioID = ${UsuarioID} AND us.AliasUsuario = '${AliasUsuario}' AND us.Nombres = '${Nombres}' AND us.Apellido = '${Apellido}';`;
// obtener precio total del carrito
const totalMiCarrito = (UsuarioID, AliasUsuario, Nombres, Apellido) => `
SELECT SUM(carr_det.Cantidad * p.Precio) Total_Carrito FROM Usuario us
RIGHT JOIN Carrito carr ON us.UsuarioID = carr.UsuarioID
RIGHT JOIN Carrito_Detalles carr_det ON carr.CarritoID = carr_det.CarritoID
LEFT JOIN Producto p ON p.ProductoID = carr_det.ProductoID
WHERE us.UsuarioID = ${UsuarioID} AND us.AliasUsuario = '${AliasUsuario}' AND us.Nombres = '${Nombres}' AND us.Apellido = '${Apellido}';
GROUP BY us.UsuarioID, carr.CarritoID;`;
// agregar producto al carrito
const agregarAlCarrito = (UsuarioID, ProductoID, Cantidad) => `
BEGIN;
INSERT INTO Carrito_Detalles (CarritoID, ProductoID, Cantidad) VALUES (
 (SELECT carr.CarritoID FROM Carrito carr, Usuario us WHERE carr.UsuarioID = us.UsuarioID AND us.UsuarioID = ${UsuarioID}),
 ${ProductoID}, ${Cantidad}
);
COMMIT;`;
// vaciar carrito
const vaciarMiCarrito = (UsuarioID) => `
BEGIN;
DELETE Carrito_Detalles FROM Carrito_Detalles 
INNER JOIN Carrito carr ON Carrito_Detalles.CarritoID = carr.CarritoID
WHERE carr.UsuarioID = ${UsuarioID};
COMMIT;`;
// actualizar ultima fecha de modificacion del carrito
const actualizarFechaModCarrito = (UsuarioID) => `
UPDATE Carrito SET UltimaModificacion = NOW()
WHERE UsuarioID = ${UsuarioID};`;
// obtener la reseña del usuario sobre cierto producto
const miReseña = (UsuarioID, AliasUsuario, Nombres, Apellido, ProductoID) => `
SELECT us.AliasUsuario, punt.Puntuacion, com.Cuerpo, punt.FechaEmision FROM Usuario us
INNER JOIN Puntuacion punt ON us.UsuarioID = punt.UsuarioID
LEFT JOIN Producto p ON p.ProductoID = punt.ProductoID
LEFT JOIN Comentario com ON com.ComentarioID = punt.ComentarioID
WHERE us.UsuarioID = ${UsuarioID} AND us.AliasUsuario = '${AliasUsuario}' AND us.Nombres = '${Nombres}' AND us.Apellido = '${Apellido}'
AND p.ProductoID = ${ProductoID};`;
// insertar/modificar puntuacion
// debemos verificar si ya existe una puntuacion del usuario hacia el producto especificado
const existeLaPuntuacion = (UsuarioID, ProductoID) => `SELECT Puntuacion FROM Puntuacion WHERE UsuarioID = ${UsuarioID} AND ProductoID = ${ProductoID};`;
// si no existe (porque la consulta anterior devolvio consulta vacia) lo insertamos:
const insertarPuntuacion = (UsuarioID, ProductoID, Puntuacion) => `
BEGIN;
INSERT INTO Puntuacion (UsuarioID, ProductoID, Puntuacion, FechaEmision, ComentarioID) VALUES 
(${UsuarioID}, ${ProductoID}, ${Puntuacion}, CURDATE(), NULL);
COMMIT;`;
// si existe, modificamos:
const modificarPuntuacion = (UsuarioID, ProductoID) => `
BEGIN;
UPDATE Puntuacion punt SET Puntuacion = 2, FechaEmision = CURDATE()
WHERE punt.UsuarioID = ${UsuarioID} AND ProductoID = ${ProductoID};
COMMIT;`;
// insertar/modificar comentario
// para comentar es necesario tener una puntuacion del usuario sobre el producto que se desea comentar
// usamos esta funcion para saber si ya hay una puntuacion pero no un comentario, si hay una puntuacion y tambien un comentario, o si no hay puntuacion ni comentario
const validacionComentario = (UsuarioID, ProductoID) => `
SELECT Cuerpo Comentario, punt.UsuarioID FROM Comentario com
RIGHT JOIN Puntuacion punt ON punt.ComentarioID = com.ComentarioID 
WHERE punt.UsuarioID = ${UsuarioID} AND punt.ProductoID = ${ProductoID};`;
// si validacionComentario devuelve una fila, pero el campo Comentario es NULL, entonces la puntuacion existe pero el comentario no, entonces agregamos el comentario
const comentarioNuevo = (UsuarioID, ProductoID, Comentario) => `
BEGIN;
INSERT INTO Comentario (Cuerpo) VALUES ('${Comentario}');
UPDATE Puntuacion punt SET ComentarioID = LAST_INSERT_ID()
WHERE punt.UsuarioID = ${UsuarioID} AND punt.ProductoID = ${ProductoID};
COMMIT;`;
// si validacionComentario devuelve una fila con el campo Comentario no nulo, entonces el comentario existe. Modificamos
const modificarComentario = (UsuarioID, ProductoID, Comentario) => `
BEGIN;
UPDATE Comentario com RIGHT JOIN Puntuacion punt
ON com.ComentarioID = punt.ComentarioID
SET Cuerpo = '${Comentario}'
WHERE punt.UsuarioID = ${UsuarioID} AND punt.ProductoID = ${ProductoID};
COMMIT;`;
// Si validacionComentario devuelve una consulta vacia, la puntuacion no existe, por lo que no se puede comentar ni modificar un comentario
exports.default = {
    prodsPorDefecto,
    prodsPorNombreAsc,
    prodsPorNombreDesc,
    prodsPorPrecioAsc,
    prodsPorPrecioDesc,
    prodsPorCatAsc,
    prodsPorCatDesc,
    reseñasPorDefecto,
    reseñasAsc,
    reseñasDesc,
    existeElAlias,
    existeElMail,
    registrar,
    existeElUsuario,
    devolverJWTData,
    misDatos,
    modificarMisDatos,
    miCarrito,
    totalMiCarrito,
    agregarAlCarrito,
    vaciarMiCarrito,
    actualizarFechaModCarrito,
    miReseña,
    existeLaPuntuacion,
    insertarPuntuacion,
    modificarPuntuacion,
    validacionComentario,
    comentarioNuevo,
    modificarComentario,
};
