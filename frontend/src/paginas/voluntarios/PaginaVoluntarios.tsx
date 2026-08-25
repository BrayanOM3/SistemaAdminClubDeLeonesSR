import { useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useVoluntarios, useCrearVoluntario, useActualizarVoluntario, useEliminarVoluntario } from '../../hooks/useVoluntarios';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { FormularioVoluntario } from './FormularioVoluntario';
import type { VoluntarioDto, CrearVoluntarioDto, ActualizarVoluntarioDto } from '../../tipos/voluntario';
import { useStoreUI } from '../../store/storeUi';

export function PaginaVoluntarios() {
  const { data: voluntarios, isLoading, refetch } = useVoluntarios();
  const { mutateAsync: crear, isPending: creando } = useCrearVoluntario();
  const { mutateAsync: actualizar, isPending: actualizando } = useActualizarVoluntario();
  const { mutateAsync: eliminar, isPending: eliminando } = useEliminarVoluntario();
  const { agregarNotificacion } = useStoreUI();

  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [editando, setEditando] = useState<VoluntarioDto | null>(null);
  const [eliminarConfirmar, setEliminarConfirmar] = useState<VoluntarioDto | null>(null);

  const columnas = [
    { campo: 'nombreCompleto', encabezado: 'Nombre completo', ordenable: true },
    { campo: 'cedula', encabezado: 'Cédula', ordenable: true },
    { campo: 'telefono', encabezado: 'Teléfono', ordenable: false },
    { campo: 'correo', encabezado: 'Correo', ordenable: false },
    { campo: 'fechaIngreso', encabezado: 'Fecha ingreso', ordenable: true, formatear: formateadores.fecha },
    { campo: 'especialidad', encabezado: 'Especialidad', ordenable: false },
    { campo: 'estado', encabezado: 'Estado', ordenable: true, formatear: formateadores.estado },
  ];

  const acciones = [
    {
      icono: <Visibility fontSize="small" />,
      etiqueta: 'Ver',
      onClick: (fila: VoluntarioDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'info' as const,
    },
    {
      icono: <Edit fontSize="small" />,
      etiqueta: 'Editar',
      onClick: (fila: VoluntarioDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'primary' as const,
    },
    {
      icono: <Delete fontSize="small" />,
      etiqueta: 'Eliminar',
      onClick: (fila: VoluntarioDto) => setEliminarConfirmar(fila),
      color: 'error' as const,
    },
  ];

  const manejarCrear = async (dto: CrearVoluntarioDto) => {
    await crear(dto);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Voluntario registrado correctamente' });
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarActualizar = async (dto: ActualizarVoluntarioDto) => {
    if (!editando) return;
    await actualizar({ id: editando.id, dto });
    agregarNotificacion({ tipo: 'exito', mensaje: 'Voluntario actualizado correctamente' });
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarEliminar = async () => {
    if (!eliminarConfirmar) return;
    await eliminar(eliminarConfirmar.id);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Voluntario eliminado correctamente' });
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
            Voluntarios
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestión de voluntarios del Club de Leones
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
          Nuevo voluntario
        </Button>
      </Box>

      <TablaDatos
        datos={voluntarios || []}
        columnas={columnas}
        acciones={acciones}
        claveUnica="id"
        cargando={isLoading}
        vacioMensaje="No hay voluntarios registrados"
      />

      <DialogoFormulario
        open={dialogoAbierto}
        onClose={() => { setDialogoAbierto(false); setEditando(null); }}
        onSubmit={editando ? () => manejarActualizar({}) : () => manejarCrear({})}
        titulo={editando ? `Editar: ${editando.nombreCompleto}` : 'Nuevo voluntario'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioVoluntario
          inicial={editando || undefined}
          onSubmit={editando ? manejarActualizar : manejarCrear}
        />
      </DialogoFormulario>

      {eliminarConfirmar && (
        <DialogoConfirmacion
          open={true}
          onClose={() => setEliminarConfirmar(null)}
          onConfirm={manejarEliminar}
          titulo="Eliminar voluntario"
          mensaje={`¿Está seguro de eliminar a ${eliminarConfirmar.nombreCompleto}?`}
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