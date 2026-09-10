export interface DonacionDto {
  id: string;
  donanteNombre: string;
  tipo: TipoDonacion;
  monto?: number;
  descripcion?: string;
  fecha: string;
  reciboNumero?: string;
  campanaId?: string;
  voluntarioId?: string;
  /** Nombres expandidos. Solo los envía GET /api/v1/calendario/{fecha}/donaciones (detalle del día). */
  nombreCampana?: string;
  nombreVoluntario?: string;
}

export interface CrearDonacionDto {
  donanteNombre: string;
  tipo: TipoDonacion;
  monto?: number;
  descripcion?: string;
  fecha: string;
  reciboNumero?: string;
  campanaId?: string;
  voluntarioId?: string;
}

export interface ActualizarDonacionDto {
  donanteNombre?: string;
  tipo?: TipoDonacion;
  monto?: number;
  descripcion?: string;
  fecha?: string;
  reciboNumero?: string;
  campanaId?: string;
  voluntarioId?: string;
}

export type TipoDonacion = 'Monetaria' | 'EnEspecie';