import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useActividades, useCrearActividad, useActualizarActividad, useEliminarActividad } from '../../hooks/useActividades';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { FormularioActividad } from './FormularioActividad';
import type { ActividadDto, CrearActividadDto, ActualizarActividadDto } from '../../tipos/actividad';
import { useStoreUI } from '../../store/storeUi';

export function PaginaActividades() {
  const { data: actividades, isLoading, refetch } = useActividades();
  const { mutateAsync: crear, isPending: creando } = useCrearActividad();
  const { mutateAsync: actualizar, isPending: actualizando } = useActualizarActividad();
  const { mutateAsync: eliminar, isPending: eliminando } = useEliminarActividad();
  const { agregarNotificacion } = useStoreUI();

  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [editando, setEditando] = useState<ActividadDto | null>(null);
  const [eliminarConfirmar, setEliminarConfirmar] = useState<ActividadDto | null>(null);

  const columnas = [
    { campo: 'nombre', encabezado: 'Nombre', ordenable: true },
    { campo: 'tipo', encabezado: 'Tipo', ordenable: true, formatear: formateadores.estado },
    { campo: 'fecha', encabezado: 'Fecha', ordenable: true, formatear: formateadores.fecha },
    { campo: 'lugar', encabezado: 'Lugar', ordenable: false },
    { campo: 'campanaId', encabezado: 'Campaña', ordenable: false, formatear: formateadores.guidCorto },
  ];

  const acciones = [
    {
      icono: <Visibility fontSize="small" />,
      etiqueta: 'Ver',
      onClick: (fila: ActividadDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'info' as const,
    },
    {
      icono: <Edit fontSize="small" />,
      etiqueta: 'Editar',
      onClick: (fila: ActividadDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'primary' as const,
    },
    {
      icono: <Delete fontSize="small" />,
      etiqueta: 'Eliminar',
      onClick: (fila: ActividadDto) => setEliminarConfirmar(fila),
      color: 'error' as const,
    },
  ];

  const manejarSubmit = async (dto: CrearActividadDto | ActualizarActividadDto) => {
    if (editando) {
      await actualizar({ id: editando.id, dto: dto as ActualizarActividadDto });
      agregarNotificacion({ tipo: 'exito', mensaje: 'Actividad actualizada correctamente' });
    } else {
      await crear(dto as CrearActividadDto);
      agregarNotificacion({ tipo: 'exito', mensaje: 'Actividad registrada correctamente' });
    }
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarEliminar = async () => {
    if (!eliminarConfirmar) return;
    await eliminar(eliminarConfirmar.id);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Actividad eliminada correctamente' });
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
            Actividades
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestión de actividades y eventos
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
          Nueva actividad
        </Button>
      </Box>

      <TablaDatos<ActividadDto>
        datos={actividades || []}
        columnas={columnas}
        acciones={acciones}
        claveUnica="id"
        cargando={isLoading}
        vacioMensaje="No hay actividades registradas"
      />

      <DialogoFormulario
        open={dialogoAbierto}
        onClose={() => { setDialogoAbierto(false); setEditando(null); }}
        titulo={editando ? `Editar: ${editando.nombre}` : 'Nueva actividad'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioActividad
          inicial={editando || undefined}
          onSubmit={manejarSubmit}
        />
      </DialogoFormulario>

      {eliminarConfirmar && (
        <DialogoConfirmacion
          open={true}
          onClose={() => setEliminarConfirmar(null)}
          onConfirm={manejarEliminar}
          titulo="Eliminar actividad"
          mensaje={`¿Está seguro de eliminar la actividad "${eliminarConfirmar.nombre}"?`}
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