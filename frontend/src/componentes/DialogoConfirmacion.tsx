import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material';

interface DialogoConfirmacionProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  titulo: string;
  mensaje: string;
  cargando?: boolean;
}

/**
 * Diálogo de confirmación reutilizable (extraído de las 6 páginas CRUD).
 * Se usa para confirmar acciones destructivas como eliminaciones.
 */
export function DialogoConfirmacion({
  open,
  onClose,
  onConfirm,
  titulo,
  mensaje,
  cargando = false,
}: DialogoConfirmacionProps) {
  return (
    <Dialog
      open={open}
      onClose={cargando ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        <Typography>{mensaje}</Typography>
        <Alert severity="warning" sx={{ mt: 2 }}>
          Esta acción no se puede deshacer.
        </Alert>
      </DialogContent>
      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onClose} disabled={cargando}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={cargando}
          startIcon={cargando ? <CircularProgress size={18} color="inherit" /> : undefined}
        >
          {cargando ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
