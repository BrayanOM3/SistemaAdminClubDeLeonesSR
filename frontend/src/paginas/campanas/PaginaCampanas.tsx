import { useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useCampanas, useCrearCampana, useActualizarCampana, useEliminarCampana } from '../../hooks/useCampanas';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { FormularioCampana } from './FormularioCampana';
import type { CampanaDto, CrearCampanaDto, ActualizarCampanaDto } from '../../tipos/campana';
import { useStoreUI } from '../../store/storeUi';

export function PaginaCampanas() {
  const { data: campanas, isLoading, refetch } = useCampanas();
  const { mutateAsync: crear, isPending: creando } = useCrearCampana();
  const { mutateAsync: actualizar, isPending: actualizando } = useActualizarCampana();
  const { mutateAsync: eliminar, isPending: eliminando } = useEliminarCampana();
  const { agregarNotificacion } = useStoreUI();

  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [editando, setEditando] = useState<CampanaDto | null>(null);
  const [eliminarConfirmar, setEliminarConfirmar] = useState<CampanaDto | null>(null);

  const columnas = [
    { campo: 'nombre', encabezado: 'Nombre', ordenable: true },
    { campo: 'tipo', encabezado: 'Tipo', ordenable: true, formatear: formateadores.estado },
    { campo: 'estado', encabezado: 'Estado', ordenable: true, formatear: formateadores.estado },
    { campo: 'fechaInicio', encabezado: 'Fecha inicio', ordenable: true, formatear: formateadores.fecha },
    { campo: 'fechaFin', encabezado: 'Fecha fin', ordenable: true, formatear: formateadores.fecha },
    { campo: 'objetivoMonto', encabezado: 'Objetivo', ordenable: true, formatear: formateadores.moneda },
  ];

  const acciones = [
    {
      icono: <Visibility fontSize="small" />,
      etiqueta: 'Ver',
      onClick: (fila: CampanaDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'info' as const,
    },
    {
      icono: <Edit fontSize="small" />,
      etiqueta: 'Editar',
      onClick: (fila: CampanaDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'primary' as const,
    },
    {
      icono: <Delete fontSize="small" />,
      etiqueta: 'Eliminar',
      onClick: (fila: CampanaDto) => setEliminarConfirmar(fila),
      color: 'error' as const,
    },
  ];

  const manejarCrear = async (dto: CrearCampanaDto) => {
    await crear(dto);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Campaña creada correctamente' });
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarActualizar = async (dto: ActualizarCampanaDto) => {
    if (!editando) return;
    await actualizar({ id: editando.id, dto });
    agregarNotificacion({ tipo: 'exito', mensaje: 'Campaña actualizada correctamente' });
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarEliminar = async () => {
    if (!eliminarConfirmar) return;
    await eliminar(eliminarConfirmar.id);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Campaña eliminada correctamente' });
    refetch();
    setEliminarConfirmar(null);
  };

  const abrirNuevo = () => {
    setEditando(null);
    setDialogoAbierto(true);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Campañas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestión de campañas del Club de Leones
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
          Nueva campaña
        </Button>
      </Box>

      <TablaDatos
        datos={campanas || []}
        columnas={columnas}
        acciones={acciones}
        claveUnica="id"
        cargando={isLoading}
        vacioMensaje="No hay campañas registradas"
      />

      <DialogoFormulario
        open={dialogoAbierto}
        onClose={() => { setDialogoAbierto(false); setEditando(null); }}
        onSubmit={editando ? () => manejarActualizar({}) : () => manejarCrear({})}
        titulo={editando ? `Editar: ${editando.nombre}` : 'Nueva campaña'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioCampana
          inicial={editando || undefined}
          onSubmit={editando ? manejarActualizar : manejarCrear}
        />
      </DialogoFormulario>

      {eliminarConfirmar && (
        <DialogoConfirmacion
          open={true}
          onClose={() => setEliminarConfirmar(null)}
          onConfirm={manejarEliminar}
          titulo="Eliminar campaña"
          mensaje={`¿Está seguro de eliminar la campaña "${eliminarConfirmar.nombre}"?`}
          cargando={eliminando}
        />
      )}
    </Box>
  );
}

interface DialogoConfirmacionProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  titulo: string;
  mensaje: string;
  cargando?: boolean;
}

function DialogoConfirmacion({ open, onClose, onConfirm, titulo, mensaje, cargando = false }: DialogoConfirmacionProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        <Typography>{mensaje}</Typography>
        <Alert severity="warning" sx={{ mt: 2 }}>Esta acción no se puede deshacer.</Alert>
      </DialogContent>
      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onClose} disabled={cargando}>Cancelar</Button>
        <Button variant="contained" color="error" onClick={onConfirm} disabled={cargando} startIcon={cargando ? <CircularProgress size={18} color="inherit" /> : undefined}>
          {cargando ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}