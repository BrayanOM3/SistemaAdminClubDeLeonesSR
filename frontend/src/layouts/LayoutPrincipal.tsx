import React from 'react';
import type { ReactNode } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  InputBase,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  VolunteerActivism,
  Campaign,
  AttachMoney,
  MedicalServices,
  Event,
  Assessment,
  Person,
  Settings,
  Logout,
  DarkMode,
  LightMode,
  Notifications,
  Search,
  LiveHelp,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useStoreSesion } from '../store/storeSesion';
import { useStoreUI } from '../store/storeUi';
import logoLeones from '../assets/logo-leones-san-ramon.jpeg';

const itemsMenu = [
  { ruta: '/inicio', icono: <Dashboard />, etiqueta: 'Inicio' },
  { ruta: '/beneficiarios', icono: <People />, etiqueta: 'Beneficiarios' },
  { ruta: '/voluntarios', icono: <VolunteerActivism />, etiqueta: 'Voluntarios' },
  { ruta: '/campanas', icono: <Campaign />, etiqueta: 'Campañas' },
  { ruta: '/donaciones', icono: <AttachMoney />, etiqueta: 'Donaciones' },
  { ruta: '/ayudas-sociales', icono: <MedicalServices />, etiqueta: 'Ayudas Sociales' },
  { ruta: '/actividades', icono: <Event />, etiqueta: 'Actividades' },
  { ruta: '/reportes', icono: <Assessment />, etiqueta: 'Reportes' },
];

interface LayoutPrincipalProps {
  children: ReactNode;
}

export function LayoutPrincipal({ children }: LayoutPrincipalProps) {
  const theme = useTheme();
  const esOscuro = theme.palette.mode === 'dark';
  const esMovil = useMediaQuery(theme.breakpoints.down('md'));
  const { nombreUsuario, nombreVoluntario, cerrarSesion } = useStoreSesion();
  const { menuAbierto, abrirMenu, cerrarMenu, temaOscuro, alternarTema, notificaciones, agregarNotificacion } = useStoreUI();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [anchorElNotif, setAnchorElNotif] = React.useState<HTMLElement | null>(null);

  const manejarClicMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const manejarCerrarMenu = () => setAnchorEl(null);
  const manejarClicNotificaciones = (event: React.MouseEvent<HTMLElement>) => setAnchorElNotif(event.currentTarget);
  const manejarCerrarSesion = () => {
    cerrarSesion();
    manejarCerrarMenu();
  };
  const alternarTemaConIcono = () => {
    alternarTema();
    manejarCerrarMenu();
  };

  const menuItems = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={manejarCerrarMenu}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={manejarCerrarMenu}>
        <ListItemIcon><Person /></ListItemIcon>
        Perfil
      </MenuItem>
      <MenuItem onClick={manejarCerrarMenu}>
        <ListItemIcon><Settings /></ListItemIcon>
        Configuración
      </MenuItem>
      <Divider />
      <MenuItem onClick={manejarCerrarSesion}>
        <ListItemIcon><Logout /></ListItemIcon>
        Cerrar sesión
      </MenuItem>
    </Menu>
  );

  const notificacionesMenu = (
    <Menu
      anchorEl={anchorElNotif}
      open={Boolean(anchorElNotif)}
      onClose={() => setAnchorElNotif(null)}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {notificaciones.length === 0 ? (
        <MenuItem disabled>Sin notificaciones</MenuItem>
      ) : (
        notificaciones.map((notif) => (
          <MenuItem key={notif.id} disabled>
            {notif.mensaje}
          </MenuItem>
        ))
      )}
    </Menu>
  );

  // Tarjeta CTA al final del sidebar (estilo Soft UI "¿Necesita ayuda?")
  const tarjetaCTA = (
    <Box
      sx={{
        mx: 2,
        mb: 1.5,
        p: 2,
        borderRadius: '18px',
        textAlign: 'center',
        color: '#FFFFFF',
        background: `linear-gradient(150deg, ${esOscuro ? '#12255C' : '#00338D'} 0%, ${esOscuro ? '#1A4FA0' : '#1A4FA0'} 55%, ${esOscuro ? '#2D6BE0' : '#1550B8'} 100%)`,
        boxShadow: '0 12px 26px -12px rgba(0, 51, 141, 0.55)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoración: círculo dorado difuso */}
      <Box
        sx={{
          position: 'absolute',
          top: -24,
          right: -18,
          width: 84,
          height: 84,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253, 185, 19, 0.45) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <LiveHelp sx={{ fontSize: 30, mb: 0.75, opacity: 0.95 }} />
      <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', mb: 0.5 }}>
        ¿Necesita ayuda?
      </Typography>
      <Typography sx={{ fontSize: '0.75rem', opacity: 0.85, mb: 1.25 }}>
        Soporte del Club de Leones
      </Typography>
      <ButtonBlanco onClic={() => agregarNotificacion({ tipo: 'info', mensaje: 'Comuníquese con la mesa directiva del Club para asistencia.' })} />
    </Box>
  );

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 2.25,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          component="img"
          src={logoLeones}
          alt="Club de Leones de San Ramón"
          sx={{
            width: 76,
            height: 76,
            objectFit: 'contain',
            mb: 1,
            borderRadius: '18px',
            backgroundColor: 'rgba(0, 51, 141, 0.04)',
            p: 0.5,
            boxShadow: '0 6px 14px -6px rgba(0, 51, 141, 0.25)',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            fontSize: '0.9375rem',
            letterSpacing: '0.02em',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          Club de Leones
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textAlign: 'center',
          }}
        >
          San Ramón, Alajuela
        </Typography>
      </Box>

      <List sx={{ flex: 1, px: 1, py: 1.5, overflowY: 'auto' }}>
        {itemsMenu.map((item) => (
          <NavLink
            key={item.ruta}
            to={item.ruta}
            style={{ textDecoration: 'none', color: 'inherit' }}
            children={({ isActive }) => (
              <ListItemButton selected={isActive}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icono}
                </ListItemIcon>
                <ListItemText primary={item.etiqueta} />
              </ListItemButton>
            )}
          />
        ))}
      </List>

      <Divider sx={{ borderColor: 'divider' }} />
      {tarjetaCTA}
      <Box sx={{ p: 1.5, textAlign: 'center' }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.625rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
          }}
        >
          Club de Leones de San Ramón · v1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ position: 'relative', display: 'flex', minHeight: '100vh', overflow: 'hidden', backgroundColor: 'background.default' }}>
      {/* ── Formas decorativas (blobs) detrás del panel ── */}
      <Box
        className="blob-decorativo blob-flotar"
        sx={{
          top: -90,
          right: -70,
          width: { xs: 260, md: 400 },
          height: { xs: 260, md: 400 },
          background: 'radial-gradient(circle, rgba(253, 185, 19, 0.30) 0%, transparent 70%)',
        }}
      />
      <Box
        className="blob-decorativo blob-flotar-lento"
        sx={{
          bottom: 60,
          left: '26%',
          width: { xs: 300, md: 460 },
          height: { xs: 300, md: 460 },
          background: 'radial-gradient(circle, rgba(0, 51, 141, 0.16) 0%, transparent 70%)',
        }}
      />
      <Box
        className="blob-decorativo blob-flotar"
        sx={{
          top: '40%',
          right: '8%',
          width: 190,
          height: 190,
          background: esOscuro
            ? 'radial-gradient(circle, rgba(253, 185, 19, 0.16) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 51, 141, 0.10) 0%, transparent 70%)',
        }}
      />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - 256px)` },
          ml: { md: '256px' },
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottom: 'none',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ gap: { xs: 0.5, sm: 1 }, minHeight: { xs: '64px', md: '72px' } }}>
          {esMovil && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={abrirMenu}
              aria-label="Abrir menú"
              sx={{ mr: 0.5 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Barra de búsqueda (redondeada, fondo gris claro) */}
          <Box
            sx={{
              flex: 1,
              maxWidth: { sm: 360 },
              display: 'flex',
              alignItems: 'center',
              px: 1.5,
              py: 0.75,
              ml: { sm: 1 },
              borderRadius: '999px',
              backgroundColor: esOscuro ? 'rgba(255, 255, 255, 0.07)' : 'rgba(15, 36, 71, 0.045)',
              border: 1,
              borderColor: 'transparent',
              transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
              '&:focus-within': {
                backgroundColor: esOscuro ? 'rgba(255,255,255,0.12)' : '#FFFFFF',
                boxShadow: '0 0 0 3px rgba(0, 51, 141, 0.12)',
              },
            }}
          >
            <Search sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Buscar..."
              fullWidth
              sx={{ fontSize: '0.875rem' }}
            />
          </Box>

          <IconButton onClick={manejarClicNotificaciones} aria-label="Notificaciones">
            <Notifications />
          </IconButton>
          <IconButton onClick={alternarTemaConIcono} aria-label={temaOscuro ? 'Modo claro' : 'Modo oscuro'}>
            {temaOscuro ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton onClick={manejarClicMenu} aria-label="Menú usuario">
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: '2px solid rgba(253, 185, 19, 0.35)',
                boxShadow: '0 6px 12px -6px rgba(0, 51, 141, 0.5)',
              }}
            >
              {nombreVoluntario?.[0] || nombreUsuario?.[0] || 'U'}
            </Avatar>
          </IconButton>
          {menuItems}
          {notificacionesMenu}
        </Toolbar>
      </AppBar>

      <Drawer
        variant={esMovil ? 'temporary' : 'permanent'}
        open={esMovil ? menuAbierto : true}
        onClose={cerrarMenu}
        sx={{
          width: 256,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 256,
            boxSizing: 'border-box',
            backgroundColor: 'background.paper',
            borderRight: 'none',
            boxShadow: esOscuro ? 'none' : '0 0 30px rgba(15, 36, 71, 0.06)',
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>

      {/* Panel principal blanco flotante */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          position: 'relative',
          zIndex: 1,
          m: { xs: 1, sm: 1.5, md: 2.5 },
          mt: { xs: '72px', md: '88px' },
          p: { xs: 2, sm: 2.5, md: 3.5 },
          borderRadius: { xs: '16px', sm: '20px', md: '26px' },
          background: esOscuro
            ? 'linear-gradient(180deg, #141B30 0%, #101731 100%)'
            : 'linear-gradient(180deg, #FFFFFF 0%, #F7F9FD 100%)',
          boxShadow: esOscuro
            ? '0 8px 20px rgba(0, 0, 0, 0.3), 0 30px 64px -22px rgba(0, 0, 0, 0.55)'
            : '0 6px 16px rgba(15, 36, 71, 0.05), 0 30px 60px -24px rgba(15, 36, 71, 0.28)',
          minHeight: 'calc(100vh - 120px)',
        }}
      >
        <Box className="fade-in" sx={{ height: '100%' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

// Botón blanco pequeño de la tarjeta CTA del sidebar
function ButtonBlanco({ onClic }: { onClic: () => void }) {
  return (
    <button
      onClick={onClic}
      style={{
        border: 'none',
        cursor: 'pointer',
        borderRadius: 999,
        padding: '8px 18px',
        fontWeight: 700,
        fontSize: '0.8125rem',
        background: '#FFFFFF',
        color: '#00338D',
        boxShadow: '0 6px 14px -6px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
      }}
    >
      Conozca más
    </button>
  );
}