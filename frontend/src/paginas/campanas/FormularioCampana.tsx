import { useEffect } from 'react';
import { Box, TextField, Grid, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { CrearCampanaDto, ActualizarCampanaDto, CampanaDto } from '../../tipos/campana';

const esquemaCampana = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(100),
  descripcion: z.string().min(10, 'Mínimo 10 caracteres').max(500),
  fechaInicio: z.string().min(1, 'La fecha de inicio es requerida'),
  fechaFin: z.string().optional().nullable(),
  objetivoMonto: z.number().min(0, 'El objetivo no puede ser negativo').optional().nullable(),
  estado: z.enum(['Planificada', 'Activa', 'Finalizada', 'Cancelada']),
  tipo: z.enum(['Recaudacion', 'EnEspecie', 'Voluntariado', 'Mixta']),
});

type FormularioCampanaData = z.infer<typeof esquemaCampana>;

interface FormularioCampanaProps {
  inicial?: CampanaDto;
  onSubmit: (data: CrearCampanaDto | ActualizarCampanaDto) => Promise<void>;
}

export function FormularioCampana({ inicial, onSubmit }: FormularioCampanaProps) {
  const valoresIniciales: FormularioCampanaData = {
    nombre: inicial?.nombre || '',
    descripcion: inicial?.descripcion || '',
    fechaInicio: inicial?.fechaInicio ? inicial.fechaInicio.split('T')[0] : new Date().toISOString().split('T')[0],
    fechaFin: inicial?.fechaFin ? inicial.fechaFin.split('T')[0] : '',
    objetivoMonto: inicial?.objetivoMonto ?? null,
    estado: (inicial?.estado as FormularioCampanaData['estado']) || 'Planificada',
    tipo: (inicial?.tipo as FormularioCampanaData['tipo']) || 'Recaudacion',
  };

  const form = useForm<FormularioCampanaData>({
    resolver: zodResolver(esquemaCampana),
    defaultValues: valoresIniciales,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (inicial) {
      form.reset(valoresIniciales);
    }
  }, [inicial, form]);

  const manejarSubmit = async (data: FormularioCampanaData) => {
    const dto: CrearCampanaDto | ActualizarCampanaDto = {
      nombre: data.nombre,
      descripcion: data.descripcion,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin || undefined,
      objetivoMonto: data.objetivoMonto ?? undefined,
      estado: data.estado,
      tipo: data.tipo,
    };
    await onSubmit(dto);
  };

  const opcionesEstado = ['Planificada', 'Activa', 'Finalizada', 'Cancelada'] as const;
  const opcionesTipo = ['Recaudacion', 'EnEspecie', 'Voluntariado', 'Mixta'] as const;

  return (
    <form onSubmit={form.handleSubmit(manejarSubmit)} noValidate>
      <Box component="fieldset" sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
          Información general
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="nombre"
              control={form.control}
              rules={{ required: 'El nombre es requerido' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Nombre *"
                  {...field}
                  error={!!form.formState.errors.nombre}
                  helperText={form.formState.errors.nombre?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="descripcion"
              control={form.control}
              rules={{ required: 'La descripción es requerida', minLength: 10 }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Descripción *"
                  multiline
                  rows={3}
                  {...field}
                  error={!!form.formState.errors.descripcion}
                  helperText={form.formState.errors.descripcion?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="fechaInicio"
              control={form.control}
              rules={{ required: 'La fecha de inicio es requerida' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Fecha de inicio *"
                  type="date"
                  {...field}
                  error={!!form.formState.errors.fechaInicio}
                  helperText={form.formState.errors.fechaInicio?.message}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="fechaFin"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Fecha de fin (opcional)"
                  type="date"
                  {...field}
                  error={!!form.formState.errors.fechaFin}
                  helperText={form.formState.errors.fechaFin?.message}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="objetivoMonto"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Objetivo monetario (CRC)"
                  type="number"
                  slotProps={{
                    htmlInput: { step: '0.01', min: '0' },
                  }}
                  {...field}
                  error={!!form.formState.errors.objetivoMonto}
                  helperText={form.formState.errors.objetivoMonto?.message}
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
        </Grid>
      </Box>
    </form>
  );
}