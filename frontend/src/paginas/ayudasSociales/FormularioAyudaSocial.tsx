import { useEffect } from 'react';
import { Box, TextField, Grid, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { CrearAyudaSocialDto, ActualizarAyudaSocialDto, AyudaSocialDto, TipoAyuda, EstadoAyuda } from '../../tipos/ayudaSocial';

const esquemaAyudaSocial = z.object({
  beneficiarioId: z.string().uuid('ID de beneficiario inválido').min(1, 'El beneficiario es requerido'),
  tipo: z.enum(['Alimentos', 'Medicamentos', 'Educacion', 'Vivienda', 'Vestimenta', 'Economica', 'Otro']),
  descripcion: z.string().min(10, 'Mínimo 10 caracteres').max(500),
  monto: z.number().min(0, 'El monto no puede ser negativo').optional().nullable(),
  fechaEntrega: z.string().min(1, 'La fecha de entrega es requerida'),
  campanaId: z.string().uuid('ID de campaña inválido').optional().nullable(),
  voluntarioId: z.string().uuid('ID de voluntario inválido').optional().nullable(),
  estado: z.enum(['Entregada', 'Pendiente', 'Cancelada']),
});

type FormularioAyudaSocialData = z.infer<typeof esquemaAyudaSocial>;

interface FormularioAyudaSocialProps {
  inicial?: AyudaSocialDto;
  onSubmit: (data: CrearAyudaSocialDto | ActualizarAyudaSocialDto) => Promise<void>;
}

export function FormularioAyudaSocial({ inicial, onSubmit }: FormularioAyudaSocialProps) {
  const valoresIniciales: FormularioAyudaSocialData = {
    beneficiarioId: inicial?.beneficiarioId || '',
    tipo: (inicial?.tipo as FormularioAyudaSocialData['tipo']) || 'Alimentos',
    descripcion: inicial?.descripcion || '',
    monto: inicial?.monto ?? null,
    fechaEntrega: inicial?.fechaEntrega ? inicial.fechaEntrega.split('T')[0] : new Date().toISOString().split('T')[0],
    campanaId: inicial?.campanaId || '',
    voluntarioId: inicial?.voluntarioId || '',
    estado: (inicial?.estado as FormularioAyudaSocialData['estado']) || 'Pendiente',
  };

  const form = useForm<FormularioAyudaSocialData>({
    resolver: zodResolver(esquemaAyudaSocial),
    defaultValues: valoresIniciales,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (inicial) {
      form.reset(valoresIniciales);
    }
  }, [inicial, form]);

  const manejarSubmit = async (data: FormularioAyudaSocialData) => {
    const dto: CrearAyudaSocialDto | ActualizarAyudaSocialDto = {
      beneficiarioId: data.beneficiarioId,
      tipo: data.tipo as TipoAyuda,
      descripcion: data.descripcion,
      monto: data.monto ?? undefined,
      fechaEntrega: data.fechaEntrega,
      campanaId: data.campanaId || undefined,
      voluntarioId: data.voluntarioId || undefined,
      estado: data.estado as EstadoAyuda,
    };
    await onSubmit(dto);
  };

  const opcionesTipo: TipoAyuda[] = ['Alimentos', 'Medicamentos', 'Educacion', 'Vivienda', 'Vestimenta', 'Economica', 'Otro'];
  const opcionesEstado: EstadoAyuda[] = ['Entregada', 'Pendiente', 'Cancelada'];
  const esEconomica = form.watch('tipo') === 'Economica';

  return (
    <form onSubmit={form.handleSubmit(manejarSubmit)} noValidate>
      <Box component="fieldset" sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
          Información de la ayuda
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="beneficiarioId"
              control={form.control}
              rules={{ required: 'El beneficiario es requerido' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="ID Beneficiario *"
                  {...field}
                  error={!!form.formState.errors.beneficiarioId}
                  helperText={form.formState.errors.beneficiarioId?.message}
                  placeholder="UUID del beneficiario"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="tipo"
              control={form.control}
              rules={{ required: 'El tipo es requerido' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Tipo *"
                  select
                  {...field}
                  error={!!form.formState.errors.tipo}
                  helperText={form.formState.errors.tipo?.message}
                  slotProps={{
                    select: {
                      native: true,
                    },
                  }}
                >
                  {opcionesTipo.map((opcion) => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="fechaEntrega"
              control={form.control}
              rules={{ required: 'La fecha de entrega es requerida' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Fecha de entrega *"
                  type="date"
                  {...field}
                  error={!!form.formState.errors.fechaEntrega}
                  helperText={form.formState.errors.fechaEntrega?.message}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
              )}
            />
          </Grid>
          {esEconomica && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="monto"
                control={form.control}
                rules={{ required: 'El monto es requerido para ayuda económica', min: 0.01 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Monto (CRC) *"
                    type="number"
                    slotProps={{
                      htmlInput: { step: '0.01', min: '0.01' },
                    }}
                    {...field}
                    error={!!form.formState.errors.monto}
                    helperText={form.formState.errors.monto?.message}
                  />
                )}
              />
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="campanaId"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="ID Campaña (opcional)"
                  {...field}
                  error={!!form.formState.errors.campanaId}
                  helperText={form.formState.errors.campanaId?.message}
                  placeholder="UUID de la campaña"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="voluntarioId"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="ID Voluntario (opcional)"
                  {...field}
                  error={!!form.formState.errors.voluntarioId}
                  helperText={form.formState.errors.voluntarioId?.message}
                  placeholder="UUID del voluntario"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estado"
              control={form.control}
              rules={{ required: 'El estado es requerido' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Estado *"
                  select
                  {...field}
                  error={!!form.formState.errors.estado}
                  helperText={form.formState.errors.estado?.message}
                  slotProps={{
                    select: {
                      native: true,
                    },
                  }}
                >
                  {opcionesEstado.map((opcion) => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>
      </Box>

      <Box component="fieldset" sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
          Descripción
        </Typography>
        <Controller
          name="descripcion"
          control={form.control}
          rules={{ required: 'La descripción es requerida', minLength: 10 }}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Descripción *"
              multiline
              rows={4}
              {...field}
              error={!!form.formState.errors.descripcion}
              helperText={form.formState.errors.descripcion?.message}
            />
          )}
        />
      </Box>
    </form>
  );
}