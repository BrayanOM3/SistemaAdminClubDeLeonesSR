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

export type EstadoCampana = 'Planificada' | 'Activa' | 'Finalizada' | 'Cancelada';

export type TipoCampana = 'Recaudacion' | 'EnEspecie' | 'Voluntariado' | 'Mixta';