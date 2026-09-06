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
  const esMovil = useMediaQuery(theme.breakpoints.down('md'));
  const { nombreUsuario, nombreVoluntario, cerrarSesion } = useStoreSesion();
  const { menuAbierto, abrirMenu, cerrarMenu, temaOscuro, alternarTema, notificaciones } = useStoreUI();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [anchorElNotif, setAnchorElNotif] = React.useState<HTMLElement | null>(null);

  const manejarClicMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const manejarCerrarMenu = () => {
    setAnchorEl(null);
  };

  const manejarClicNotificaciones = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotif(event.currentTarget);
  };

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

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(0, 51, 141, 0.03) 0%, transparent 100%)',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          component="img"
          src={logoLeones}
          alt="Club de Leones de San Ramón"
          sx={{
            width: 80,
            height: 80,
            objectFit: 'contain',
            mb: 1,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
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
      <Divider />
      <List sx={{ flex: 1, px: 1, py: 1 }}>
        {itemsMenu.map((item) => (
          <NavLink
            key={item.ruta}
            to={item.ruta}
            children={({ isActive }) => (
              <ListItemButton
                sx={{
                  textDecoration: 'none',
                  color: isActive ? 'primary.main' : 'inherit',
                  backgroundColor: isActive ? 'primary.light' + '15' : 'transparent',
                  borderRadius: 2,
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'primary.main' : 'inherit' }}>
                  {item.icono}
                </ListItemIcon>
                <ListItemText primary={item.etiqueta} />
              </ListItemButton>
            )}
          />
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(0, 51, 141, 0.08)' }} />
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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - 256px)` },
          ml: { md: '256px' },
          backgroundColor: 'background.paper',
          borderBottom: '1px solid rgba(0, 51, 141, 0.06)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar>
          {esMovil && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={abrirMenu}
              sx={{ mr: 2, ...theme.mixins.toolbar }}
              aria-label="Abrir menú"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={manejarClicNotificaciones} aria-label="Notificaciones">
            <Notifications />
          </IconButton>
          <IconButton onClick={alternarTemaConIcono} aria-label={temaOscuro ? 'Modo claro' : 'Modo oscuro'}>
            {temaOscuro ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton onClick={manejarClicMenu} aria-label="Menú usuario">
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: '2px solid rgba(253, 185, 19, 0.3)',
                '&:hover': {
                  borderColor: 'secondary.main',
                },
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
            borderRight: '1px solid rgba(0, 51, 141, 0.08)',
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: 3,
          mt: 8,
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

