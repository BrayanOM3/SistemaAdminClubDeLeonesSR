import type { ReactElement } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Slide,
  CircularProgress,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';

const TransicionSlide = forwardRef(function TransicionSlide(
  props: TransitionProps & { children: ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} timeout={{ enter: 250, exit: 200 }} />;
});

interface DialogoConfirmarMoverProps {
  open: boolean;
  titulo: string;
  mensaje: string;
  /** Etiqueta del botón de confirmación (default "Mover"; para resize, "Ajustar"). */
  etiquetaConfirmar?: string;
  onCancelar: () => void;
  onConfirmar: () => Promise<void>;
  cargando?: boolean;
}

/**
 * Confirmación de mover/redimensionar un evento del calendario. No destructivo
 * (sin el Alert de DialogoConfirmacion). Mientras carga, el backdrop no cierra
 * para no disparar un revert fantasma.
 */
export function DialogoConfirmarMover({
  open,
  titulo,
  mensaje,
  etiquetaConfirmar = 'Mover',
  onCancelar,
  onConfirmar,
  cargando = false,
}: DialogoConfirmarMoverProps) {
  return (
    <Dialog
      open={open}
      onClose={cargando ? undefined : onCancelar}
      maxWidth="sm"
      fullWidth
      disableRestoreFocus
      slots={{ transition: TransicionSlide }}
      sx={{ '& .MuiDialog-paper': { maxHeight: '90vh' } }}
    >
      <DialogTitle
        sx={{
          px: 3,
          py: 2,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box sx={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.3, overflowWrap: 'anywhere' }}>
          {titulo}
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 2 }}>{mensaje}</DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button type="button" onClick={onCancelar} disabled={cargando}>
          Cancelar
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => void onConfirmar()}
          disabled={cargando}
          startIcon={cargando ? <CircularProgress size={18} color="inherit" /> : undefined}
        >
          {cargando ? 'Guardando...' : etiquetaConfirmar}
        </Button>
      </DialogActions>
    </Dialog>
  );
}