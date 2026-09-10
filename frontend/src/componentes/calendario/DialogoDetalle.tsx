import type { ReactNode, ReactElement } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Slide } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';

const TransicionSlide = forwardRef(function TransicionSlide(
  props: TransitionProps & { children: ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} timeout={{ enter: 250, exit: 200 }} />;
});

interface DialogoDetalleProps {
  open: boolean;
  onClose: () => void;
  titulo: string;
  subtitulo?: string;
  icono?: ReactNode;
  children: ReactNode;
  ancho?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Modal de solo lectura (read-only) estilo Soft UI: misma transición y radios que
 * DialogoFormulario, pero sin formulario, con una única acción "Cerrar".
 */
export function DialogoDetalle({
  open,
  onClose,
  titulo,
  subtitulo,
  icono,
  children,
  ancho = 'md',
}: DialogoDetalleProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={ancho}
      fullWidth
      disableRestoreFocus
      slots={{ transition: TransicionSlide }}
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '90vh',
        },
      }}
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
        {icono}
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Box sx={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.3, overflowWrap: 'anywhere' }}>
            {titulo}
          </Box>
          {subtitulo && (
            <Box sx={{ fontWeight: 500, fontSize: '0.78rem', color: 'text.secondary', mt: 0.25 }}>
              {subtitulo}
            </Box>
          )}
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 2, maxHeight: '70vh', overflow: 'auto' }}>{children}</DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="contained" onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}