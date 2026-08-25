import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useAyudasSociales, useCrearAyudaSocial, useActualizarAyudaSocial, useEliminarAyudaSocial } from '../../hooks/useAyudasSociales';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { FormularioAyudaSocial } from './FormularioAyudaSocial';
import type { AyudaSocialDto, CrearAyudaSocialDto, ActualizarAyudaSocialDto } from '../../tipos/ayudaSocial';
import { useStoreUI } from '../../store/storeUi';

export function PaginaAyudasSociales() {
  const { data: ayudas, isLoading, refetch } = useAyudasSociales();
  const { mutateAsync: crear, isPending: creando } = useCrearAyudaSocial();
  const { mutateAsync: actualizar, isPending: actualizando } = useActualizarAyudaSocial();
  const { mutateAsync: eliminar, isPending: eliminando } = useEliminarAyudaSocial();
  const { agregarNotificacion } = useStoreUI();

  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [editando, setEditando] = useState<AyudaSocialDto | null>(null);
  const [eliminarConfirmar, setEliminarConfirmar] = useState<AyudaSocialDto | null>(null);

  const columnas = [
    { campo: 'beneficiarioId', encabezado: 'Beneficiario', ordenable: false, formatear: formateadores.guidCorto },
    { campo: 'tipo', encabezado: 'Tipo', ordenable: true, formatear: formateadores.estado },
    { campo: 'descripcion', encabezado: 'Descripción', ordenable: false },
    { campo: 'monto', encabezado: 'Monto', ordenable: true, formatear: formateadores.moneda },
    { campo: 'fechaEntrega', encabezado: 'Fecha entrega', ordenable: true, formatear: formateadores.fecha },
    { campo: 'estado', encabezado: 'Estado', ordenable: true, formatear: formateadores.estado },
    { campo: 'campanaId', encabezado: 'Campaña', ordenable: false, formatear: formateadores.guidCorto },
    { campo: 'voluntarioId', encabezado: 'Voluntario', ordenable: false, formatear: formateadores.guidCorto },
  ];

  const acciones = [
    {
      icono: <Visibility fontSize="small" />,
      etiqueta: 'Ver',
      onClick: (fila: AyudaSocialDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'info' as const,
    },
    {
      icono: <Edit fontSize="small" />,
      etiqueta: 'Editar',
      onClick: (fila: AyudaSocialDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'primary' as const,
    },
    {
      icono: <Delete fontSize="small" />,
      etiqueta: 'Eliminar',
      onClick: (fila: AyudaSocialDto) => setEliminarConfirmar(fila),
      color: 'error' as const,
    },
  ];

  const manejarCrear = async (dto: CrearAyudaSocialDto) => {
    await crear(dto);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Ayuda social registrada correctamente' });
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarActualizar = async (dto: ActualizarAyudaSocialDto) => {
    if (!editando) return;
    await actualizar({ id: editando.id, dto });
    agregarNotificacion({ tipo: 'exito', mensaje: 'Ayuda social actualizada correctamente' });
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarEliminar = async () => {
    if (!eliminarConfirmar) return;
    await eliminar(eliminarConfirmar.id);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Ayuda social eliminada correctamente' });
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
            Ayudas Sociales
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Registro y seguimiento de ayudas entregadas
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
          Nueva ayuda
        </Button>
      </Box>

      <TablaDatos
        datos={ayudas || []}
        columnas={columnas}
        acciones={acciones}
        claveUnica="id"
        cargando={isLoading}
        vacioMensaje="No hay ayudas sociales registradas"
      />

      <DialogoFormulario
        open={dialogoAbierto}
        onClose={() => { setDialogoAbierto(false); setEditando(null); }}
        onSubmit={editando ? () => manejarActualizar({}) : () => manejarCrear({})}
        titulo={editando ? `Editar ayuda #${editando.id.substring(0, 8)}` : 'Nueva ayuda social'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioAyudaSocial
          inicial={editando || undefined}
          onSubmit={editando ? manejarActualizar : manejarCrear}
        />
      </DialogoFormulario>

      {eliminarConfirmar && (
        <DialogoConfirmacion
          open={true}
          onClose={() => setEliminarConfirmar(null)}
          onConfirm={manejarEliminar}
          titulo="Eliminar ayuda social"
          mensaje={`¿Está seguro de eliminar esta ayuda social?`}
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