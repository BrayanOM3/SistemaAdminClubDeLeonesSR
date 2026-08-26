export interface ActividadDto {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: TipoActividad;
  fecha: string;
  lugar?: string;
  campanaId?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CrearActividadDto {
  nombre: string;
  descripcion: string;
  tipo: TipoActividad;
  fecha: string;
  lugar?: string;
  campanaId?: string;
}

export interface ActualizarActividadDto {
  nombre?: string;
  descripcion?: string;
  tipo?: TipoActividad;
  fecha?: string;
  lugar?: string;
  campanaId?: string;
}

export type TipoActividad = 'Reunion' | 'Evento' | 'Jornada' | 'Visita';