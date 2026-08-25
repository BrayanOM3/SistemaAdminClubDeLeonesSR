import clienteAxios from '../api/clienteAxios';
import { endpoints } from '../api/constantesEndpoints';
import type { ActividadDto, CrearActividadDto, ActualizarActividadDto } from '../tipos/actividad';

export const actividadServicio = {
  async obtenerTodos(): Promise<ActividadDto[]> {
    const { data } = await clienteAxios.get<ActividadDto[]>(endpoints.actividades.base);
    return data;
  },

  async obtenerPorId(id: string): Promise<ActividadDto> {
    const { data } = await clienteAxios.get<ActividadDto>(endpoints.actividades.porId(id));
    return data;
  },

  async crear(dto: CrearActividadDto): Promise<ActividadDto> {
    const { data } = await clienteAxios.post<ActividadDto>(endpoints.actividades.base, dto);
    return data;
  },

  async actualizar(id: string, dto: ActualizarActividadDto): Promise<void> {
    await clienteAxios.put(endpoints.actividades.porId(id), dto);
  },

  async eliminar(id: string): Promise<void> {
    await clienteAxios.delete(endpoints.actividades.porId(id));
  },
};