import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IniciarSesionRespuestaDto, RolUsuario } from '../tipos/autenticacion';

interface EstadoSesion {
  token: string | null;
  usuarioId: string | null;
  nombreUsuario: string | null;
  correo: string | null;
  rol: RolUsuario | null;
  voluntarioId: string | null;
  nombreVoluntario: string | null;
  estaAutenticado: boolean;

  iniciarSesion: (datos: IniciarSesionRespuestaDto) => void;
  cerrarSesion: () => void;
  tieneRol: (roles: RolUsuario[]) => boolean;
}

const estadoInicial = {
  token: null,
  usuarioId: null,
  nombreUsuario: null,
  correo: null,
  rol: null,
  voluntarioId: null,
  nombreVoluntario: null,
  estaAutenticado: false,
};

export const useStoreSesion = create<EstadoSesion>()(
  persist(
    (set, get) => ({
      ...estadoInicial,

      iniciarSesion: (datos) =>
        set({
          token: datos.token,
          usuarioId: datos.usuarioId,
          nombreUsuario: datos.nombreUsuario,
          correo: datos.correo,
          rol: datos.rol,
          voluntarioId: datos.voluntarioId ?? null,
          nombreVoluntario: datos.nombreVoluntario ?? null,
          estaAutenticado: true,
        }),

      cerrarSesion: () =>
        set({
          ...estadoInicial,
        }),

      tieneRol: (roles) => {
        const rol = get().rol;
        return rol ? roles.includes(rol) : false;
      },
    }),
    {
      name: 'sa-club-de-leones-sesion',
      partialize: (state) => ({
        token: state.token,
        usuarioId: state.usuarioId,
        nombreUsuario: state.nombreUsuario,
        correo: state.correo,
        rol: state.rol,
        voluntarioId: state.voluntarioId,
        nombreVoluntario: state.nombreVoluntario,
        estaAutenticado: state.estaAutenticado,
      }),
    }
  )
);