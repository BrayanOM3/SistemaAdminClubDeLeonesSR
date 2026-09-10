import { useCallback, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Box, Typography, Chip, Skeleton, Alert, useTheme } from '@mui/material';
import { Campaign, Event, Paid, MedicalServices, ErrorOutlined } from '@mui/icons-material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import type { DatesSetArg, EventClickArg } from '@fullcalendar/core';

import { EncabezadoPagina } from '../../componentes/EncabezadoPagina';
import { FiltrosCalendario } from '../../componentes/calendario/FiltrosCalendario';
import { DialogoDetalle } from '../../componentes/calendario/DialogoDetalle';
import { EsqueletoLista } from '../../componentes/EstadoCargando';
import { EstadoVacio } from '../../componentes/EstadoVacio';
import { useCalendario, useDonacionesDelDia, useAyudasDelDia } from '../../hooks/useCalendario';
import { useCampana } from '../../hooks/useCampanas';
import { useActividad } from '../../hooks/useActividades';
import { idUtilizable } from '../../tipos/calendario';
import type { TipoEventoCalendario } from '../../tipos/calendario';
import type { DonacionDto } from '../../tipos/donacion';
import type { CampanaDto } from '../../tipos/campana';
import type { ActividadDto } from '../../tipos/actividad';
import { ETIQUETA_TIPO, COLORES_EVENTO, TIPOS_EVENTO, eventoAEventoFullCalendar, diaAnterior, hoyYYYYMMDD } from '../../utilidades/calendario';
import { formatoFechaCorta, formatoMoneda, formatoFechaLarga } from '../../utilidades/formateadores';
import { formateadores } from '../../componentes/TablaDatos';

/** Icono por tipo para el modal de detalle y estados vacíos. */
const ICONOS_EVENTO: Record<TipoEventoCalendario, ReactNode> = {
  Campana: <Campaign />,
  Actividad: <Event />,
  Donacion: <Paid />,
  AyudaSocial: <MedicalServices />,
};

/** Datos que transporta cada evento de FullCalendar al hacer click (extendedProps + título). */
interface EventoSeleccionado {
  tipo: TipoEventoCalendario;
  id: string | null;
  esAgregado: boolean;
  fechaInicio: string;
  titulo: string;
  cantidadAgregada?: number | null;
  montoTotalAgregado?: number | null;
}

// ── Fila etiqueta → valor del modal de detalle ──────────────────────────
function FilaDetalle({ etiqueta, valor }: { etiqueta: string; valor: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 2,
        py: 1,
        borderBottom: 1,
        borderColor: 'divider',
        '&:last-of-type': { borderBottom: 'none' },
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, flexShrink: 0 }}>
        {etiqueta}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>{valor}</Typography>
    </Box>
  );
}

/** Detalle singular de una campaña — reutiliza GET /campanas/{id} (cargado por la página). */
function ContenidoCampana({ campana }: { campana: CampanaDto }) {
  return (
    <Box>
      {campana.descripcion && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.6 }}>
          {campana.descripcion}
        </Typography>
      )}
      <Box>
        <FilaDetalle etiqueta="Estado" valor={formateadores.estado(campana.estado)} />
        <FilaDetalle etiqueta="Tipo" valor={formateadores.estado(campana.tipo)} />
        <FilaDetalle etiqueta="Inicio" valor={formatoFechaCorta(campana.fechaInicio)} />
        {campana.fechaFin && <FilaDetalle etiqueta="Fin" valor={formatoFechaCorta(campana.fechaFin)} />}
        {campana.objetivoMonto ? (
          <FilaDetalle etiqueta="Objetivo de recaudación" valor={formatoMoneda(campana.objetivoMonto)} />
        ) : null}
      </Box>
    </Box>
  );
}

/** Detalle singular de una actividad — reutiliza GET /actividades/{id} (cargado por la página). */
function ContenidoActividad({ actividad }: { actividad: ActividadDto }) {
  return (
    <Box>
      {actividad.descripcion && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.6 }}>
          {actividad.descripcion}
        </Typography>
      )}
      <Box>
        <FilaDetalle etiqueta="Tipo" valor={formateadores.estado(actividad.tipo)} />
        <FilaDetalle etiqueta="Fecha" valor={formatoFechaLarga(actividad.fecha)} />
        {actividad.lugar && <FilaDetalle etiqueta="Lugar" valor={actividad.lugar} />}
        {actividad.campanaId && (
          <FilaDetalle etiqueta="Campaña" valor={formateadores.guidCorto(actividad.campanaId)} />
        )}
      </Box>
    </Box>
  );
}

/** Tarjeta compacta de una donación del día (no tabla, para evitar scroll anidado en el modal). */
function TarjetaDonacion({ donacion }: { donacion: DonacionDto }) {
  return (
    <Box
      sx={{
        mb: 1,
        p: 1.5,
        borderRadius: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 36, 71, 0.03)',
        border: (theme) =>
          theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.92rem' }}>{donacion.donanteNombre}</Typography>
        {donacion.monto ? (
          <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
            {formatoMoneda(donacion.monto)}
          </Typography>
        ) : null}
      </Box>
      <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        {formateadores.estado(donacion.tipo)}
        {donacion.descripcion && (
          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
            {donacion.descripcion}
          </Typography>
        )}
      </Box>
      {(donacion.nombreCampana || donacion.nombreVoluntario || donacion.reciboNumero) && (
        <Box sx={{ mt: 0.5 }}>
          {donacion.nombreCampana && (
            <Typography variant="caption" color="text.secondary">Campaña: {donacion.nombreCampana}</Typography>
          )}
          {donacion.nombreVoluntario && (
            <Typography variant="caption" color="text.secondary">
              {donacion.nombreCampana ? ' · ' : ''}Voluntario: {donacion.nombreVoluntario}
            </Typography>
          )}
          {donacion.reciboNumero && (
            <Typography variant="caption" color="text.secondary">
              {donacion.nombreCampana || donacion.nombreVoluntario ? ' · ' : ''}Recibo: {donacion.reciboNumero}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

/** Lista completa de donaciones de un día (GET /calendario/{fecha}/donaciones on-demand). */
function ListaRegistrosDonaciones({ fecha, totalAgregado }: { fecha: string; totalAgregado?: number | null }) {
  const { data, isPending, isError } = useDonacionesDelDia(fecha, true);
  if (isPending) return <EsqueletoLista items={4} />;
  if (isError) {
    return <EstadoVacio icono={<ErrorOutlined />} titulo="Error" descripcion="No se pudieron cargar las donaciones del día." />;
  }
  if (!data || data.length === 0) {
    return <EstadoVacio icono={<Paid />} titulo="Sin donaciones" descripcion="No hay donaciones registradas para este día." />;
  }
  return (
    <Box>
      <Chip
        size="small"
        variant="outlined"
        color="info"
        label={`${data.length} donaciones${totalAgregado ? ` · ${formatoMoneda(totalAgregado)}` : ''}`}
        sx={{ mb: 1.5, fontWeight: 600, borderRadius: 1.5 }}
      />
      {data.map((donacion) => (
        <TarjetaDonacion key={donacion.id} donacion={donacion} />
      ))}
    </Box>
  );
}

/** Lista completa de ayudas sociales de un día (GET /calendario/{fecha}/ayudas-sociales on-demand). */
function ListaRegistrosAyudas({ fecha, totalAgregado }: { fecha: string; totalAgregado?: number | null }) {
  const { data, isPending, isError } = useAyudasDelDia(fecha, true);
  if (isPending) return <EsqueletoLista items={4} />;
  if (isError) {
    return <EstadoVacio icono={<ErrorOutlined />} titulo="Error" descripcion="No se pudieron cargar las ayudas del día." />;
  }
  if (!data || data.length === 0) {
    return <EstadoVacio icono={<MedicalServices />} titulo="Sin ayudas" descripcion="No hay ayudas sociales registradas para este día." />;
  }
  return (
    <Box>
      <Chip
        size="small"
        variant="outlined"
        color="info"
        label={`${data.length} ayudas${totalAgregado ? ` · ${formatoMoneda(totalAgregado)}` : ''}`}
        sx={{ mb: 1.5, fontWeight: 600, borderRadius: 1.5 }}
      />
      {data.map((ayuda) => (
        <Box
          key={ayuda.id}
          sx={{
            mb: 1,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 36, 71, 0.03)',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.92rem' }}>{ayuda.nombreBeneficiario}</Typography>
            {ayuda.monto ? (
              <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                {formatoMoneda(ayuda.monto)}
              </Typography>
            ) : null}
          </Box>
          <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {formateadores.estado(ayuda.estado)}
            {formateadores.estado(ayuda.tipo)}
          </Box>
          {ayuda.descripcion && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, lineHeight: 1.4 }}>
              {ayuda.descripcion}
            </Typography>
          )}
          {(ayuda.nombreCampana || ayuda.nombreVoluntario) && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
              {[ayuda.nombreCampana && `Campaña: ${ayuda.nombreCampana}`, ayuda.nombreVoluntario && `Voluntario: ${ayuda.nombreVoluntario}`]
                .filter(Boolean)
                .join(' · ')}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

export function PaginaCalendario() {
  const theme = useTheme();
  const esOscuro = theme.palette.mode === 'dark';

  // Rango visible: null hasta el primer datesSet (evita query vacía en el primer render).
  const [rango, setRango] = useState<{ desde: string; hasta: string } | null>(null);
  // Filtro por tipo: array vacío = todos. Filtra en cliente, sin refetch.
  const [tiposActivos, setTiposActivos] = useState<TipoEventoCalendario[]>([]);
  const [seleccionado, setSeleccionado] = useState<EventoSeleccionado | null>(null);
  const [fechaInicial] = useState(() => hoyYYYYMMDD());

  // isPending solo es true en la primera carga (keepPreviousData lo mantiene false al navegar de mes).
  const { data: eventos = [], isError, isPending } = useCalendario(rango?.desde ?? '', rango?.hasta ?? '');

  // datesSet idempotente: absorbe el double-fire de StrictMode comparando con el rango previo.
  const manejarDatesSet = useCallback((arg: DatesSetArg) => {
    const desde = arg.startStr.slice(0, 10);
    const hasta = diaAnterior(arg.endStr.slice(0, 10)); // end de FC es exclusivo
    setRango((prev) => (prev && prev.desde === desde && prev.hasta === hasta ? prev : { desde, hasta }));
  }, []);

  const eventosCalendario = useMemo(() => {
    const visibles = eventos.filter((ev) => tiposActivos.length === 0 || tiposActivos.includes(ev.tipo));
    return visibles.map((ev) => eventoAEventoFullCalendar(ev, esOscuro));
  }, [eventos, tiposActivos, esOscuro]);

  const manejarEventClick = useCallback((arg: EventClickArg) => {
    const ep = arg.event.extendedProps as Omit<EventoSeleccionado, 'titulo'>;
    setSeleccionado({ ...ep, titulo: arg.event.title });
  }, []);

  // Detalle singular (Campaña/Actividad): el id Guid.Empty de los agregados se normaliza a null.
  const idDetalle = useMemo(() => {
    if (!seleccionado || seleccionado.esAgregado) return '';
    return idUtilizable(seleccionado.id) ?? '';
  }, [seleccionado]);

  // Hooks siempre llamados (regla de hooks); con '' quedan deshabilitados (enabled: !!id) hasta el click.
  const { data: campana, isPending: cargandoCampana, isError: hayErrorCampana } = useCampana(
    seleccionado?.tipo === 'Campana' ? idDetalle : '',
  );
  const { data: actividad, isPending: cargandoActividad, isError: hayErrorActividad } = useActividad(
    seleccionado?.tipo === 'Actividad' ? idDetalle : '',
  );

  // ── Variables CSS scoped a .fc (mecanismo oficial v6) → el toggle claro/oscuro se propaga en vivo ──
  const varsFullCalendar = useMemo<CSSProperties>(() => {
    const p = theme.palette;
    const neutroFondo = esOscuro ? 'rgba(255,255,255,0.03)' : 'rgba(15,36,71,0.02)';
    const hoyFondo = esOscuro ? 'rgba(253,185,19,0.10)' : 'rgba(0,51,141,0.045)';
    return {
      '--fc-page-bg-color': p.background.paper,
      '--fc-neutral-bg-color': neutroFondo,
      '--fc-neutral-text-color': p.text.primary,
      '--fc-page-text-color': p.text.primary,
      '--fc-text-color': p.text.primary,
      '--fc-border-color': p.divider,
      '--fc-button-text-color': p.primary.contrastText,
      '--fc-button-bg-color': p.primary.main,
      '--fc-button-border-color': p.primary.main,
      '--fc-button-hover-bg-color': p.primary.dark,
      '--fc-button-hover-border-color': p.primary.dark,
      '--fc-button-active-bg-color': p.primary.dark,
      '--fc-button-active-border-color': p.primary.dark,
      '--fc-today-bg-color': hoyFondo,
      '--fc-now-indicator-color': p.primary.main,
      '--fc-more-link-bg-color': esOscuro ? 'rgba(255,255,255,0.10)' : 'rgba(15,36,71,0.05)',
      '--fc-more-link-text-color': p.text.primary,
    } as CSSProperties;
  }, [theme, esOscuro]);

  let contenidoModal: ReactNode = null;
  let iconoModal: ReactNode = null;
  let subtituloModal = '';

  if (seleccionado) {
    const color = COLORES_EVENTO[seleccionado.tipo][esOscuro ? 'oscuro' : 'claro'];
    iconoModal = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: '14px',
          backgroundColor: `${color.fondo}26`,
          color: color.fondo,
        }}
      >
        {ICONOS_EVENTO[seleccionado.tipo]}
      </Box>
    );
    subtituloModal = `${ETIQUETA_TIPO[seleccionado.tipo]} · ${formatoFechaLarga(seleccionado.fechaInicio)}`;

    if (seleccionado.esAgregado) {
      contenidoModal =
        seleccionado.tipo === 'Donacion' ? (
          <ListaRegistrosDonaciones fecha={seleccionado.fechaInicio} totalAgregado={seleccionado.montoTotalAgregado} />
        ) : (
          <ListaRegistrosAyudas fecha={seleccionado.fechaInicio} totalAgregado={seleccionado.montoTotalAgregado} />
        );
    } else if (seleccionado.tipo === 'Campana') {
      contenidoModal = hayErrorCampana || !campana ? (
        <EstadoVacio icono={<ErrorOutlined />} titulo="No se pudo cargar la campaña" descripcion="Intente nuevamente." />
      ) : cargandoCampana ? (
        <EsqueletoLista items={4} />
      ) : (
        <ContenidoCampana campana={campana} />
      );
    } else {
      contenidoModal = hayErrorActividad || !actividad ? (
        <EstadoVacio icono={<ErrorOutlined />} titulo="No se pudo cargar la actividad" descripcion="Intente nuevamente." />
      ) : cargandoActividad ? (
        <EsqueletoLista items={3} />
      ) : (
        <ContenidoActividad actividad={actividad} />
      );
    }
  }

  return (
    <Box>
      <EncabezadoPagina
        titulo="Calendario"
        descripcion="Actividades, campañas, donaciones y ayudas sociales del club en un vistazo."
        acciones={
          <Chip
            variant="outlined"
            color="primary"
            label={rango ? `${formatoFechaCorta(rango.desde)} – ${formatoFechaCorta(rango.hasta)}` : 'Rango visible'}
          />
        }
      />

      <FiltrosCalendario tiposActivos={tiposActivos} onCambiar={setTiposActivos} />

      {isError && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          No se pudieron cargar los eventos del calendario. Verifique la conexión con el servidor.
        </Alert>
      )}

      {/* Leyenda de colores por tipo */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
        {TIPOS_EVENTO.map((tipo) => {
          const color = COLORES_EVENTO[tipo][esOscuro ? 'oscuro' : 'claro'];
          return (
            <Box key={tipo} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '4px', backgroundColor: color.fondo }} />
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {ETIQUETA_TIPO[tipo]}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ borderRadius: 3, overflow: 'hidden', border: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Box
          className="fc-shell"
          style={varsFullCalendar}
          sx={{ p: { xs: 1, sm: 2 }, position: 'relative' }}
        >
          {/* Skeleton overlay: solo cuando ya se disparó el primer datesSet y estamos refrescando */}
          {rango !== null && isPending && (
            <Skeleton
              variant="rounded"
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 5,
                borderRadius: 'inherit',
              }}
            />
          )}

          {/* FullCalendar siempre montado — datesSet dispara rango → la query se habilita */}
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            initialDate={fechaInicial}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek',
            }}
            locale={esLocale}
            buttonText={{ today: 'Hoy', month: 'Mes', week: 'Semana', day: 'Día', list: 'Lista' }}
            dayMaxEvents={3}
            events={eventosCalendario}
            eventClick={manejarEventClick}
            datesSet={manejarDatesSet}
            height="auto"
            /* timeGrid mantiene el texto allDay en español */
            allDayText="Todo el día"
            timeZone="local"
          />
        </Box>
      </Box>

      {/* ── Modal de detalle según el tipo de evento clickeado ── */}
      <DialogoDetalle
        open={Boolean(seleccionado)}
        onClose={() => setSeleccionado(null)}
        titulo={seleccionado?.titulo ?? ''}
        subtitulo={subtituloModal}
        icono={iconoModal}
        ancho={seleccionado?.esAgregado ? 'lg' : 'sm'}
      >
        {contenidoModal}
      </DialogoDetalle>
    </Box>
  );
}