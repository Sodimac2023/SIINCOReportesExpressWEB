export interface User {
  id?: string;
  name?: string;
}
export class Usuario {
  ID_USUARIO?: number;
  USUARIO?: string;
  NOMBRE?: string;
  CARGO?: string;
  CLAVE?: string;
  ESTADO?: string;
  ID_PERFIL?: number;
  NOMBRE_PERFIL?: string;
  NOMBRE_PANTALLA?: string;
  RUTA_PANTALLA?: string;
  NOMBRE_MODULO?: string;
}

export class Rol {
  IdRol?: number;
  NombreRol?: string;
}

export class DetalleRolUsuario {
  marca?: boolean;
  accion?: number;
  IdUsuarios?: number;
  Idroles?: number;
  IdUsuario?: number;
  Usuario?: String;
  NombreRol?: String;
  IdRol?: number;
}
