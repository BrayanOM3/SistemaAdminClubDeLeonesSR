import clienteAxios from '../api/clienteAxios';
import { endpoints } from '../api/constantesEndpoints';
import type { VoluntarioDto, CrearVoluntarioDto, ActualizarVoluntarioDto } from '../tipos/voluntario';

export const voluntarioServicio = {
  async obtenerTodos(): Promise<VoluntarioDto[]> {
    const { data } = await clienteAxios.get<VoluntarioDto[]>(endpoints.voluntarios.base);
    return data;
  },

  async obtenerPorId(id: string): Promise<VoluntarioDto> {
    const { data } = await clienteAxios.get<VoluntarioDto>(endpoints.voluntarios.porId(id));
    return data;
  },

  async crear(dto: CrearVoluntarioDto): Promise<VoluntarioDto> {
    const { data } = await clienteAxios.post<VoluntarioDto>(endpoints.voluntarios.base, dto);
    return data;
  },

  async actualizar(id: string, dto: ActualizarVoluntarioDto): Promise<void> {
    await clienteAxios.put(endpoints.voluntarios.porId(id), dto);
  },

  async eliminar(id: string): Promise<void> {
    await clienteAxios.delete(endpoints.voluntarios.porId(id));
  },
};