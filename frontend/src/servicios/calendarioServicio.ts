import clienteAxios from '../api/clienteAxios';
import { endpoints } from '../api/constantesEndpoints';
import type { EventoCalendarioDto } from '../tipos/calendario';
import type { DonacionDto } from '../tipos/donacion';
import type { AyudaSocialDto } from '../tipos/ayudaSocial';

export const calendarioServicio = {
  async obtenerRango(desde: string, hasta: string): Promise<EventoCalendarioDto[]> {
    const { data } = await clienteAxios.get<EventoCalendarioDto[]>(endpoints.calendario.rango(desde, hasta));
    return data;
  },

  async obtenerDonacionesDelDia(fecha: string): Promise<DonacionDto[]> {
    const { data } = await clienteAxios.get<DonacionDto[]>(endpoints.calendario.donacionesDelDia(fecha));
    return data;
  },

  async obtenerAyudasSocialesDelDia(fecha: string): Promise<AyudaSocialDto[]> {
    const { data } = await clienteAxios.get<AyudaSocialDto[]>(endpoints.calendario.ayudasSocialesDelDia(fecha));
    return data;
  },
};