import clienteAxios from '../api/clienteAxios';
import { endpoints } from '../api/constantesEndpoints';
import type { DonacionDto, CrearDonacionDto, ActualizarDonacionDto } from '../tipos/donacion';

export const donacionServicio = {
  async obtenerTodos(): Promise<DonacionDto[]> {
    const { data } = await clienteAxios.get<DonacionDto[]>(endpoints.donaciones.base);
    return data;
  },

  async obtenerPorId(id: string): Promise<DonacionDto> {
    const { data } = await clienteAxios.get<DonacionDto>(endpoints.donaciones.porId(id));
    return data;
  },

  async crear(dto: CrearDonacionDto): Promise<DonacionDto> {
    const { data } = await clienteAxios.post<DonacionDto>(endpoints.donaciones.base, dto);
    return data;
  },

  async actualizar(id: string, dto: ActualizarDonacionDto): Promise<void> {
    await clienteAxios.put(endpoints.donaciones.porId(id), dto);
  },

  async eliminar(id: string): Promise<void> {
    await clienteAxios.delete(endpoints.donaciones.porId(id));
  },
};