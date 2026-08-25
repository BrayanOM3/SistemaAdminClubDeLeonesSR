import clienteAxios from '../api/clienteAxios';
import { endpoints } from '../api/constantesEndpoints';
import type { BeneficiarioDto, CrearBeneficiarioDto, ActualizarBeneficiarioDto } from '../tipos/beneficiario';

export const beneficiarioServicio = {
  async obtenerTodos(): Promise<BeneficiarioDto[]> {
    const { data } = await clienteAxios.get<BeneficiarioDto[]>(endpoints.beneficiarios.base);
    return data;
  },

  async obtenerPorId(id: string): Promise<BeneficiarioDto> {
    const { data } = await clienteAxios.get<BeneficiarioDto>(endpoints.beneficiarios.porId(id));
    return data;
  },

  async crear(dto: CrearBeneficiarioDto): Promise<BeneficiarioDto> {
    const { data } = await clienteAxios.post<BeneficiarioDto>(endpoints.beneficiarios.base, dto);
    return data;
  },

  async actualizar(id: string, dto: ActualizarBeneficiarioDto): Promise<void> {
    await clienteAxios.put(endpoints.beneficiarios.porId(id), dto);
  },

  async eliminar(id: string): Promise<void> {
    await clienteAxios.delete(endpoints.beneficiarios.porId(id));
  },
};