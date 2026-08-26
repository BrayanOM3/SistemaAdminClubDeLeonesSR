import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { beneficiarioServicio } from '../servicios/beneficiarioServicio';
import type { CrearBeneficiarioDto, ActualizarBeneficiarioDto } from '../tipos/beneficiario';

export const useBeneficiarios = () => {
  return useQuery({
    queryKey: ['beneficiarios'],
    queryFn: () => beneficiarioServicio.obtenerTodos(),
  });
};

export const useBeneficiario = (id: string) => {
  return useQuery({
    queryKey: ['beneficiarios', id],
    queryFn: () => beneficiarioServicio.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useCrearBeneficiario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CrearBeneficiarioDto) => beneficiarioServicio.crear(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiarios'] });
    },
  });
};

export const useActualizarBeneficiario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: ActualizarBeneficiarioDto }) =>
      beneficiarioServicio.actualizar(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['beneficiarios'] });
      queryClient.invalidateQueries({ queryKey: ['beneficiarios', variables.id] });
    },
  });
};

export const useEliminarBeneficiario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => beneficiarioServicio.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiarios'] });
    },
  });
};