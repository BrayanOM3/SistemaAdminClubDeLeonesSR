import type { ReactElement, ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Slide, Avatar } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import CampaignIcon from '@mui/icons-material/Campaign';
import EventIcon from '@mui/icons-material/Event';
import { COLORES_EVENTO, ETIQUETA_TIPO } from '../../utilidades/calendario';
import { formatoFechaCorta } from '../../utilidades/formateadores';

const TransicionSlide = forwardRef(function TransicionSlide(
  props: TransitionProps & { children: ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} timeout={{ enter: 250, exit: 200 }} />;
});

/** Tipos que se pueden crear directamente desde el calendario. */
export type TipoCrearCalendario = 'Campana' | 'Actividad';

interface DialogoElegirTipoProps {
  open: boolean;
  /** Fecha 'yyyy-MM-dd' del día clickeado, que se precarga en el formulario. */
  fecha: string;
  onCerrar: () => void;
  onElegir: (tipo: TipoCrearCalendario) => void;
}

interface OpcionTipo {
  tipo: TipoCrearCalendario;
  icono: ReactNode;
  subtitulo: string;
}

/**
 * Selector de tipo al clickear un día vacío del calendario. Solo Campaña/Actividad
 * (Donación y Ayuda Social se crean desde sus propias páginas CRUD). La elección
 * abre el formulario correspondiente con la fecha del día ya precargada.
 */
export function DialogoElegirTipo({ open, fecha, onCerrar, onElegir }: DialogoElegirTipoProps) {
  const tema = useTheme();
  const modoOscuro = tema.palette.mode === 'dark';

  const opciones: OpcionTipo[] = [
    {
      tipo: 'Campana',
      icono: <CampaignIcon />,
      subtitulo: 'Permite rango de fechas y objetivo de recaudación',
    },
    {
      tipo: 'Actividad',
      icono: <EventIcon />,
      subtitulo: 'Suceso puntual con fecha y hora',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onCerrar}
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
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Box sx={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.3 }}>¿Qué quieres crear?</Box>
          <Box sx={{ fontWeight: 500, fontSize: '0.78rem', color: 'text.secondary', mt: 0.25 }}>
            {formatoFechaCorta(fecha)}
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {opciones.map((opcion) => {
            const color = COLORES_EVENTO[opcion.tipo][modoOscuro ? 'oscuro' : 'claro'];
            return (
              <Button
                key={opcion.tipo}
                type="button"
                onClick={() => onElegir(opcion.tipo)}
                sx={{
                  justifyContent: 'flex-start',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 3,
                  border: 1,
                  borderColor: 'divider',
                  textTransform: 'none',
                  color: 'text.primary',
                  bgcolor: 'transparent',
                  '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' },
                }}
              >
                <Avatar sx={{ bgcolor: color.fondo, color: color.texto, width: 40, height: 40 }}>
                  {opcion.icono}
                </Avatar>
                <Box sx={{ textAlign: 'left', minWidth: 0 }}>
                  <Box sx={{ fontWeight: 700 }}>{ETIQUETA_TIPO[opcion.tipo]}</Box>
                  <Box sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.4 }}>
                    {opcion.subtitulo}
                  </Box>
                </Box>
              </Button>
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button type="button" onClick={onCerrar}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}