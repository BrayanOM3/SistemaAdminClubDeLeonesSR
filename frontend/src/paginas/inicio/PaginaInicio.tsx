import { useStoreSesion } from '../../store/storeSesion';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
} from '@mui/material';
import {
  People,
  VolunteerActivism,
  Campaign,
  AttachMoney,
  MedicalServices,
  Event,
  Assessment,
} from '@mui/icons-material';
import { useBeneficiarios } from '../../hooks/useBeneficiarios';
import { useVoluntarios } from '../../hooks/useVoluntarios';
import { useCampanas } from '../../hooks/useCampanas';
import { useDonaciones } from '../../hooks/useDonaciones';
import { useAyudasSociales } from '../../hooks/useAyudasSociales';
import { useActividades } from '../../hooks/useActividades';
import { formatoMoneda, formatoFechaCorta } from '../../utilidades/formateadores';
import { EsqueletoTarjeta, EsqueletoLista } from '../../componentes/EstadoCargando';
import { EstadoVacio } from '../../componentes/EstadoVacio';

// Tonalidades complementarias a la paleta Lions (azul #00338D / dorado #FDB913)
const tarjetasResumen = [
  { titulo: 'Beneficiarios', icono: <People />, color: '#00338D', hook: useBeneficiarios, campo: 'length' },
  { titulo: 'Voluntarios', icono: <VolunteerActivism />, color: '#2D6BE0', hook: useVoluntarios, campo: 'length' },
  { titulo: 'Campañas', icono: <Campaign />, color: '#C89211', hook: useCampanas, campo: 'length' },
  { titulo: 'Donaciones', icono: <AttachMoney />, color: '#FDB913', hook: useDonaciones, campo: 'montoTotal' },
  { titulo: 'Ayudas Sociales', icono: <MedicalServices />, color: '#00838F', hook: useAyudasSociales, campo: 'length' },
  { titulo: 'Actividades', icono: <Event />, color: '#6A1B9A', hook: useActividades, campo: 'length' },
];

function TarjetaResumen({
  titulo,
  icono,
  color,
  valor,
  cargando,
}: {
  titulo: string;
  icono: React.ReactNode;
  color: string;
  valor: number | string;
  cargando: boolean;
}) {
  if (cargando) {
    return (
      <Card sx={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <EsqueletoTarjeta />
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(0, 51, 141, 0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {titulo}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color }}>
              {valor}
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: color + '15',
              color,
              width: 48,
              height: 48,
              boxShadow: `inset 0 0 0 1px ${color}22`,
            }}
          >
            {icono}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

export function PaginaInicio() {
  const { nombreVoluntario, nombreUsuario, rol } = useStoreSesion();

  const { data: beneficiarios, isLoading: cargandoBeneficiarios } = useBeneficiarios();
  const { data: voluntarios, isLoading: cargandoVoluntarios } = useVoluntarios();
  const { data: campanas, isLoading: cargandoCampanas } = useCampanas();
  const { data: donaciones, isLoading: cargandoDonaciones } = useDonaciones();
  const { data: ayudas, isLoading: cargandoAyudas } = useAyudasSociales();
  const { data: actividades, isLoading: cargandoActividades } = useActividades();

  const totalDonaciones = donaciones?.reduce((sum, d) => sum + (d.monto || 0), 0) || 0;

  const datosTarjetas = [
    { valor: beneficiarios?.length || 0, cargando: cargandoBeneficiarios },
    { valor: voluntarios?.length || 0, cargando: cargandoVoluntarios },
    { valor: campanas?.length || 0, cargando: cargandoCampanas },
    { valor: formatoMoneda(totalDonaciones), cargando: cargandoDonaciones },
    { valor: ayudas?.length || 0, cargando: cargandoAyudas },
    { valor: actividades?.length || 0, cargando: cargandoActividades },
  ];

  const campanasActivas = campanas?.filter((c) => c.estado === 'Activa').slice(0, 3) || [];
  const proximasActividades = actividades
    ?.filter((a) => new Date(a.fecha) >= new Date())
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 3) || [];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Panel de control
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bienvenido, {nombreVoluntario || nombreUsuario} ({rol})
          </Typography>
        </Box>
        <Chip
          icon={<Assessment />}
          label="Resumen general"
          variant="outlined"
          color="primary"
        />
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {tarjetasResumen.map((tarjeta, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }} key={tarjeta.titulo}>
            <TarjetaResumen
              titulo={tarjeta.titulo}
              icono={tarjeta.icono}
              color={tarjeta.color}
              valor={datosTarjetas[index].valor}
              cargando={datosTarjetas[index].cargando}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Campañas activas
              </Typography>
              {cargandoCampanas ? (
                <EsqueletoLista items={3} />
              ) : campanasActivas.length === 0 ? (
                <EstadoVacio
                  icono={<Campaign />}
                  titulo="Sin campañas activas"
                  descripcion="Las campañas en curso aparecerán aquí."
                />
              ) : (
                campanasActivas.map((campana) => (
                  <Box
                    key={campana.id}
                    sx={{
                      mb: 2,
                      p: 1.5,
                      borderRadius: 1.5,
                      bgcolor: 'rgba(0, 51, 141, 0.025)',
                      border: '1px solid rgba(0, 51, 141, 0.06)',
                      transition: 'background-color 0.15s ease-in-out',
                      '&:hover': {
                        bgcolor: 'rgba(0, 51, 141, 0.05)',
                      },
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {campana.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {formatoFechaCorta(campana.fechaInicio)} - {campana.fechaFin ? formatoFechaCorta(campana.fechaFin) : 'Sin fecha fin'}
                    </Typography>
                    {campana.objetivoMonto && (
                      <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500 }}>
                        Meta: {formatoMoneda(campana.objetivoMonto)}
                      </Typography>
                    )}
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Próximas actividades
              </Typography>
              {cargandoActividades ? (
                <EsqueletoLista items={3} />
              ) : proximasActividades.length === 0 ? (
                <EstadoVacio
                  icono={<Event />}
                  titulo="Sin actividades programadas"
                  descripcion="Las próximas actividades del club aparecerán aquí."
                />
              ) : (
                proximasActividades.map((actividad) => (
                  <Box
                    key={actividad.id}
                    sx={{
                      mb: 2,
                      p: 1.5,
                      borderRadius: 1.5,
                      bgcolor: 'rgba(0, 51, 141, 0.025)',
                      border: '1px solid rgba(0, 51, 141, 0.06)',
                      transition: 'background-color 0.15s ease-in-out',
                      '&:hover': {
                        bgcolor: 'rgba(0, 51, 141, 0.05)',
                      },
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {actividad.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatoFechaCorta(actividad.fecha)} {actividad.lugar ? `· ${actividad.lugar}` : ''}
                    </Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}