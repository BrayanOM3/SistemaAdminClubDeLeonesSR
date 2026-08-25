import clienteAxios from '../api/clienteAxios';
import { endpoints } from '../api/constantesEndpoints';
import type { IniciarSesionRequestDto, IniciarSesionRespuestaDto } from '../tipos/autenticacion';

export const autenticacionServicio = {
  async iniciarSesion(credenciales: IniciarSesionRequestDto): Promise<IniciarSesionRespuestaDto> {
    const { data } = await clienteAxios.post<IniciarSesionRespuestaDto>(
      endpoints.autenticacion.login,
      credenciales
    );
    return data;
  },

  async validarToken(token: string): Promise<boolean> {
    const { data } = await clienteAxios.get<boolean>(endpoints.autenticacion.validarToken, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};