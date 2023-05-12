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

export interface carritoUsuario {
  ProductoID: number;
  NombreProducto: string,
  Cantidad: number;
}

export interface misDatos {
  Nombres: string;
  Apellido: string;
  FechaDeNacimiento: Date;
  Edad: number;
  EMail: string;
  Telefono: string;
  FechaDeRegistro: Date;
}

export interface existeAlias {
  AliasUsuario: string;
}

export interface existeElMail {
  Email: string
}

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

export interface usuarioBasico {
  UsuarioID: string,
  Contraseña: string
}

export type tuplaNuevosDatos = [string, string, string, string, number, string, string]
