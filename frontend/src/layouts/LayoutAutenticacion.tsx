import { Outlet } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';
import logoLeones from '../assets/logo-leones-san-ramon.jpeg';

export function LayoutAutenticacion() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: 'background.default',
      }}
    >
      {/* ── Lado izquierdo: formulario sobre fondo claro ── */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
        }}
      >
        <Card
          sx={{
            maxWidth: 460,
            width: '100%',
            p: { xs: 2.5, sm: 4 },
            backgroundImage: 'none',
          }}
        >
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box
                component="img"
                src={logoLeones}
                alt="Club de Leones de San Ramón"
                sx={{
                  width: 54,
                  height: 54,
                  objectFit: 'contain',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(0, 51, 141, 0.04)',
                  p: 0.5,
                  boxShadow: '0 6px 14px -6px rgba(0, 51, 141, 0.25)',
                }}
              />
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: 'text.primary', lineHeight: 1.2 }}>
                  Club de Leones
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: 'text.secondary' }}>
                  San Ramón, Alajuela
                </Typography>
              </Box>
            </Box>

            <Outlet />
          </CardContent>
        </Card>
      </Box>

      {/* ── Lado derecho: panel decorativo con gradiente institucional ── */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '44%',
          position: 'relative',
          overflow: 'hidden',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#FFFFFF',
          background: 'linear-gradient(150deg, #001F5C 0%, #00338D 50%, #1A4FA0 100%)',
          p: 5,
        }}
      >
        {/* Decoración: blobs dorados y azules */}
        <Box
          sx={{
            position: 'absolute',
            top: -90,
            right: -70,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(253, 185, 19, 0.4) 0%, transparent 70%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.14) 0%, transparent 70%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            right: '14%',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(253, 185, 19, 0.22) 0%, transparent 70%)',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              mx: 'auto',
              mb: 3,
              borderRadius: '32px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.5,
              boxShadow: '0 18px 40px -12px rgba(0, 0, 0, 0.45)',
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
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              opacity: 0.9,
              mb: 1,
            }}
          >
            Club de Leones de San Ramón
          </Typography>
          <Typography sx={{ fontSize: '1.9rem', fontWeight: 800, lineHeight: 1.2, mb: 1.5 }}>
            Servimos a la comunidad
          </Typography>
          <Typography sx={{ fontSize: '0.95rem', opacity: 0.85, maxWidth: 340, mx: 'auto', lineHeight: 1.6 }}>
            Voluntariado, campañas y ayudas sociales para construir una comunidad más solidaria.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}