import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { campanaServicio } from '../servicios/campanaServicio';
import type { CrearCampanaDto, ActualizarCampanaDto } from '../tipos/campana';

export const useCampanas = () => {
  return useQuery({
    queryKey: ['campanas'],
    queryFn: () => campanaServicio.obtenerTodos(),
  });
};

export const useCampana = (id: string) => {
  return useQuery({
    queryKey: ['campanas', id],
    queryFn: () => campanaServicio.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useCrearCampana = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearCampanaDto) => campanaServicio.crear(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campanas'] });
    },
  });
};

export const useActualizarCampana = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: ActualizarCampanaDto }) =>
      campanaServicio.actualizar(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['campanas'] });
      queryClient.invalidateQueries({ queryKey: ['campanas', variables.id] });
    },
  });
};

export const useEliminarCampana = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => campanaServicio.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campanas'] });
    },
  });
};