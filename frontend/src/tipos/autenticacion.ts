export interface IniciarSesionRequestDto {
  nombreUsuario: string;
  password: string;
}

export interface IniciarSesionRespuestaDto {
  token: string;
  usuarioId: string;
  nombreUsuario: string;
  correo: string;
  rol: RolUsuario | number;
  voluntarioId?: string;
  nombreVoluntario?: string;
}

export type RolUsuario = 'Administrador' | 'Tesorero' | 'Secretario' | 'Director' | 'Coordinador';

export type EstadoUsuario = 'Activo' | 'Inactivo';