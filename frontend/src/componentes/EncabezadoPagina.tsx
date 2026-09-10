import type { ReactNode } from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useLocation, NavLink } from 'react-router-dom';

const etiquetaPorRuta: Record<string, string> = {
  '/inicio': 'Inicio',
  '/beneficiarios': 'Beneficiarios',
  '/voluntarios': 'Voluntarios',
  '/campanas': 'Campañas',
  '/donaciones': 'Donaciones',
  '/ayudas-sociales': 'Ayudas Sociales',
  '/actividades': 'Actividades',
  '/calendario': 'Calendario',
  '/reportes': 'Reportes',
};

interface EncabezadoPaginaProps {
  titulo: string;
  descripcion?: string;
  acciones?: ReactNode;
  /** Color MUI para la descripción (default: 'text.secondary'). Usá 'text.primary' para mayor contraste en modo oscuro. */
  colorDescripcion?: 'text.primary' | 'text.secondary' | 'text.disabled' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
}

/**
 * Cabecera de página estilo Soft UI: breadcrumb pequeño arriba,
 * título en negrita debajo y acciones opcionales a la derecha.
 */
export function EncabezadoPagina({ titulo, descripcion, acciones, colorDescripcion }: EncabezadoPaginaProps) {
  const { pathname } = useLocation();
  const etiqueta = etiquetaPorRuta[pathname] || titulo;

  return (
    <Box sx={{ mb: 3.5 }}>
      <Breadcrumbs
        separator="›"
        sx={{
          mb: 1,
          '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' },
          '& .MuiBreadcrumbs-separator': { fontSize: '0.9rem' },
        }}
      >
        <NavLink
          to="/inicio"
          style={{ textDecoration: 'none' }}
        >
          <Typography
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <Home sx={{ fontSize: 15 }} />
            Inicio
          </Typography>
        </NavLink>
        {etiqueta !== 'Inicio' && (
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'text.primary' }}>
            {etiqueta}
          </Typography>
        )}
      </Breadcrumbs>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 0.5 }}>
            {titulo}
          </Typography>
          {descripcion && (
            <Typography variant="body1" color={colorDescripcion ?? 'text.secondary'}>
              {descripcion}
            </Typography>
          )}
        </Box>
        {acciones && <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>{acciones}</Box>}
      </Box>
    </Box>
  );
}