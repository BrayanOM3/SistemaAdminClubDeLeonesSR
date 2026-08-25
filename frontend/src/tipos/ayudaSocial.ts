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

export enum TipoAyuda {
  Alimentos = 'Alimentos',
  Medicamentos = 'Medicamentos',
  Educacion = 'Educacion',
  Vivienda = 'Vivienda',
  Vestimenta = 'Vestimenta',
  Economica = 'Economica',
  Otro = 'Otro',
}

export enum EstadoAyuda {
  Entregada = 'Entregada',
  Pendiente = 'Pendiente',
  Cancelada = 'Cancelada',
}