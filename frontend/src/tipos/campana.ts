export interface CampanaDto {
  id: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin?: string;
  objetivoMonto?: number;
  estado: EstadoCampana;
  tipo: TipoCampana;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CrearCampanaDto {
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin?: string;
  objetivoMonto?: number;
  estado: EstadoCampana;
  tipo: TipoCampana;
}

export interface ActualizarCampanaDto {
  nombre?: string;
  descripcion?: string;
  fechaInicio?: string;
  fechaFin?: string;
  objetivoMonto?: number;
  estado?: EstadoCampana;
  tipo?: TipoCampana;
}

export enum EstadoCampana {
  Planificada = 'Planificada',
  Activa = 'Activa',
  Finalizada = 'Finalizada',
  Cancelada = 'Cancelada',
}

export enum TipoCampana {
  Recaudacion = 'Recaudacion',
  EnEspecie = 'EnEspecie',
  Voluntariado = 'Voluntariado',
  Mixta = 'Mixta',
}