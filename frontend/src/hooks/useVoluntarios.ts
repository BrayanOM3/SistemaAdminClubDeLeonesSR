import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { voluntarioServicio } from '../servicios/voluntarioServicio';
import type { CrearVoluntarioDto, ActualizarVoluntarioDto, VoluntarioDto } from '../tipos/voluntario';

export const useVoluntarios = () => {
  return useQuery({
    queryKey: ['voluntarios'],
    queryFn: () => voluntarioServicio.obtenerTodos(),
  });
};

export const useVoluntario = (id: string) => {
  return useQuery({
    queryKey: ['voluntarios', id],
    queryFn: () => voluntarioServicio.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useCrearVoluntario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearVoluntarioDto) => voluntarioServicio.crear(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voluntarios'] });
    },
  });
};

export const useActualizarVoluntario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: ActualizarVoluntarioDto }) =>
      voluntarioServicio.actualizar(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['voluntarios'] });
      queryClient.invalidateQueries({ queryKey: ['voluntarios', variables.id] });
    },
  });
};

export const useEliminarVoluntario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => voluntarioServicio.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voluntarios'] });
    },
  });
};