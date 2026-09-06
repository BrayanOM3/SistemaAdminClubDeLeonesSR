import { Box, Skeleton, TableRow, TableCell, TableBody, Table } from '@mui/material';

/**
 * Skeleton para filas de tabla — reemplaza el texto plano "Cargando..."
 * Renderiza 5 filas animadas con anchos variables para simular contenido real.
 */
export function EsqueletoTabla({ columnas = 5 }: { columnas?: number }) {
  return (
    <Table>
      <TableBody>
        {Array.from({ length: 5 }).map((_, filaIdx) => (
          <TableRow key={filaIdx}>
            {Array.from({ length: columnas }).map((_, colIdx) => (
              <TableCell key={colIdx} sx={{ py: 1.75 }}>
                <Skeleton
                  variant="text"
                  width={`${60 + Math.random() * 35}%`}
                  height={20}
                  sx={{
                    borderRadius: 1,
                    animation: 'pulse 1.5s ease-in-out infinite',
                    animationDelay: `${filaIdx * 0.08 + colIdx * 0.04}s`,
                  }}
                />
              </TableCell>
            ))}
            {/* Columna de acciones */}
            <TableCell align="center" sx={{ py: 1.75, width: 120 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                <Skeleton variant="circular" width={28} height={28} />
                <Skeleton variant="circular" width={28} height={28} />
                <Skeleton variant="circular" width={28} height={28} />
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
 * Skeleton para tarjetas de resumen en dashboard.
 * Bloques rectangulares que simulan el layout de una card con avatar + número.
 */
export function EsqueletoTarjeta() {
  return (
    <Box sx={{ p: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="40%" height={32} />
        </Box>
        <Skeleton variant="circular" width={48} height={48} />
      </Box>
    </Box>
  );
}

/**
 * Skeleton para items de lista (usado en cards del dashboard).
 */
export function EsqueletoLista({ items = 3 }: { items?: number }) {
  return (
    <Box>
      {Array.from({ length: items }).map((_, idx) => (
        <Box key={idx} sx={{ mb: 2, p: 1.5, borderRadius: 1 }}>
          <Skeleton variant="text" width="70%" height={18} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="50%" height={14} />
        </Box>
      ))}
    </Box>
  );
}
