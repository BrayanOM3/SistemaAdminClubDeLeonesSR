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
  Chip,
  Paper,
  Box,
  Typography,
  InputBase,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import { formatoFechaCorta, formatoMoneda } from '../utilidades/formateadores';

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

  const datosFiltrados = useMemo(() => {
    let resultado = [...datos];

    if (busqueda.trim()) {
      const termino = busqueda.toLowerCase().trim();
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
        // Convert to string for comparison since values could be various types
        const strA = String(valorA ?? '');
        const strB = String(valorB ?? '');
        const comparacion = strA.localeCompare(strB);
        return orden.direccion === 'asc' ? comparacion : -comparacion;
      });
    }

    return resultado;
  }, [datos, busqueda, orden]);

  const datosPaginados = paginacion
    ? datosFiltrados.slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
    : datosFiltrados;

  const manejarOrden = (campo: string) => {
    setOrden((prev) => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === 'asc' ? 'desc' : 'asc',
    }));
  };

  const manejarCambioPagina = (_: unknown, nuevaPagina: number) => {
    setPagina(nuevaPagina);
  };

  const manejarCambioFilasPorPagina = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilasPorPagina(Number(event.target.value));
    setPagina(0);
  };

  const manejarClicFila = (fila: T) => {
    if (onRowClick) onRowClick(fila);
  };

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      {titulo && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {titulo}
          </Typography>
          <InputBase
            placeholder={buscarPlaceholder}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            sx={{ width: 300, '& .MuiInputBase-input': { padding: '8px 12px' } }}
            startAdornment={<Search sx={{ color: 'text.secondary', mr: 1 }} />}
            size="small"
          />
        </Box>
      )}

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
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
                <TableCell align="center">Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {cargando ? (
              <TableRow>
                <TableCell colSpan={columnas.length + (acciones && acciones.length > 0 ? 1 : 0)} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Cargando...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : datosPaginados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnas.length + (acciones && acciones.length > 0 ? 1 : 0)} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    {vacioMensaje}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              datosPaginados.map((fila, index) => (
                <TableRow
                  key={String(fila[claveUnica as keyof T]) ?? index}
                  hover
                  onClick={() => manejarClicFila(fila)}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columnas.map((columna) => (
                    <TableCell
                      key={String(columna.campo)}
                      align={columna.alinear || 'left'}
                    >
                      {columna.formatear
                        ? columna.formatear(fila[columna.campo as keyof T], fila)
                        : String(fila[columna.campo as keyof T] ?? '')}
                    </TableCell>
                  ))}
                  {acciones && acciones.length > 0 && (
                    <TableCell align="center">
                      {acciones.map((accion, i) => (
                        <Tooltip key={i} title={accion.etiqueta}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              accion.onClick(fila);
                            }}
                            disabled={accion.deshabilitado?.(fila)}
                            color={accion.color || 'primary'}
                          >
                            {accion.icono}
                          </IconButton>
                        </Tooltip>
                      ))}
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

export const formateadores = {
  fecha: (valor: unknown) => (valor ? formatoFechaCorta(String(valor)) : ''),
  moneda: (valor: unknown) => (valor !== null && valor !== undefined ? formatoMoneda(Number(valor)) : ''),
  estado: (valor: unknown) => {
    if (!valor) return '';
    const estados: Record<string, { color: 'success' | 'error' | 'warning' | 'info' | 'default'; label: string }> = {
      Activo: { color: 'success', label: 'Activo' },
      Inactivo: { color: 'error', label: 'Inactivo' },
      Planificada: { color: 'info', label: 'Planificada' },
      Activa: { color: 'success', label: 'Activa' },
      Finalizada: { color: 'default', label: 'Finalizada' },
      Cancelada: { color: 'error', label: 'Cancelada' },
      Entregada: { color: 'success', label: 'Entregada' },
      Pendiente: { color: 'warning', label: 'Pendiente' },
      Monetaria: { color: 'info', label: 'Monetaria' },
      EnEspecie: { color: 'default', label: 'En especie' },
      Recaudacion: { color: 'info', label: 'Recaudación' },
      EnEspecieCampana: { color: 'default', label: 'En especie' },
      Voluntariado: { color: 'info', label: 'Voluntariado' },
      Mixta: { color: 'info', label: 'Mixta' },
      Reunion: { color: 'info', label: 'Reunión' },
      Evento: { color: 'info', label: 'Evento' },
      Jornada: { color: 'info', label: 'Jornada' },
      Visita: { color: 'default', label: 'Visita' },
      Alimentos: { color: 'warning', label: 'Alimentos' },
      Medicamentos: { color: 'error', label: 'Medicamentos' },
      Educacion: { color: 'info', label: 'Educación' },
      Vivienda: { color: 'default', label: 'Vivienda' },
      Vestimenta: { color: 'default', label: 'Vestimenta' },
      Economica: { color: 'success', label: 'Económica' },
      Otro: { color: 'default', label: 'Otro' },
    };
    const config = estados[String(valor)];
    return config ? <Chip label={config.label} size="small" color={config.color} variant="outlined" /> : String(valor);
  },
  booleano: (valor: unknown) => (valor === true ? 'Sí' : valor === false ? 'No' : ''),
  guidCorto: (valor: unknown) => (valor ? String(valor).substring(0, 8).toUpperCase() : ''),
};