import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IniciarSesionRespuestaDto } from '../tipos/autenticacion';

type RolUsuarioString = 'Administrador' | 'Tesorero' | 'Secretario' | 'Director' | 'Coordinador';

interface EstadoSesion {
  token: string | null;
  usuarioId: string | null;
  nombreUsuario: string | null;
  correo: string | null;
  rol: RolUsuarioString | null;
  voluntarioId: string | null;
  nombreVoluntario: string | null;
  estaAutenticado: boolean;

  iniciarSesion: (datos: IniciarSesionRespuestaDto) => void;
  cerrarSesion: () => void;
  tieneRol: (roles: RolUsuarioString[]) => boolean;
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

      iniciarSesion: (datos: any) => {
        const RolUsuario = {
          Administrador: 1,
          Tesorero: 2,
          Secretario: 3,
          Director: 4,
          Coordinador: 5,
        };
        let rolValue = datos.Rol ?? datos.rol;
        let rolString: RolUsuarioString = 'Administrador';
        if (typeof rolValue === 'number') {
          const rolKeys = Object.keys(RolUsuario).filter(k => isNaN(Number(k)));
          const rolIndex = rolValue - 1;
          if (rolIndex >= 0 && rolIndex < rolKeys.length) {
            rolString = rolKeys[rolIndex] as RolUsuarioString;
          }
        } else {
          rolString = rolValue as RolUsuarioString;
        }
        set({
          token: datos.Token ?? datos.token,
          usuarioId: datos.UsuarioId ?? datos.usuarioId,
          nombreUsuario: datos.NombreUsuario ?? datos.nombreUsuario,
          correo: datos.Correo ?? datos.correo,
          rol: rolString,
          voluntarioId: datos.VoluntarioId ?? datos.voluntarioId ?? null,
          nombreVoluntario: datos.NombreVoluntario ?? datos.nombreVoluntario ?? null,
          estaAutenticado: true,
        });
      },

      cerrarSesion: () =>
        set({
          ...estadoInicial,
        }),

      tieneRol: (roles: RolUsuarioString[]) => {
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