import clienteAxios from '../api/clienteAxios';
import { endpoints } from '../api/constantesEndpoints';
import type { CampanaDto, CrearCampanaDto, ActualizarCampanaDto } from '../tipos/campana';

export const campanaServicio = {
  async obtenerTodos(): Promise<CampanaDto[]> {
    const { data } = await clienteAxios.get<CampanaDto[]>(endpoints.campanas.base);
    return data;
  },

  async obtenerPorId(id: string): Promise<CampanaDto> {
    const { data } = await clienteAxios.get<CampanaDto>(endpoints.campanas.porId(id));
    return data;
  },

  async crear(dto: CrearCampanaDto): Promise<CampanaDto> {
    const { data } = await clienteAxios.post<CampanaDto>(endpoints.campanas.base, dto);
    return data;
  },

  async actualizar(id: string, dto: ActualizarCampanaDto): Promise<void> {
    await clienteAxios.put(endpoints.campanas.porId(id), dto);
  },

  async eliminar(id: string): Promise<void> {
    await clienteAxios.delete(endpoints.campanas.porId(id));
  },
};