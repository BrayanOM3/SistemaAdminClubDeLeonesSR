/** Tipos de eventos que muestra el calendario (corresponden al enum del backend). */
export type TipoEventoCalendario = 'Campana' | 'Actividad' | 'Donacion' | 'AyudaSocial';

/** Evento unificado del calendario (DTO pivoteado del backend: GET /api/v1/calendario). */
export interface EventoCalendarioDto {
  id: string | null;
  tipo: TipoEventoCalendario;
  titulo: string;
  fechaInicio: string; // 'yyyy-MM-dd'
  fechaFin?: string | null;
  esAgregado: boolean;
  cantidadAgregada?: number | null;
  montoTotalAgregado?: number | null;
}

const GUID_VACIO = /^0{8}-0{4}-0{4}-0{4}-0{12}$/;

/** El backend envía Guid.Empty como string para los agregados: lo normaliza a null. */
export function idUtilizable(id: string | null | undefined): string | null {
  if (!id) return null;
  return GUID_VACIO.test(id) ? null : id;
}