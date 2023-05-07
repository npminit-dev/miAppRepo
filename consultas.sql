USE mydb;
SELECT * FROM Producto; 
SELECT * FROM Producto_Imagenes; 
SELECT * FROM Usuario; 
SELECT * FROM Carrito; 
SELECT * FROM Carrito_Detalles; 
SELECT * FROM Categoria; 
SELECT * FROM Puntuacion; 
SELECT * FROM Comentario; 

-- consultas sin escritura ni modificacion de registros

-- productos:

-- productos y sus imagenes en orden por defecto
SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover 
FROM Producto p, Producto_Imagenes p_img
WHERE p.ProductoID = p_img.ProductoID;

-- productos y sus imagenes correspondientes ordenadas por nombre de forma ascendente
SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover
FROM Producto p INNER JOIN Producto_Imagenes pi ON p.ProductoID = pi.ProductoID
ORDER BY NombreProducto ASC;

-- productos y sus imagenes correspondientes ordenadas por nombre de forma descendente
SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover
FROM Producto p INNER JOIN Producto_Imagenes pi ON p.ProductoID = pi.ProductoID
ORDER BY NombreProducto DESC;

-- productos y sus imagenes ordenados por precio de forma ascendente
SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover
FROM Producto p INNER JOIN Producto_Imagenes pi ON p.ProductoID = pi.ProductoID
ORDER BY Precio ASC;

-- productos y sus imagenes ordenados por precio de forma descendente
SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover
FROM Producto p INNER JOIN Producto_Imagenes pi ON p.ProductoID = pi.ProductoID
ORDER BY Precio DESC;

-- productos y sus imagenes correspondientes ordenadas por categoria de forma ascendente
SELECT prods.ProductoID, prods.CategoriaID, prods.NombreProducto, prods.Precio, prods.Descripcion, prods.Imagen, prods.Imagen_Hover, prods.Miniatura, prods.Miniatura_Hover 
FROM
(SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover
 FROM Producto p INNER JOIN Producto_Imagenes pi
 ON p.ProductoID = pi.ProductoID) AS prods
LEFT JOIN Categoria cat 
ON prods.categoriaID = cat.categoriaID
ORDER BY ISNULL(cat.IndiceCalidad), cat.IndiceCalidad ASC;

-- productos y sus imagenes correspondientes ordenadas por categoria de forma descendente
SELECT prods.ProductoID, prods.CategoriaID, prods.NombreProducto, prods.Precio, prods.Descripcion, prods.Imagen, prods.Imagen_Hover, prods.Miniatura, prods.Miniatura_Hover 
FROM
(SELECT p.ProductoID, CategoriaID, NombreProducto, Precio, Descripcion, Imagen, Imagen_Hover, Miniatura, Miniatura_Hover
 FROM Producto p INNER JOIN Producto_Imagenes pi
 ON p.ProductoID = pi.ProductoID) AS prods
LEFT JOIN Categoria cat 
ON prods.categoriaID = cat.categoriaID
ORDER BY ISNULL(cat.IndiceCalidad), cat.IndiceCalidad DESC;


-- reseñas y comentarios (sin inicio de sesion)

-- De un producto determinado, se obtiene una lista de reseñas que se compone de:
-- El nombre del usuario autor, la puntuacion, comentario (si lo hubiese) y la fecha de emision, ordenados por defecto
SELECT reseñas.ProductoID, us.AliasUsuario, reseñas.Puntuacion, reseñas.Cuerpo Comentario, reseñas.FechaEmision
FROM Usuario us RIGHT JOIN
(SELECT ProductoID, UsuarioID, Puntuacion, Cuerpo, FechaEmision
FROM Puntuacion punt LEFT JOIN Comentario com
ON punt.ComentarioID = com.ComentarioID) reseñas
ON reseñas.UsuarioID = us.UsuarioID
WHERE reseñas.ProductoID = 153;

-- reseñas y comentarios ordenados por fecha de forma ascendente
SELECT reseñas.ProductoID, us.AliasUsuario, reseñas.Puntuacion, reseñas.Cuerpo, reseñas.FechaEmision
FROM Usuario us RIGHT JOIN
(SELECT ProductoID, UsuarioID, Puntuacion, Cuerpo, FechaEmision
FROM Puntuacion punt LEFT JOIN Comentario com
ON punt.ComentarioID = com.ComentarioID) reseñas
ON reseñas.UsuarioID = us.UsuarioID
WHERE reseñas.productoID = 153
ORDER BY FechaEmision ASC;

-- ahora de forma descendente
SELECT reseñas.ProductoID, us.AliasUsuario, reseñas.Puntuacion, reseñas.Cuerpo, reseñas.FechaEmision
FROM Usuario us RIGHT JOIN
(SELECT ProductoID, UsuarioID, Puntuacion, Cuerpo, FechaEmision
FROM Puntuacion punt LEFT JOIN Comentario com
ON punt.ComentarioID = com.ComentarioID) reseñas
ON reseñas.UsuarioID = us.UsuarioID
WHERE reseñas.ProductoID = 153
ORDER BY FechaEmision DESC;


-- usuarios:

-- para iniciar sesion, el cliente provee el alias y la contraseña. 
-- Primero se devuelve la contraseña codificada correspondiente al usuario proporcionado (si existiese)
SELECT UsuarioID, Contraseña FROM Usuario
WHERE AliasUsuario = 'NicoTheKing'; -- si el usuario no existe el inicio de sesion debe lanzar un error

-- se contrasta la contraseña codificada devuelta con la contraseña no codificada proporcionada por el usuario
-- si coincide, se devuelven los datos del usuario excepto la contraseña, con estos datos se creara el jsonwebtoken
SELECT UsuarioID, AliasUsuario, Nombres, Apellido -- datos del jsonwebtoken (si se encuentra el nombre de usuario)
FROM Usuario WHERE AliasUsuario = 'NicoTheKing';

-- a partir de aqui se usaran los datos del jsonwebtoken para realizar las operaciones del usuario

-- Carrito

-- Obtener carrito de un usuario teniendo los datos del jwt
SELECT carrs.ProductoID, Prod.NombreProducto, Cantidad FROM
(SELECT carr.CarritoID, carr.UsuarioID, ProductoID, Cantidad FROM Carrito carr
INNER JOIN Carrito_Detalles carr_dets
ON carr.CarritoID = carr_dets.CarritoID) AS carrs 
LEFT JOIN Usuario us ON us.UsuarioID = carrs.UsuarioID
LEFT JOIN Producto prod ON carrs.ProductoID = prod.ProductoID
WHERE us.UsuarioID = 1 AND us.AliasUsuario = 'NicoTheKing' AND us.Nombres = 'Nicolas Alan' AND us.Apellido = 'Fernandez';

-- Obtener precio total del carrito teniendo los datos del jwt
SELECT SUM(carr_det.Cantidad * p.Precio) Total_Carrito FROM Usuario us
RIGHT JOIN Carrito carr ON us.UsuarioID = carr.UsuarioID
RIGHT JOIN Carrito_Detalles carr_det ON carr.CarritoID = carr_det.CarritoID
LEFT JOIN Producto p ON p.ProductoID = carr_det.ProductoID
WHERE us.UsuarioID = 1 AND us.AliasUsuario = 'NicoTheKing' AND us.Nombres = 'Nicolas Alan' AND us.Apellido = 'Fernandez'
GROUP BY us.UsuarioID, carr.CarritoID;

-- reseñas

-- Comentario propio y puntuacion obtenidos de los datos del jwt y el id del producto referenciado
SELECT us.AliasUsuario, punt.Puntuacion, com.Cuerpo, punt.FechaEmision FROM Usuario us
INNER JOIN Puntuacion punt ON us.UsuarioID = punt.UsuarioID
LEFT JOIN Producto p ON p.ProductoID = punt.ProductoID
LEFT JOIN Comentario com ON com.ComentarioID = punt.ComentarioID
WHERE us.UsuarioID = 1 AND us.AliasUsuario = 'NicoTheKing' AND us.Nombres = 'Nicolas Alan' AND us.Apellido = 'Fernandez'
AND p.ProductoID = 153; -- si no existe puntuacion/comentario para este producto hecho por el usuario indicado, devuelve consulta vacia

-- mis datos
SELECT Nombres, Apellido, FechaDeNacimiento, Edad, EMail, Telefono, FechaDeRegistro FROM Usuario 
WHERE UsuarioID = 1 AND AliasUsuario = 'NicoTheKing' AND Nombres = 'Nicolas Alan' AND Apellido = 'Fernandez';


-- consultas que modifican registros

-- Modificar datos de usuario dependiendo del ID de usuario proporcionado por el jwt
BEGIN;
UPDATE Usuario SET AliasUsuario = 'MyNewAlias', Nombres = 'Anita Maria', Apellido = 'Garcia Perez', 
FechaDeNAcimiento = '1990-09-19', Edad = 36, Email = 'Anitaaaa@gmail.com', Telefono = '0237-4871323'
WHERE UsuarioID = 2; -- la fecha de registro y la contraseña no se pueden modificar por esta consulta
COMMIT;

-- Vaciar carrito de un usuario (probamos con el usuario 2)
BEGIN;
DELETE Carrito_Detalles FROM Carrito_Detalles 
INNER JOIN Carrito carr ON Carrito_Detalles.CarritoID = carr.CarritoID
WHERE carr.UsuarioID = 2;
COMMIT;

SELECT * FROM Carrito_Detalles; -- verificamos la eliminacion
SELECT * FROM Carrito; -- el carrito sigue existiendo, lo que se elimina son sus detalles (producto y cantidad)

INSERT INTO Carrito_Detalles (CarritoID, ProductoID, Cantidad) -- restauramos los datos eliminados del carrito asociado al usuario para deshacer el vaciado
VALUES (2, 130, 1), (2, 133, 1), (2, 153, 2), (2, 154, 2);

-- Agregar producto a carrito del usuario, usando datos del jwt (UsuarioID). 
-- para obtener el id del carrito debemos hacer una subconsulta donde usamos el UsuarioID para obtenerlo, 
-- esta debe devolver un solo valor sino nos lanzara un error
BEGIN;
INSERT INTO Carrito_Detalles (CarritoID, ProductoID, Cantidad) VALUES (
 (SELECT carr.CarritoID FROM Carrito carr, Usuario us WHERE carr.UsuarioID = us.UsuarioID AND us.UsuarioID = 7),
 122, 4
);
COMMIT;

SELECT * FROM Carrito_Detalles; -- comprobamos los cambios

-- Registrar Usuario (la contraseña debe ser hasheada por el backend y luego insertada aqui)
-- Al registrar un usuario, se debe crear un carrito vacio para el inmediatamente, entonces el proceso de registro consta
-- de 2 consultas, una que crea el registro dentro de Usuario, y otro que crea un carrito para dicho usuario automaticamente
BEGIN;
INSERT INTO Usuario 
( AliasUsuario, Nombres, Apellido, FechaDeNacimiento, Edad, Email, Telefono, FechaDeRegistro, Contraseña )
VALUES
( 'FrancisFordCoppola', 'Francisco Javier', 'Schwartzmann', '1992-11-23', 23, 
'Fran_crack@gmail.com', '+541133651288', '2022-10-02', '$2a$12$9pzkJNlWGZCYAk/nYisfCeG99/LiZYMp3OhTkXvZt8vGoP5fbJ/Sq' );
INSERT INTO Carrito (UsuarioID, UltimaModificacion) VALUES (
 (SELECT UsuarioID FROM Usuario WHERE AliasUsuario = 'FrancisFordCoppola' AND Email = 'Fran_crack@gmail.com'),
 NOW()
);
COMMIT; -- fin del registro

SELECT * FROM Usuario; -- comprobamos cambios en las ambas tablas
SELECT * FROM Carrito;
SELECT * FROM Carrito_Detalles; -- agregue productos al carrito del usuario nuevo usando las consultas anteriores, verificamos
SELECT * FROM Producto; 

DELETE FROM Carrito WHERE UsuarioID = 6;
DELETE FROM Usuario WHERE UsuarioID = 6; 

-- insertar puntuacion (se debe proporcionar el id de usuario y el id del producto)
-- antes de realizar esta consulta deberiamos comprobar si ya existe un comentario del mismo usuario, hacia el mismo producto (hay una consulta mas arriba para esto)
-- si existiese modificariamos la puntuacion existente, sino creariamos una nueva con referencia a comentario nulo
BEGIN;
INSERT INTO Puntuacion (UsuarioID, ProductoID, Puntuacion, FechaEmision, ComentarioID) VALUES 
(7, 153, 5, CURDATE(), NULL);
COMMIT;

SELECT * FROM Puntuacion;

-- modificar puntuacion (se debe proporionar el id de usuario y el id del producto)
-- en este caso tambien conviene verificar si ya existe la puntuacion
BEGIN;
UPDATE Puntuacion punt SET Puntuacion = 2, FechaEmision = CURDATE()
WHERE punt.UsuarioID = 1 AND ProductoID = 106;
COMMIT;

-- agregar/actualizar comentarios
-- para decidir si debemos modificar un comentario o agregarlo, debemos verificar si tiene una puntuacion (no se puede comentar sin puntuar)
-- en caso de que la puntuacion exista, debemos verificar si el comentario existe para el usuario y el producto con la siguiente consulta:

SELECT Cuerpo, punt.UsuarioID FROM Comentario com
RIGHT JOIN Puntuacion punt ON punt.ComentarioID = com.ComentarioID 
WHERE punt.UsuarioID = 2 AND punt.ProductoID = 126;

-- si la puntuacion para el usuario/proucto existe pero el comentario no, devolvera null (entonces podremos insertar un comentario para la puntuacion) de esta forma

BEGIN;
INSERT INTO Comentario (Cuerpo) VALUES ('Una exquisitez de carne!');
UPDATE Puntuacion punt SET ComentarioID = LAST_INSERT_ID()
WHERE punt.UsuarioID = 7 AND punt.ProductoID = 153;
COMMIT;

-- si la puntuacion existe y el comentario tambien (no devolvera null ni consulta vacia sino el comentario existente) entonces modificamos:

BEGIN;
UPDATE Comentario com RIGHT JOIN Puntuacion punt
ON com.ComentarioID = punt.ComentarioID
SET Cuerpo = 'Es muy bueno el producto realmente, se nota la calidad y profesionalidad en todo el proceso'
WHERE punt.UsuarioID = 2 AND punt.ProductoID = 126;
COMMIT;

SELECT * FROM Comentario;

-- si ni siquiera la puntuacion existe, esta consulta devolvera consulta vacia, en cuyo caso no se podra comentar






