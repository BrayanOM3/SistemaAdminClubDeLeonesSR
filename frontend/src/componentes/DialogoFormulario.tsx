import type { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

interface DialogoFormularioProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => Promise<void>;
  titulo: string;
  children: ReactNode;
  cargando?: boolean;
  ancho?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  deshabilitarCerrar?: boolean;
}

export function DialogoFormulario({
  open,
  onClose,
  onSubmit,
  titulo,
  children,
  cargando = false,
  ancho = 'md',
  deshabilitarCerrar = false,
}: DialogoFormularioProps) {
  return (
    <Dialog
      open={open}
      onClose={deshabilitarCerrar ? undefined : onClose}
      maxWidth={ancho === 'full' ? false : ancho}
      fullWidth={ancho !== 'full'}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: ancho === 'full' ? '95vw' : undefined,
          width: ancho === 'full' ? '95vw' : undefined,
          margin: ancho === 'full' ? '16px auto' : undefined,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
        {titulo}
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 2, maxHeight: '70vh', overflow: 'auto' }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onClose} disabled={cargando || deshabilitarCerrar}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={cargando} startIcon={cargando ? <CircularProgress size={18} color="inherit" /> : undefined}>
          {cargando ? 'Guardando...' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}