import { useEffect } from 'react';
import { Box, TextField, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { CrearActividadDto, ActualizarActividadDto, ActividadDto, TipoActividad } from '../../tipos/actividad';

const esquemaActividad = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(100),
  descripcion: z.string().min(10, 'Mínimo 10 caracteres').max(500),
  tipo: z.enum(['Reunion', 'Evento', 'Jornada', 'Visita']),
  fecha: z.string().min(1, 'La fecha es requerida'),
  lugar: z.string().max(200).optional().nullable(),
  campanaId: z.string().uuid('ID de campaña inválido').optional().nullable(),
});

type FormularioActividadData = z.infer<typeof esquemaActividad>;

interface FormularioActividadProps {
  inicial?: ActividadDto;
  onSubmit: (data: CrearActividadDto | ActualizarActividadDto) => Promise<void>;
}

export function FormularioActividad({ inicial, onSubmit }: FormularioActividadProps) {
  const valoresIniciales: FormularioActividadData = {
    nombre: inicial?.nombre || '',
    descripcion: inicial?.descripcion || '',
    tipo: (inicial?.tipo as FormularioActividadData['tipo']) || 'Reunion',
    fecha: inicial?.fecha ? inicial.fecha.split('T')[0] : new Date().toISOString().split('T')[0],
    lugar: inicial?.lugar || '',
    campanaId: inicial?.campanaId || '',
  };

  const form = useForm<FormularioActividadData>({
    resolver: zodResolver(esquemaActividad),
    defaultValues: valoresIniciales,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (inicial) {
      form.reset(valoresIniciales);
    }
  }, [inicial, form]);

  const manejarSubmit = async (data: FormularioActividadData) => {
    const dto: CrearActividadDto | ActualizarActividadDto = {
      nombre: data.nombre,
      descripcion: data.descripcion,
      tipo: data.tipo as TipoActividad,
      fecha: data.fecha,
      lugar: data.lugar || undefined,
      campanaId: data.campanaId || undefined,
    };
    await onSubmit(dto);
  };

  const opcionesTipo: TipoActividad[] = ['Reunion', 'Evento', 'Jornada', 'Visita'];

  return (
    <form onSubmit={form.handleSubmit(manejarSubmit)} noValidate>
      <Box component="fieldset" sx={{ mb: 2 }}>
        <Box sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
          Información de la actividad
        </Box>
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
              name="fecha"
              control={form.control}
              rules={{ required: 'La fecha es requerida' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Fecha y hora *"
                  type="datetime-local"
                  {...field}
                  error={!!form.formState.errors.fecha}
                  helperText={form.formState.errors.fecha?.message}
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="lugar"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Lugar"
                  {...field}
                  error={!!form.formState.errors.lugar}
                  helperText={form.formState.errors.lugar?.message}
                />
              )}
            />
          </Grid>
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
        </Grid>
      </Box>
    </form>
  );
}