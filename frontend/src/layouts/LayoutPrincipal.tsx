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
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Club de Leones
        </Typography>
        <Typography variant="caption" color="text.secondary">
          San Ramón
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
      <Divider />
      <Box sx={{ p: 1 }}>
        <Typography variant="caption" color="text.secondary">
          v1.0.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { md: `calc(100% - 256px)` },
          ml: { md: '256px' },
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
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
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
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
            borderRight: 1,
            borderColor: 'divider',
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
          p: 3,
          width: { md: `calc(100% - 256px)` },
          ml: { md: '256px' },
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

