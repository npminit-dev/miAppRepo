// tipos de respuesta

export interface prod {
  ProductoID: number;
  CategoriaID: number;
  NombreProducto: string;
  Precio: number;
  Descripcion: string;
}

export interface prodYImgs {
  ProductoID: number;
  CategoriaID: number;
  NombreProducto: string;
  Precio: number;
  Descripcion: string;
  Imagen: string;
  Imagen_Hover: string;
  Miniatura: string;
  Miniatura_Hover: string;
}

export interface reseña {
  ProductoID: number;
  AliasUsuario: number;
  Puntuacion: number;
  Cuerpo: number;
  FechaEmision: Date;
}

export interface jwt {
  UsuarioID: number;
  AliasUsuario: string;
  Nombres: string;
  Apellido: string;
}

export interface misDatos {
  AliasUsuario: string,
  Nombres: string,
  Apellido: string,
  FechaDeNacimiento: Date,
  Edad: number,
  EMail: string,
  Telefono: string,
  FechaDeRegistro: Date
}

export interface carrito {
  ProductoID: number, 
  NombreProducto: string,
  PrecioXUnidad: number,
  Cantidad: number
}

// para validar

export interface existeAlias {
  AliasUsuario: string;
}

export interface existeElMail {
  Email: string
}

export interface validacionComentario {
  Comentario?: string | null,
  UsuarioID?: number
}

export interface inicioSesionDatos {
  AliasUsuario: string,
  Contraseña: string
}

// para insertar datos en la ddbb

export interface datosRegistro {
  Alias: string,
  Nombres: string,
  Apellido: string,
  FechaNac: string,
  Edad: number,
  Email: string,
  Telefono: string,
  Contraseña: string
}

export type tuplaNuevosDatos = [string, string, string, string, number, string]

export interface puntuacion {
  Puntuacion: number
}

export interface reseñaBody {
  ProductoID: number
}

export interface prodAgregado {
  ProductoID: number,
  Cantidad: number
}