import type { ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

interface EstadoVacioProps {
  icono?: ReactNode;
  titulo?: string;
  descripcion?: string;
  accionLabel?: string;
  onAccion?: () => void;
}

/**
 * Estado vacío reutilizable: ícono centrado + título + descripción + CTA opcional.
 * Se usa en TablaDatos cuando no hay registros y en tarjetas del dashboard.
 */
export function EstadoVacio({
  icono,
  titulo = 'Sin resultados',
  descripcion = 'No hay datos disponibles para mostrar.',
  accionLabel,
  onAccion,
}: EstadoVacioProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 51, 141, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        {icono || <InboxOutlinedIcon sx={{ fontSize: 36, color: 'text.secondary', opacity: 0.6 }} />}
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mb: 0.5,
          fontSize: '1rem',
        }}
      >
        {titulo}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          maxWidth: 360,
          lineHeight: 1.5,
          mb: accionLabel ? 2.5 : 0,
        }}
      >
        {descripcion}
      </Typography>
      {accionLabel && onAccion && (
        <Button variant="contained" size="small" onClick={onAccion}>
          {accionLabel}
        </Button>
      )}
    </Box>
  );
}
