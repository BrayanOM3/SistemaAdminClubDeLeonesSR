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

const tarjetasResumen = [
  { titulo: 'Beneficiarios', icono: <People />, color: '#1B5E20', hook: useBeneficiarios, campo: 'length' },
  { titulo: 'Voluntarios', icono: <VolunteerActivism />, color: '#2E7D32', hook: useVoluntarios, campo: 'length' },
  { titulo: 'Campañas', icono: <Campaign />, color: '#388E3C', hook: useCampanas, campo: 'length' },
  { titulo: 'Donaciones', icono: <AttachMoney />, color: '#43A047', hook: useDonaciones, campo: 'montoTotal' },
  { titulo: 'Ayudas Sociales', icono: <MedicalServices />, color: '#4CAF50', hook: useAyudasSociales, campo: 'length' },
  { titulo: 'Actividades', icono: <Event />, color: '#66BB6A', hook: useActividades, campo: 'length' },
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
  return (
    <Card sx={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {titulo}
            </Typography>
            {cargando ? (
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                <span aria-hidden="true">···</span>
              </Typography>
            ) : (
              <Typography variant="h4" sx={{ fontWeight: 600, color }}>
                {valor}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: color + '15', width: 48, height: 48 }}>
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
          <Grid item xs={12} sm={6} lg={4} xl={2} key={tarjeta.titulo}>
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
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Campañas activas
              </Typography>
              {campanasActivas.length === 0 ? (
                <Typography color="text.secondary">No hay campañas activas</Typography>
              ) : (
                campanasActivas.map((campana) => (
                  <Box key={campana.id} sx={{ mb: 2, p: 1, borderRadius: 1, bgcolor: 'action.hover' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {campana.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatoFechaCorta(campana.fechaInicio)} - {campana.fechaFin ? formatoFechaCorta(campana.fechaFin) : 'Sin fecha fin'}
                    </Typography>
                    {campana.objetivoMonto && (
                      <Typography variant="caption" color="primary.main">
                        Meta: {formatoMoneda(campana.objetivoMonto)}
                      </Typography>
                    )}
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Próximas actividades
              </Typography>
              {proximasActividades.length === 0 ? (
                <Typography color="text.secondary">No hay actividades programadas</Typography>
              ) : (
                proximasActividades.map((actividad) => (
                  <Box key={actividad.id} sx={{ mb: 2, p: 1, borderRadius: 1, bgcolor: 'action.hover' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
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