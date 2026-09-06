import { Snackbar, Alert } from '@mui/material';
import { useStoreUI } from '../store/storeUi';

const mapaTipo: Record<string, 'success' | 'error' | 'warning' | 'info'> = {
  exito: 'success',
  error: 'error',
  advertencia: 'warning',
  info: 'info',
};

/**
 * Muestra automáticamente en pantalla (toast/snackbar) la última notificación
 * agregada al store de UI. Antes las notificaciones solo vivían dentro del
 * menú de campana (cerrado por defecto), por lo que los errores "fallaban en
 * silencio". El store ya auto-remueve cada notificación tras su duración.
 */
export function NotificacionesToasts() {
  const { notificaciones, removerNotificacion } = useStoreUI();
  const ultima = notificaciones[notificaciones.length - 1];

  const cerrar = () => {
    if (ultima) removerNotificacion(ultima.id);
  };

  return (
    <Snackbar
      key={ultima?.id}
      open={Boolean(ultima)}
      autoHideDuration={ultima?.duracion ?? 5000}
      onClose={cerrar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={cerrar}
        severity={ultima ? (mapaTipo[ultima.tipo] ?? 'info') : 'info'}
        variant="filled"
        sx={{ width: '100%', whiteSpace: 'pre-wrap' }}
      >
        {ultima?.mensaje}
      </Alert>
    </Snackbar>
  );
}
