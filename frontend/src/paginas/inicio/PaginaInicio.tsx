import { useMemo } from 'react';
import { useStoreSesion } from '../../store/storeSesion';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Skeleton,
  Divider,
} from '@mui/material';
import {
  People,
  VolunteerActivism,
  Campaign,
  AttachMoney,
  MedicalServices,
  Event,
  Assessment,
  AccountBalanceWallet,
  Paid,
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
import { EncabezadoPagina } from '../../componentes/EncabezadoPagina';
import { GraficoArea, GraficoBarras } from '../../componentes/Graficos';
import logoLeones from '../../assets/logo-leones-san-ramon.jpeg';

// Tonalidades complementarias a la paleta Lions (azul #00338D / dorado #FDB913)
const tarjetasResumen = [
  { titulo: 'Beneficiarios', icono: <People />, color: '#00338D', subtitulo: 'registrados' },
  { titulo: 'Voluntarios', icono: <VolunteerActivism />, color: '#2D6BE0', subtitulo: 'en el club' },
  { titulo: 'Campañas', icono: <Campaign />, color: '#C89211', subtitulo: 'registradas' },
  { titulo: 'Recaudado', icono: <AttachMoney />, color: '#FDB913', subtitulo: 'donaciones' },
  { titulo: 'Ayudas Sociales', icono: <MedicalServices />, color: '#00838F', subtitulo: 'registradas' },
  { titulo: 'Actividades', icono: <Event />, color: '#6A1B9A', subtitulo: 'programadas' },
];

const nombresMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function TarjetaEstadistica({
  titulo,
  icono,
  color,
  valor,
  subtitulo,
  cargando,
}: {
  titulo: string;
  icono: React.ReactNode;
  color: string;
  valor: number | string;
  subtitulo: string;
  cargando: boolean;
}) {
  if (cargando) {
    return (
      <Card sx={{ height: '100%' }}>
        <EsqueletoTarjeta />
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        p: 2.25,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-3px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="overline"
            sx={{ fontSize: '0.68rem', letterSpacing: '0.06em', color: 'text.secondary' }}
          >
            {titulo}
          </Typography>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: '1.65rem',
              lineHeight: 1.15,
              color,
              mt: 0.5,
              mb: 0.25,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {valor}
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {subtitulo}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 52,
            height: 52,
            flexShrink: 0,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${color}1C`,
            color,
          }}
        >
          {icono}
        </Box>
      </Box>
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

  // ── Serie mensual de donaciones (últimos 6 meses) ──
  const serieDonaciones = useMemo(() => {
    if (!donaciones || donaciones.length === 0) return { valores: [], etiquetas: [] };
    const ultima = donaciones.reduce((max, d) => Math.max(max, new Date(d.fecha).getTime()), 0);
    const referencia = ultima ? new Date(ultima) : new Date();
    const meses: { y: number; m: number }[] = [];
    for (let k = 5; k >= 0; k--) {
      const d = new Date(referencia.getFullYear(), referencia.getMonth() - k, 1);
      meses.push({ y: d.getFullYear(), m: d.getMonth() });
    }
    const suma = new Map(meses.map((mm) => [`${mm.y}-${mm.m}`, 0]));
    donaciones.forEach((d) => {
      const f = new Date(d.fecha);
      const clave = `${f.getFullYear()}-${f.getMonth()}`;
      if (suma.has(clave)) suma.set(clave, (suma.get(clave) || 0) + (d.monto || 0));
    });
    return {
      valores: meses.map((mm) => suma.get(`${mm.y}-${mm.m}`) || 0),
      etiquetas: meses.map((mm) => nombresMeses[mm.m]),
    };
  }, [donaciones]);

  // ── Recaudación por campaña (donaciones vinculadas) ──
  const barrasCampanas = useMemo(() => {
    if (!campanas || campanas.length === 0) return [];
    return campanas
      .filter((c) => c.objetivoMonto)
      .map((c) => ({
        etiqueta: c.nombre,
        valor: (donaciones || [])
          .filter((d) => d.campanaId === c.id)
          .reduce((s, d) => s + (d.monto || 0), 0),
      }))
      .filter((c) => c.valor > 0)
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 6);
  }, [campanas, donaciones]);

  const campanasActivas = campanas?.filter((c) => c.estado === 'Activa').slice(0, 3) || [];
  const proximasActividades = actividades
    ?.filter((a) => new Date(a.fecha) >= new Date())
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 3) || [];

  const metricasClub = [
    { icono: <People fontSize="small" />, valor: beneficiarios?.length || 0, etiqueta: 'Beneficiarios' },
    { icono: <VolunteerActivism fontSize="small" />, valor: voluntarios?.length || 0, etiqueta: 'Voluntarios' },
    { icono: <MedicalServices fontSize="small" />, valor: ayudas?.length || 0, etiqueta: 'Ayudas' },
    { icono: <Event fontSize="small" />, valor: actividades?.length || 0, etiqueta: 'Actividades' },
  ];

  return (
    <Box>
      <EncabezadoPagina
        titulo="Panel de control"
        descripcion={`Bienvenido, ${nombreVoluntario || nombreUsuario} (${rol})`}
        acciones={
          <Chip
            icon={<Assessment />}
            label="Resumen general"
            variant="outlined"
            color="primary"
          />
        }
      />

      {/* ── Fila de tarjetas de estadística ── */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {tarjetasResumen.map((tarjeta, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }} key={tarjeta.titulo}>
            <TarjetaEstadistica
              titulo={tarjeta.titulo}
              icono={tarjeta.icono}
              color={tarjeta.color}
              valor={datosTarjetas[index].valor}
              subtitulo={tarjeta.titulo === 'Recaudado' ? `${donaciones?.length || 0} donaciones` : tarjeta.subtitulo}
              cargando={datosTarjetas[index].cargando}
            />
          </Grid>
        ))}
      </Grid>

      {/* ── Gráfico de área + tarjeta destacada con gradiente ── */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Resumen de donaciones</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monto recaudado por mes
                  </Typography>
                </Box>
                <Chip
                  variant="outlined"
                  color="primary"
                  label={`Total: ${formatoMoneda(totalDonaciones)}`}
                />
              </Box>

              {cargandoDonaciones ? (
                <Skeleton variant="rounded" height={200} />
              ) : serieDonaciones.valores.length === 0 ? (
                <EstadoVacio
                  icono={<Paid />}
                  titulo="Sin donaciones"
                  descripcion="Las donaciones registradas aparecerán en el gráfico."
                />
              ) : (
                <GraficoArea
                  valores={serieDonaciones.valores}
                  etiquetas={serieDonaciones.etiquetas}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Tarjeta destacada con gradiente institucional */}
          <Card
            sx={{
              height: '100%',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #001F5C 0%, #00338D 45%, #1A4FA0 100%)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': { transform: 'none' },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -60,
                right: -50,
                width: 180,
                height: 180,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(253, 185, 19, 0.35) 0%, transparent 70%)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -70,
                left: -40,
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
              }}
            />
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
                py: 3.5,
              }}
            >
              <Box
                sx={{
                  width: 92,
                  height: 92,
                  borderRadius: '24px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  mb: 2,
                  boxShadow: '0 12px 26px -10px rgba(0, 0, 0, 0.45)',
                }}
              >
                <Box
                  component="img"
                  src={logoLeones}
                  alt="Club de Leones de San Ramón"
                  sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity: 0.85,
                  mb: 1,
                }}
              >
                Club de Leones de San Ramón
              </Typography>
              <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.25, mb: 1 }}>
                Servimos a la comunidad
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', opacity: 0.85, maxWidth: 280, lineHeight: 1.5 }}>
                Las campañas y ayudas del Club impulsan el desarrollo social de la región.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ── Tarjeta oscura con barras + métricas del club / listas ── */}
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card
            sx={{
              height: '100%',
              color: '#FFFFFF',
              background: 'linear-gradient(160deg, #0B1B3A 0%, #081127 100%)',
              '&:hover': { transform: 'none' },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(253, 185, 19, 0.16)',
                    color: '#FDB913',
                  }}
                >
                  <AccountBalanceWallet />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>
                    Recaudación por campaña
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
                    Donaciones vinculadas a campañas
                  </Typography>
                </Box>
              </Box>

              {cargandoCampanas || cargandoDonaciones ? (
                <Skeleton variant="rounded" height={150} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }} />
              ) : barrasCampanas.length === 0 ? (
                <EstadoVacio
                  icono={<Campaign />}
                  titulo="Sin recaudación asociada"
                  descripcion="Las donaciones vinculadas a campañas se graficarán aquí."
                />
              ) : (
                <GraficoBarras datos={barrasCampanas} />
              )}

              <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,0.08)' }} />

              <Typography
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(253, 185, 19, 0.9)',
                  mb: 1.5,
                }}
              >
                El club en cifras
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 1.5 }}>
                {metricasClub.map((metrica) => (
                  <Box
                    key={metrica.etiqueta}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                      p: 1.25,
                      borderRadius: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        flexShrink: 0,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(253, 185, 19, 0.14)',
                        color: '#FDB913',
                      }}
                    >
                      {metrica.icono}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.1 }}>
                        {metrica.valor}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.68rem',
                          color: 'rgba(255,255,255,0.6)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {metrica.etiqueta}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Campañas activas</Typography>
              </Box>
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
                      mb: 1.25,
                      p: 1.5,
                      borderRadius: '14px',
                      backgroundColor: 'rgba(15, 36, 71, 0.03)',
                      transition: 'background-color 0.15s ease-in-out, transform 0.15s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 51, 141, 0.05)',
                        transform: 'translateX(2px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        {campana.nombre}
                      </Typography>
                      <Chip size="small" label="Activa" color="success" sx={{ bgcolor: 'rgba(46,125,50,0.12)', color: '#1E7A26', fontWeight: 600 }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {formatoFechaCorta(campana.fechaInicio)}
                      {campana.fechaFin ? ` - ${formatoFechaCorta(campana.fechaFin)}` : ''}
                    </Typography>
                    {campana.objetivoMonto && (
                      <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        Meta: {formatoMoneda(campana.objetivoMonto)}
                      </Typography>
                    )}
                  </Box>
                ))
              )}

              <Divider sx={{ my: 2.5 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Próximas actividades</Typography>
              </Box>
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
                      mb: 1.25,
                      p: 1.5,
                      borderRadius: '14px',
                      backgroundColor: 'rgba(15, 36, 71, 0.03)',
                      transition: 'background-color 0.15s ease-in-out, transform 0.15s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 51, 141, 0.05)',
                        transform: 'translateX(2px)',
                      },
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {actividad.nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatoFechaCorta(actividad.fecha)}
                      {actividad.lugar ? ` · ${actividad.lugar}` : ''}
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