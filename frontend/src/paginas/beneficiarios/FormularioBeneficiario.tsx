import { useEffect } from 'react';
import { Box, TextField, Grid, Controller } from '@mui/material';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { CrearBeneficiarioDto, ActualizarBeneficiarioDto, BeneficiarioDto } from '../../tipos/beneficiario';

const esquemaBeneficiario = z.object({
  nombreCompleto: z.string().min(2, 'Mínimo 2 caracteres').max(120),
  cedula: z.string().min(1, 'La cédula es requerida').max(20),
  fechaNacimiento: z.string().optional().nullable(),
  telefono: z.string().max(20).optional().nullable(),
  correo: z.string().email('Correo inválido').max(100).optional().nullable().or(z.literal('')),
  direccion: z.string().min(5, 'Mínimo 5 caracteres').max(200),
  estadoCivil: z.enum(['Soltero', 'Casado', 'Viudo', 'Divorciado', 'Otro']),
  situacionNecesidad: z.string().min(10, 'Describa la situación de necesidad (mín. 10 caracteres)').max(500),
  observaciones: z.string().max(500).optional().nullable(),
});

type FormularioBeneficiarioData = z.infer<typeof esquemaBeneficiario>;

interface FormularioBeneficiarioProps {
  inicial?: BeneficiarioDto;
  onSubmit: (data: CrearBeneficiarioDto | ActualizarBeneficiarioDto) => Promise<void>;
}

export function FormularioBeneficiario({ inicial, onSubmit }: FormularioBeneficiarioProps) {
  const esEdicion = !!inicial;

  const valoresIniciales: FormularioBeneficiarioData = {
    nombreCompleto: inicial?.nombreCompleto || '',
    cedula: inicial?.cedula || '',
    fechaNacimiento: inicial?.fechaNacimiento ? inicial.fechaNacimiento.split('T')[0] : '',
    telefono: inicial?.telefono || '',
    correo: inicial?.correo || '',
    direccion: inicial?.direccion || '',
    estadoCivil: (inicial?.estadoCivil as FormularioBeneficiarioData['estadoCivil']) || 'Soltero',
    situacionNecesidad: inicial?.situacionNecesidad || '',
    observaciones: inicial?.observaciones || '',
  };

  const form = useForm<FormularioBeneficiarioData>({
    resolver: zodResolver(esquemaBeneficiario),
    defaultValues: valoresIniciales,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (inicial) {
      form.reset(valoresIniciales);
    }
  }, [inicial, form]);

  const manejarSubmit = async (data: FormularioBeneficiarioData) => {
    const dto: CrearBeneficiarioDto | ActualizarBeneficiarioDto = {
      nombreCompleto: data.nombreCompleto,
      cedula: data.cedula,
      fechaNacimiento: data.fechaNacimiento || undefined,
      telefono: data.telefono || undefined,
      correo: data.correo || undefined,
      direccion: data.direccion,
      estadoCivil: data.estadoCivil,
      situacionNecesidad: data.situacionNecesidad,
      observaciones: data.observaciones || undefined,
    };
    await onSubmit(dto);
  };

  const opcionesEstadoCivil = ['Soltero', 'Casado', 'Viudo', 'Divorciado', 'Otro'] as const;

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
              name="fechaNacimiento"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Fecha de nacimiento"
                  type="date"
                  {...field}
                  error={!!form.formState.errors.fechaNacimiento}
                  helperText={form.formState.errors.fechaNacimiento?.message}
                  InputLabelProps={{ shrink: true }}
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
              name="estadoCivil"
              control={form.control}
              rules={{ required: 'El estado civil es requerido' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Estado civil *"
                  select
                  {...field}
                  error={!!form.formState.errors.estadoCivil}
                  helperText={form.formState.errors.estadoCivil?.message}
                  SelectProps={{ native: true }}
                >
                  {opcionesEstadoCivil.map((opcion) => (
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
          Domicilio y situación
        </legend>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="direccion"
              control={form.control}
              rules={{ required: 'La dirección es requerida', minLength: 5 }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Dirección *"
                  multiline
                  rows={2}
                  {...field}
                  error={!!form.formState.errors.direccion}
                  helperText={form.formState.errors.direccion?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="situacionNecesidad"
              control={form.control}
              rules={{ required: 'Describa la situación', minLength: 10 }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Situación de necesidad *"
                  multiline
                  rows={4}
                  {...field}
                  error={!!form.formState.errors.situacionNecesidad}
                  helperText={form.formState.errors.situacionNecesidad?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      <Box component="fieldset">
        <legend sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
          Observaciones
        </legend>
        <Controller
          name="observaciones"
          control={form.control}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Observaciones"
              multiline
              rows={3}
              {...field}
              error={!!form.formState.errors.observaciones}
              helperText={form.formState.errors.observaciones?.message}
            />
          )}
        />
      </Box>
    </form>
  );
}