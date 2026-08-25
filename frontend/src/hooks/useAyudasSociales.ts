import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ayudaSocialServicio } from '../servicios/ayudaSocialServicio';
import type { CrearAyudaSocialDto, ActualizarAyudaSocialDto, AyudaSocialDto } from '../tipos/ayudaSocial';

export const useAyudasSociales = () => {
  return useQuery({
    queryKey: ['ayudasSociales'],
    queryFn: () => ayudaSocialServicio.obtenerTodos(),
  });
};

export const useAyudaSocial = (id: string) => {
  return useQuery({
    queryKey: ['ayudasSociales', id],
    queryFn: () => ayudaSocialServicio.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useCrearAyudaSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearAyudaSocialDto) => ayudaSocialServicio.crear(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ayudasSociales'] });
    },
  });
};

export const useActualizarAyudaSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: ActualizarAyudaSocialDto }) =>
      ayudaSocialServicio.actualizar(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ayudasSociales'] });
      queryClient.invalidateQueries({ queryKey: ['ayudasSociales', variables.id] });
    },
  });
};

export const useEliminarAyudaSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ayudaSocialServicio.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ayudasSociales'] });
    },
  });
};