import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { donacionServicio } from '../servicios/donacionServicio';
import type { CrearDonacionDto, ActualizarDonacionDto, DonacionDto } from '../tipos/donacion';

export const useDonaciones = () => {
  return useQuery({
    queryKey: ['donaciones'],
    queryFn: () => donacionServicio.obtenerTodos(),
  });
};

export const useDonacion = (id: string) => {
  return useQuery({
    queryKey: ['donaciones', id],
    queryFn: () => donacionServicio.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useCrearDonacion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearDonacionDto) => donacionServicio.crear(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donaciones'] });
    },
  });
};

export const useActualizarDonacion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: ActualizarDonacionDto }) =>
      donacionServicio.actualizar(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['donaciones'] });
      queryClient.invalidateQueries({ queryKey: ['donaciones', variables.id] });
    },
  });
};

export const useEliminarDonacion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => donacionServicio.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donaciones'] });
    },
  });
};