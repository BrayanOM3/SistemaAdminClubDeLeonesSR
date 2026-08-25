import { useEffect } from 'react';
import { Box, TextField, Grid, Controller } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { CrearVoluntarioDto, ActualizarVoluntarioDto, VoluntarioDto } from '../../tipos/voluntario';

const esquemaVoluntario = z.object({
  nombreCompleto: z.string().min(2, 'Mínimo 2 caracteres').max(120),
  cedula: z.string().min(1, 'La cédula es requerida').max(20),
  telefono: z.string().max(20).optional().nullable(),
  correo: z.string().email('Correo inválido').max(100).optional().nullable().or(z.literal('')),
  fechaIngreso: z.string().min(1, 'La fecha de ingreso es requerida'),
  disponibilidad: z.string().max(200).optional().nullable(),
  especialidad: z.string().max(200).optional().nullable(),
  estado: z.enum(['Activo', 'Inactivo']),
});

type FormularioVoluntarioData = z.infer<typeof esquemaVoluntario>;

interface FormularioVoluntarioProps {
  inicial?: VoluntarioDto;
  onSubmit: (data: CrearVoluntarioDto | ActualizarVoluntarioDto) => Promise<void>;
}

export function FormularioVoluntario({ inicial, onSubmit }: FormularioVoluntarioProps) {
  const valoresIniciales: FormularioVoluntarioData = {
    nombreCompleto: inicial?.nombreCompleto || '',
    cedula: inicial?.cedula || '',
    telefono: inicial?.telefono || '',
    correo: inicial?.correo || '',
    fechaIngreso: inicial?.fechaIngreso ? inicial.fechaIngreso.split('T')[0] : new Date().toISOString().split('T')[0],
    disponibilidad: inicial?.disponibilidad || '',
    especialidad: inicial?.especialidad || '',
    estado: (inicial?.estado as FormularioVoluntarioData['estado']) || 'Activo',
  };

  const form = useForm<FormularioVoluntarioData>({
    resolver: zodResolver(esquemaVoluntario),
    defaultValues: valoresIniciales,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (inicial) {
      form.reset(valoresIniciales);
    }
  }, [inicial, form]);

  const manejarSubmit = async (data: FormularioVoluntarioData) => {
    const dto: CrearVoluntarioDto | ActualizarVoluntarioDto = {
      nombreCompleto: data.nombreCompleto,
      cedula: data.cedula,
      telefono: data.telefono || undefined,
      correo: data.correo || undefined,
      fechaIngreso: data.fechaIngreso,
      disponibilidad: data.disponibilidad || undefined,
      especialidad: data.especialidad || undefined,
      estado: data.estado,
    };
    await onSubmit(dto);
  };

  const opcionesEstado = ['Activo', 'Inactivo'] as const;

  return (
    <form onSubmit={form.handleSubmit(manejarSubmit)} noValidate>
      <Box component="fieldset" sx={{ mb: 2 }}>
        <legend sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
          Información personal
        </legend>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="nombreCompleto"
              control={form.control}
              rules={{ required: 'El nombre es requerido' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Nombre completo *"
                  {...field}
                  error={!!form.formState.errors.nombreCompleto}
                  helperText={form.formState.errors.nombreCompleto?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="cedula"
              control={form.control}
              rules={{ required: 'La cédula es requerida' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Cédula *"
                  {...field}
                  error={!!form.formState.errors.cedula}
                  helperText={form.formState.errors.cedula?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="telefono"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Teléfono"
                  {...field}
                  error={!!form.formState.errors.telefono}
                  helperText={form.formState.errors.telefono?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="correo"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  {...field}
                  error={!!form.formState.errors.correo}
                  helperText={form.formState.errors.correo?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="fechaIngreso"
              control={form.control}
              rules={{ required: 'La fecha de ingreso es requerida' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Fecha de ingreso *"
                  type="date"
                  {...field}
                  error={!!form.formState.errors.fechaIngreso}
                  helperText={form.formState.errors.fechaIngreso?.message}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
                  SelectProps={{ native: true }}
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
        <legend sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
          Información adicional
        </legend>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="disponibilidad"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Disponibilidad"
                  {...field}
                  error={!!form.formState.errors.disponibilidad}
                  helperText={form.formState.errors.disponibilidad?.message}
                  placeholder="Ej: Fines de semana, mañanas"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="especialidad"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Especialidad"
                  {...field}
                  error={!!form.formState.errors.especialidad}
                  helperText={form.formState.errors.especialidad?.message}
                  placeholder="Ej: Logística, atención médica, enseñanza"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}