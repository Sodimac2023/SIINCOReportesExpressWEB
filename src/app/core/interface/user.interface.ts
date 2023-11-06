export interface User {
  id?: string;
  name?: string;
}
export interface Usuario {
  ID_USUARIO: number;
  USUARIO: string;
  NOMBRE: string;
  CARGO: string;
  CLAVE: string;
  ESTADO: string;
  ID_PERFIL: number;
  NOMBRE_PERFIL: string;
  NOMBRE_PANTALLA: string;
  RUTA_PANTALLA: string;
  NOMBRE_MODULO: string;
}

export interface Rol {
  IdRol: number;
  NombreRol: string;
}

export interface DetalleRolUsuario {
  marca: boolean;
  accion: number;
  IdUsuarios: number;
  Idroles: number;
  IdUsuario: number;
  Usuario: String;
  NombreRol: String;
  IdRol: number;
}
