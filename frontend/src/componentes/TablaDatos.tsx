import type { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Tooltip,
  Paper,
  Box,
  Typography,
  InputBase,
  useTheme,
} from '@mui/material';
import { Search, InboxOutlined } from '@mui/icons-material';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { formatoFechaCorta, formatoMoneda } from '../utilidades/formateadores';
import { EsqueletoTabla } from './EstadoCargando';

export interface ColumnaTabla<T> {
  campo: keyof T | string;
  encabezado: string;
  ancho?: string;
  alinear?: 'left' | 'center' | 'right' | 'inherit' | 'justify';
  formatear?: (valor: unknown, fila: T) => ReactNode;
  ordenable?: boolean;
}

export interface AccionTabla<T> {
  icono: ReactNode;
  etiqueta: string;
  onClick: (fila: T) => void;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success';
  deshabilitado?: (fila: T) => boolean;
}

interface TablaDatosProps<T> {
  datos: T[];
  columnas: ColumnaTabla<T>[];
  acciones?: AccionTabla<T>[];
  claveUnica: keyof T | string;
  titulo?: string;
  buscarPlaceholder?: string;
  paginacion?: boolean;
  filasPorPaginaInicial?: number;
  cargando?: boolean;
  vacioMensaje?: string;
  onRowClick?: (fila: T) => void;
}

export function TablaDatos<T>({
  datos,
  columnas,
  acciones,
  claveUnica,
  titulo,
  buscarPlaceholder = 'Buscar...',
  paginacion = true,
  filasPorPaginaInicial = 10,
  cargando = false,
  vacioMensaje = 'No hay datos para mostrar',
  onRowClick,
}: TablaDatosProps<T>) {
  const [orden, setOrden] = useState<{ campo: string; direccion: 'asc' | 'desc' }>({ campo: '', direccion: 'asc' });
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(filasPorPaginaInicial);
  const [busqueda, setBusqueda] = useState('');
  const [busquedaDebounced, setBusquedaDebounced] = useState('');

  // Debounce en la búsqueda (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setBusquedaDebounced(busqueda);
    }, 300);
    return () => clearTimeout(timer);
  }, [busqueda]);

  // Reset página al buscar
  useEffect(() => {
    setPagina(0);
  }, [busquedaDebounced]);

  const datosFiltrados = useMemo(() => {
    let resultado = [...datos];

    if (busquedaDebounced.trim()) {
      const termino = busquedaDebounced.toLowerCase().trim();
      resultado = resultado.filter((fila) =>
        Object.values(fila as Record<string, unknown>).some(
          (valor) => valor?.toString().toLowerCase().includes(termino)
        )
      );
    }

    if (orden.campo) {
      resultado.sort((a, b) => {
        const filaA = a as Record<string, unknown>;
        const filaB = b as Record<string, unknown>;
        const valorA = filaA[orden.campo];
        const valorB = filaB[orden.campo];
        if (valorA === valorB) return 0;
        const strA = String(valorA ?? '');
        const strB = String(valorB ?? '');
        const comparacion = strA.localeCompare(strB);
        return orden.direccion === 'asc' ? comparacion : -comparacion;
      });
    }

    return resultado;
  }, [datos, busquedaDebounced, orden]);

  const datosPaginados = paginacion
    ? datosFiltrados.slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
    : datosFiltrados;

  const manejarOrden = useCallback((campo: string) => {
    setOrden((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const manejarCambioPagina = useCallback((_: unknown, nuevaPagina: number) => {
    setPagina(nuevaPagina);
  }, []);

  const manejarCambioFilasPorPagina = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFilasPorPagina(Number(event.target.value));
    setPagina(0);
  }, []);

  const manejarClicFila = useCallback((fila: T) => {
    if (onRowClick) onRowClick(fila);
  }, [onRowClick]);

  const totalColumnas = columnas.length + (acciones && acciones.length > 0 ? 1 : 0);

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        borderRadius: '20px',
        border: 'none',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 2px 8px rgba(0, 0, 0, 0.3), 0 24px 48px -20px rgba(0, 0, 0, 0.5)'
            : '0 2px 8px rgba(15, 36, 71, 0.03), 0 24px 48px -20px rgba(15, 36, 71, 0.18)',
      }}
    >
      {/* Header con título y búsqueda */}
      <Box
        sx={{
          p: 2.5,
          pb: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        {titulo ? (
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {titulo}
          </Typography>
        ) : (
          <Box />
        )}
        <InputBase
          placeholder={buscarPlaceholder}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={(theme) => {
            const oscuro = theme.palette.mode === 'dark';
            return {
              width: 300,
              borderRadius: '999px',
              backgroundColor: oscuro ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 36, 71, 0.04)',
              transition: 'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:focus-within': {
                backgroundColor: oscuro ? 'rgba(255, 255, 255, 0.12)' : '#FFFFFF',
                boxShadow: oscuro ? '0 0 0 3px rgba(253, 185, 19, 0.16)' : '0 0 0 3px rgba(0, 51, 141, 0.12)',
              },
              '& .MuiInputBase-input': {
                padding: '9px 12px',
                fontSize: '0.875rem',
              },
            };
          }}
          startAdornment={<Search sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />}
          size="small"
        />
      </Box>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columnas.map((columna) => (
                <TableCell
                  key={String(columna.campo)}
                  align={columna.alinear || 'left'}
                  style={{ width: columna.ancho }}
                  sortDirection={orden.campo === String(columna.campo) ? orden.direccion : false}
                >
                  {columna.ordenable !== false ? (
                    <TableSortLabel
                      active={orden.campo === String(columna.campo)}
                      direction={orden.direccion}
                      onClick={() => manejarOrden(String(columna.campo))}
                    >
                      {columna.encabezado}
                    </TableSortLabel>
                  ) : (
                    columna.encabezado
                  )}
                </TableCell>
              ))}
              {acciones && acciones.length > 0 && (
                <TableCell align="right" sx={{ width: 140 }}>
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {cargando ? (
              <EsqueletoTabla columnas={columnas.length} />
            ) : datosPaginados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={totalColumnas} sx={{ p: 0, border: 'none' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      py: 6,
                      px: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 51, 141, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <InboxOutlined sx={{ fontSize: 32, color: 'text.secondary', opacity: 0.5 }} />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
                      {vacioMensaje}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Los registros aparecerán aquí cuando estén disponibles.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              datosPaginados.map((fila, index) => (
                <TableRow
                  key={String(fila[claveUnica as keyof T]) ?? index}
                  hover
                  onClick={() => manejarClicFila(fila)}
                  sx={{
                    cursor: onRowClick ? 'pointer' : 'default',
                    transition: 'background-color 0.15s ease-in-out',
                  }}
                >
                  {columnas.map((columna) => (
                    <TableCell
                      key={String(columna.campo)}
                      align={columna.alinear || 'left'}
                      sx={{ py: 1.25 }}
                    >
                      {columna.formatear
                        ? columna.formatear(fila[columna.campo as keyof T], fila)
                        : String(fila[columna.campo as keyof T] ?? '')}
                    </TableCell>
                  ))}
                  {acciones && acciones.length > 0 && (
                    <TableCell align="right" sx={{ py: 1 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          gap: 0.25,
                          px: 0.5,
                          py: 0.25,
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 51, 141, 0.04)',
                          },
                        }}
                      >
                        {acciones.map((accion, i) => (
                          <Tooltip key={i} title={accion.etiqueta} arrow>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                accion.onClick(fila);
                              }}
                              disabled={accion.deshabilitado?.(fila)}
                              color={accion.color || 'primary'}
                              sx={{
                                width: 32,
                                height: 32,
                                transition: 'all 0.15s ease-in-out',
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                },
                              }}
                            >
                              {accion.icono}
                            </IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {paginacion && datosFiltrados.length > filasPorPagina && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={datosFiltrados.length}
          rowsPerPage={filasPorPagina}
          page={pagina}
          onPageChange={manejarCambioPagina}
          onRowsPerPageChange={manejarCambioFilasPorPagina}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
        />
      )}
    </Paper>
  );
}

type TipoEstado = 'success' | 'error' | 'warning' | 'info' | 'neutral';

const coloresPillClaro: Record<TipoEstado, { bg: string; fg: string }> = {
  success: { bg: 'rgba(46, 125, 50, 0.10)', fg: '#1E7A26' },
  error: { bg: 'rgba(211, 47, 47, 0.09)', fg: '#C62828' },
  warning: { bg: 'rgba(230, 81, 0, 0.09)', fg: '#B45309' },
  info: { bg: 'rgba(0, 51, 141, 0.09)', fg: '#00338D' },
  neutral: { bg: 'rgba(15, 36, 71, 0.06)', fg: 'rgba(15, 36, 71, 0.68)' },
};

const coloresPillOscuro: Record<TipoEstado, { bg: string; fg: string }> = {
  success: { bg: 'rgba(96, 173, 94, 0.18)', fg: '#7BC47C' },
  error: { bg: 'rgba(239, 83, 80, 0.16)', fg: '#F07A78' },
  warning: { bg: 'rgba(255, 152, 0, 0.16)', fg: '#FFB74D' },
  info: { bg: 'rgba(77, 133, 220, 0.20)', fg: '#7FB2F5' },
  neutral: { bg: 'rgba(255, 255, 255, 0.08)', fg: 'rgba(232, 237, 247, 0.72)' },
};

/** Pill redondeado para estados: fondo de color sólido suave + texto del color correspondiente. */
function PillEstado({ tipo, etiqueta }: { tipo: TipoEstado; etiqueta: string }) {
  const theme = useTheme();
  const paleta = theme.palette.mode === 'dark' ? coloresPillOscuro : coloresPillClaro;
  const colores = paleta[tipo];

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.25,
        py: 0.4,
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        backgroundColor: colores.bg,
        color: colores.fg,
      }}
    >
      {etiqueta}
    </Box>
  );
}

export const formateadores = {
  fecha: (valor: unknown) => (valor ? formatoFechaCorta(String(valor)) : ''),
  moneda: (valor: unknown) => (valor !== null && valor !== undefined ? formatoMoneda(Number(valor)) : ''),
  estado: (valor: unknown) => {
    if (!valor) return '';
    const estados: Record<string, { color: TipoEstado; label: string }> = {
      Activo: { color: 'success', label: 'Activo' },
      Inactivo: { color: 'error', label: 'Inactivo' },
      Planificada: { color: 'info', label: 'Planificada' },
      Activa: { color: 'success', label: 'Activa' },
      Finalizada: { color: 'neutral', label: 'Finalizada' },
      Cancelada: { color: 'error', label: 'Cancelada' },
      Entregada: { color: 'success', label: 'Entregada' },
      Pendiente: { color: 'warning', label: 'Pendiente' },
      Monetaria: { color: 'info', label: 'Monetaria' },
      EnEspecie: { color: 'neutral', label: 'En especie' },
      Recaudacion: { color: 'info', label: 'Recaudación' },
      EnEspecieCampana: { color: 'neutral', label: 'En especie' },
      Voluntariado: { color: 'info', label: 'Voluntariado' },
      Mixta: { color: 'info', label: 'Mixta' },
      Reunion: { color: 'info', label: 'Reunión' },
      Evento: { color: 'info', label: 'Evento' },
      Jornada: { color: 'info', label: 'Jornada' },
      Visita: { color: 'neutral', label: 'Visita' },
      Alimentos: { color: 'warning', label: 'Alimentos' },
      Medicamentos: { color: 'error', label: 'Medicamentos' },
      Educacion: { color: 'info', label: 'Educación' },
      Vivienda: { color: 'neutral', label: 'Vivienda' },
      Vestimenta: { color: 'neutral', label: 'Vestimenta' },
      Economica: { color: 'success', label: 'Económica' },
      Otro: { color: 'neutral', label: 'Otro' },
    };
    const config = estados[String(valor)];
    return config ? <PillEstado tipo={config.color} etiqueta={config.label} /> : String(valor);
  },
  booleano: (valor: unknown) => (valor === true ? 'Sí' : valor === false ? 'No' : ''),
  guidCorto: (valor: unknown) => (valor ? String(valor).substring(0, 8).toUpperCase() : ''),
};
