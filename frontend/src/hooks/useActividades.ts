import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { actividadServicio } from '../servicios/actividadServicio';
import type { CrearActividadDto, ActualizarActividadDto, ActividadDto } from '../tipos/actividad';

export const useActividades = () => {
  return useQuery({
    queryKey: ['actividades'],
    queryFn: () => actividadServicio.obtenerTodos(),
  });
};

export const useActividad = (id: string) => {
  return useQuery({
    queryKey: ['actividades', id],
    queryFn: () => actividadServicio.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useCrearActividad = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearActividadDto) => actividadServicio.crear(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actividades'] });
    },
  });
};

export const useActualizarActividad = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: ActualizarActividadDto }) =>
      actividadServicio.actualizar(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['actividades'] });
      queryClient.invalidateQueries({ queryKey: ['actividades', variables.id] });
    },
  });
};

export const useEliminarActividad = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actividadServicio.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actividades'] });
    },
  });
};