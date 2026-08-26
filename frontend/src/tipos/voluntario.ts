export interface VoluntarioDto {
  id: string;
  nombreCompleto: string;
  cedula: string;
  telefono?: string;
  correo?: string;
  fechaIngreso: string;
  disponibilidad?: string;
  especialidad?: string;
  estado: EstadoVoluntario;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CrearVoluntarioDto {
  nombreCompleto: string;
  cedula: string;
  telefono?: string;
  correo?: string;
  fechaIngreso: string;
  disponibilidad?: string;
  especialidad?: string;
  estado: EstadoVoluntario;
}

export interface ActualizarVoluntarioDto {
  nombreCompleto?: string;
  cedula?: string;
  telefono?: string;
  correo?: string;
  fechaIngreso?: string;
  disponibilidad?: string;
  especialidad?: string;
  estado?: EstadoVoluntario;
}

export type EstadoVoluntario = 'Activo' | 'Inactivo';