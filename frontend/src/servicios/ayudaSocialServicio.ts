import clienteAxios from '../api/clienteAxios';
import { endpoints } from '../api/constantesEndpoints';
import type { AyudaSocialDto, CrearAyudaSocialDto, ActualizarAyudaSocialDto } from '../tipos/ayudaSocial';

export const ayudaSocialServicio = {
  async obtenerTodos(): Promise<AyudaSocialDto[]> {
    const { data } = await clienteAxios.get<AyudaSocialDto[]>(endpoints.ayudasSociales.base);
    return data;
  },

  async obtenerPorId(id: string): Promise<AyudaSocialDto> {
    const { data } = await clienteAxios.get<AyudaSocialDto>(endpoints.ayudasSociales.porId(id));
    return data;
  },

  async crear(dto: CrearAyudaSocialDto): Promise<AyudaSocialDto> {
    const { data } = await clienteAxios.post<AyudaSocialDto>(endpoints.ayudasSociales.base, dto);
    return data;
  },

  async actualizar(id: string, dto: ActualizarAyudaSocialDto): Promise<void> {
    await clienteAxios.put(endpoints.ayudasSociales.porId(id), dto);
  },

  async eliminar(id: string): Promise<void> {
    await clienteAxios.delete(endpoints.ayudasSociales.porId(id));
  },
};