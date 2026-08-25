import { useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useDonaciones, useCrearDonacion, useActualizarDonacion, useEliminarDonacion } from '../../hooks/useDonaciones';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { FormularioDonacion } from './FormularioDonacion';
import type { DonacionDto, CrearDonacionDto, ActualizarDonacionDto } from '../../tipos/donacion';
import { useStoreUI } from '../../store/storeUi';

export function PaginaDonaciones() {
  const { data: donaciones, isLoading, refetch } = useDonaciones();
  const { mutateAsync: crear, isPending: creando } = useCrearDonacion();
  const { mutateAsync: actualizar, isPending: actualizando } = useActualizarDonacion();
  const { mutateAsync: eliminar, isPending: eliminando } = useEliminarDonacion();
  const { agregarNotificacion } = useStoreUI();

  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [editando, setEditando] = useState<DonacionDto | null>(null);
  const [eliminarConfirmar, setEliminarConfirmar] = useState<DonacionDto | null>(null);

  const columnas = [
    { campo: 'donanteNombre', encabezado: 'Donante', ordenable: true },
    { campo: 'tipo', encabezado: 'Tipo', ordenable: true, formatear: formateadores.estado },
    { campo: 'monto', encabezado: 'Monto', ordenable: true, formatear: formateadores.moneda },
    { campo: 'fecha', encabezado: 'Fecha', ordenable: true, formatear: formateadores.fecha },
    { campo: 'reciboNumero', encabezado: 'Recibo', ordenable: true },
    { campo: 'campanaId', encabezado: 'Campaña', ordenable: false, formatear: formateadores.guidCorto },
    { campo: 'voluntarioId', encabezado: 'Voluntario', ordenable: false, formatear: formateadores.guidCorto },
  ];

  const acciones = [
    {
      icono: <Visibility fontSize="small" />,
      etiqueta: 'Ver',
      onClick: (fila: DonacionDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'info' as const,
    },
    {
      icono: <Edit fontSize="small" />,
      etiqueta: 'Editar',
      onClick: (fila: DonacionDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'primary' as const,
    },
    {
      icono: <Delete fontSize="small" />,
      etiqueta: 'Eliminar',
      onClick: (fila: DonacionDto) => setEliminarConfirmar(fila),
      color: 'error' as const,
    },
  ];

  const manejarCrear = async (dto: CrearDonacionDto) => {
    await crear(dto);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Donación registrada correctamente' });
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarActualizar = async (dto: ActualizarDonacionDto) => {
    if (!editando) return;
    await actualizar({ id: editando.id, dto });
    agregarNotificacion({ tipo: 'exito', mensaje: 'Donación actualizada correctamente' });
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarEliminar = async () => {
    if (!eliminarConfirmar) return;
    await eliminar(eliminarConfirmar.id);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Donación eliminada correctamente' });
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
            Donaciones
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Registro y gestión de donaciones
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
          Nueva donación
        </Button>
      </Box>

      <TablaDatos
        datos={donaciones || []}
        columnas={columnas}
        acciones={acciones}
        claveUnica="id"
        cargando={isLoading}
        vacioMensaje="No hay donaciones registradas"
      />

      <DialogoFormulario
        open={dialogoAbierto}
        onClose={() => { setDialogoAbierto(false); setEditando(null); }}
        onSubmit={editando ? () => manejarActualizar({}) : () => manejarCrear({})}
        titulo={editando ? `Editar: ${editando.donanteNombre}` : 'Nueva donación'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioDonacion
          inicial={editando || undefined}
          onSubmit={editando ? manejarActualizar : manejarCrear}
        />
      </DialogoFormulario>

      {eliminarConfirmar && (
        <DialogoConfirmacion
          open={true}
          onClose={() => setEliminarConfirmar(null)}
          onConfirm={manejarEliminar}
          titulo="Eliminar donación"
          mensaje={`¿Está seguro de eliminar la donación de ${eliminarConfirmar.donanteNombre}?`}
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