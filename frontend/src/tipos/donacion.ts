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

export enum TipoDonacion {
  Monetaria = 'Monetaria',
  EnEspecie = 'EnEspecie',
}