import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { calendarioServicio } from '../servicios/calendarioServicio';

/** Eventos unificados del calendario en el rango visible. keepPreviousData evita parpadeo al navegar de mes. */
export const useCalendario = (desde: string, hasta: string) => {
  return useQuery({
    queryKey: ['calendario', desde, hasta],
    queryFn: () => calendarioServicio.obtenerRango(desde, hasta),
    enabled: !!desde && !!hasta,
    placeholderData: keepPreviousData,
  });
};

/** Detalle completo de las donaciones de un día (fetch on-demand con el modal abierto). */
export const useDonacionesDelDia = (fecha: string, habilitado: boolean) => {
  return useQuery({
    queryKey: ['calendario', fecha, 'donaciones'],
    queryFn: () => calendarioServicio.obtenerDonacionesDelDia(fecha),
    enabled: habilitado && !!fecha,
  });
};

/** Detalle completo de las ayudas sociales de un día (fetch on-demand con el modal abierto). */
export const useAyudasDelDia = (fecha: string, habilitado: boolean) => {
  return useQuery({
    queryKey: ['calendario', fecha, 'ayudas'],
    queryFn: () => calendarioServicio.obtenerAyudasSocialesDelDia(fecha),
    enabled: habilitado && !!fecha,
  });
};