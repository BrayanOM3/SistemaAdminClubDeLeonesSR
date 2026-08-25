export interface IniciarSesionRequestDto {
  nombreUsuario: string;
  password: string;
}

export interface IniciarSesionRespuestaDto {
  token: string;
  usuarioId: string;
  nombreUsuario: string;
  correo: string;
  rol: RolUsuario;
  voluntarioId?: string;
  nombreVoluntario?: string;
}

export enum RolUsuario {
  Administrador = 'Administrador',
  Tesorero = 'Tesorero',
  Secretario = 'Secretario',
  Director = 'Director',
  Coordinador = 'Coordinador',
}

export enum EstadoUsuario {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
}