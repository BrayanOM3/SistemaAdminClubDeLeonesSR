import { create } from 'zustand';

interface EstadoUI {
  menuAbierto: boolean;
  temaOscuro: boolean;
  notificaciones: Notificacion[];

  alternarMenu: () => void;
  abrirMenu: () => void;
  cerrarMenu: () => void;
  alternarTema: () => void;
  agregarNotificacion: (notificacion: Omit<Notificacion, 'id'>) => void;
  removerNotificacion: (id: string) => void;
  limpiarNotificaciones: () => void;
}

interface Notificacion {
  id: string;
  tipo: 'exito' | 'error' | 'advertencia' | 'info';
  mensaje: string;
  duracion?: number;
}

export const useStoreUI = create<EstadoUI>((set, get) => ({
  menuAbierto: false,
  temaOscuro: false,
  notificaciones: [],

  alternarMenu: () => set((state) => ({ menuAbierto: !state.menuAbierto })),
  abrirMenu: () => set({ menuAbierto: true }),
  cerrarMenu: () => set({ menuAbierto: false }),
  alternarTema: () => set((state) => ({ temaOscuro: !state.temaOscuro })),

  agregarNotificacion: (notificacion) => {
    const id = crypto.randomUUID();
    const duracion = notificacion.duracion ?? 5000;
    set((state) => ({
      notificaciones: [...state.notificaciones, { ...notificacion, id }],
    }));
    setTimeout(() => {
      get().removerNotificacion(id);
    }, duracion);
  },

  removerNotificacion: (id) =>
    set((state) => ({
      notificaciones: state.notificaciones.filter((n) => n.id !== id),
    })),

  limpiarNotificaciones: () => set({ notificaciones: [] }),
}));