import { useEffect } from 'react';
import { Box, TextField, Grid, Typography } from '@mui/material';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCampanas } from '../../hooks/useCampanas';
import { useVoluntarios } from '../../hooks/useVoluntarios';
import { SelectorEntidad } from '../../componentes/SelectorEntidad';
import type { CrearDonacionDto, ActualizarDonacionDto, DonacionDto } from '../../tipos/donacion';

const esquemaDonacion = z.object({
  donanteNombre: z.string().min(2, 'Mínimo 2 caracteres').max(120),
  tipo: z.enum(['Monetaria', 'EnEspecie']),
  monto: z.coerce.number().min(0.01, 'El monto debe ser mayor a 0').max(9999999999.99, 'El monto excede el máximo permitido').optional().nullable(),
  descripcion: z.string().max(500).optional().nullable(),
  fecha: z.string().min(1, 'La fecha es requerida'),
  reciboNumero: z.string().max(50).optional().nullable(),
  campanaId: z.string().optional().nullable(),
  voluntarioId: z.string().optional().nullable(),
});

type FormularioDonacionData = z.infer<typeof esquemaDonacion>;

interface FormularioDonacionProps {
  inicial?: DonacionDto;
  onSubmit: (data: CrearDonacionDto | ActualizarDonacionDto) => Promise<void>;
}

export function FormularioDonacion({ inicial, onSubmit }: FormularioDonacionProps) {

  const valoresIniciales: FormularioDonacionData = {
    donanteNombre: inicial?.donanteNombre || '',
    tipo: (inicial?.tipo as FormularioDonacionData['tipo']) || 'Monetaria',
    monto: inicial?.monto ?? null,
    descripcion: inicial?.descripcion || '',
    fecha: inicial?.fecha ? inicial.fecha.split('T')[0] : new Date().toISOString().split('T')[0],
    reciboNumero: inicial?.reciboNumero || '',
    campanaId: inicial?.campanaId || null,
    voluntarioId: inicial?.voluntarioId || null,
  };

  const form = useForm<FormularioDonacionData>({
    resolver: zodResolver(esquemaDonacion) as Resolver<FormularioDonacionData>,
    defaultValues: valoresIniciales,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (inicial) {
      form.reset(valoresIniciales);
    }
  }, [inicial, form]);

  const { data: campanas, isLoading: campanasCargando } = useCampanas();
  const { data: voluntarios, isLoading: voluntariosCargando } = useVoluntarios();
  const opcionesCampanas = (campanas || []).map((c) => ({ id: c.id, etiqueta: c.nombre }));
  const opcionesVoluntarios = (voluntarios || []).map((v) => ({ id: v.id, etiqueta: v.nombreCompleto }));

  const manejarSubmit = async (data: FormularioDonacionData) => {
    const dto: CrearDonacionDto | ActualizarDonacionDto = {
      donanteNombre: data.donanteNombre,
      tipo: data.tipo,
      monto: data.monto ?? undefined,
      descripcion: data.descripcion || undefined,
      fecha: data.fecha,
      reciboNumero: data.reciboNumero || undefined,
      campanaId: data.campanaId || undefined,
      voluntarioId: data.voluntarioId || undefined,
    };
    await onSubmit(dto);
  };

  const esMonetaria = form.watch('tipo') === 'Monetaria';

  return (
    <form id="formulario-dialogo" onSubmit={form.handleSubmit(manejarSubmit)} noValidate>
      <Box component="fieldset" sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
          Información de la donación
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="donanteNombre"
              control={form.control}
              rules={{ required: 'El nombre del donante es requerido' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Nombre del donante *"
                  {...field}
                  error={!!form.formState.errors.donanteNombre}
                  helperText={form.formState.errors.donanteNombre?.message}
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
                  <option value="Monetaria">Monetaria</option>
                  <option value="EnEspecie">En especie</option>
                </TextField>
              )}
            />
          </Grid>
          {esMonetaria && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="monto"
                control={form.control}
                rules={{ required: 'El monto es requerido para donaciones monetarias', min: 0.01 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Monto (CRC) *"
                    type="number"
                    slotProps={{
                      htmlInput: { step: '0.01', min: '0.01', max: '9999999999.99' },
                    }}
                    {...field}
                    value={field.value ?? ''}
                    error={!!form.formState.errors.monto}
                    helperText={form.formState.errors.monto?.message}
                  />
                )}
              />
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="fecha"
              control={form.control}
              rules={{ required: 'La fecha es requerida' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Fecha *"
                  type="date"
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
              name="reciboNumero"
              control={form.control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Número de recibo"
                  {...field}
                  error={!!form.formState.errors.reciboNumero}
                  helperText={form.formState.errors.reciboNumero?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="campanaId"
              control={form.control}
              render={({ field }) => (
                <SelectorEntidad
                  opciones={opcionesCampanas}
                  value={field.value ?? null}
                  onChange={field.onChange}
                  label="Campaña"
                  cargando={campanasCargando}
                  error={!!form.formState.errors.campanaId}
                  helperText={form.formState.errors.campanaId?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="voluntarioId"
              control={form.control}
              render={({ field }) => (
                <SelectorEntidad
                  opciones={opcionesVoluntarios}
                  value={field.value ?? null}
                  onChange={field.onChange}
                  label="Voluntario"
                  cargando={voluntariosCargando}
                  error={!!form.formState.errors.voluntarioId}
                  helperText={form.formState.errors.voluntarioId?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>

      {!esMonetaria && (
        <Box component="fieldset" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
            Detalle (donación en especie)
          </Typography>
          <Controller
            name="descripcion"
            control={form.control}
            rules={{ required: 'La descripción es requerida para donaciones en especie' }}
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
      )}
    </form>
  );
}