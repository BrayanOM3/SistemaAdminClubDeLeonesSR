export interface AyudaSocialDto {
  id: string;
  beneficiarioId: string;
  tipo: TipoAyuda;
  descripcion: string;
  monto?: number;
  fechaEntrega: string;
  campanaId?: string;
  voluntarioId?: string;
  estado: EstadoAyuda;
}

export interface CrearAyudaSocialDto {
  beneficiarioId: string;
  tipo: TipoAyuda;
  descripcion: string;
  monto?: number;
  fechaEntrega: string;
  campanaId?: string;
  voluntarioId?: string;
  estado: EstadoAyuda;
}

export interface ActualizarAyudaSocialDto {
  beneficiarioId?: string;
  tipo?: TipoAyuda;
  descripcion?: string;
  monto?: number;
  fechaEntrega?: string;
  campanaId?: string;
  voluntarioId?: string;
  estado?: EstadoAyuda;
}

export type TipoAyuda = 'Alimentos' | 'Medicamentos' | 'Educacion' | 'Vivienda' | 'Vestimenta' | 'Economica' | 'Otro';

export type EstadoAyuda = 'Entregada' | 'Pendiente' | 'Cancelada';