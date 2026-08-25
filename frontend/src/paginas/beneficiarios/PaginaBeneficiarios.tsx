import { useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useBeneficiarios, useCrearBeneficiario, useActualizarBeneficiario, useEliminarBeneficiario } from '../../hooks/useBeneficiarios';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { FormularioBeneficiario } from './FormularioBeneficiario';
import type { BeneficiarioDto, CrearBeneficiarioDto, ActualizarBeneficiarioDto } from '../../tipos/beneficiario';
import { useStoreUI } from '../../store/storeUi';

export function PaginaBeneficiarios() {
  const { data: beneficiarios, isLoading, refetch } = useBeneficiarios();
  const { mutateAsync: crear, isPending: creando } = useCrearBeneficiario();
  const { mutateAsync: actualizar, isPending: actualizando } = useActualizarBeneficiario();
  const { mutateAsync: eliminar, isPending: eliminando } = useEliminarBeneficiario();
  const { agregarNotificacion } = useStoreUI();

  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [editando, setEditando] = useState<BeneficiarioDto | null>(null);
  const [eliminarConfirmar, setEliminarConfirmar] = useState<BeneficiarioDto | null>(null);

  const columnas = [
    { campo: 'nombreCompleto', encabezado: 'Nombre completo', ordenable: true },
    { campo: 'cedula', encabezado: 'Cédula', ordenable: true },
    { campo: 'telefono', encabezado: 'Teléfono', ordenable: false },
    { campo: 'correo', encabezado: 'Correo', ordenable: false },
    { campo: 'estadoCivil', encabezado: 'Estado civil', ordenable: true, formatear: formateadores.estado },
    { campo: 'fechaRegistro', encabezado: 'Fecha registro', ordenable: true, formatear: formateadores.fecha },
    { campo: 'estado', encabezado: 'Estado', ordenable: true, formatear: formateadores.estado },
  ];

  const acciones = [
    {
      icono: <Visibility fontSize="small" />,
      etiqueta: 'Ver',
      onClick: (fila: BeneficiarioDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'info' as const,
    },
    {
      icono: <Edit fontSize="small" />,
      etiqueta: 'Editar',
      onClick: (fila: BeneficiarioDto) => { setEditando(fila); setDialogoAbierto(true); },
      color: 'primary' as const,
    },
    {
      icono: <Delete fontSize="small" />,
      etiqueta: 'Eliminar',
      onClick: (fila: BeneficiarioDto) => setEliminarConfirmar(fila),
      color: 'error' as const,
    },
  ];

  const manejarCrear = async (dto: CrearBeneficiarioDto) => {
    await crear(dto);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Beneficiario creado correctamente' });
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarActualizar = async (dto: ActualizarBeneficiarioDto) => {
    if (!editando) return;
    await actualizar({ id: editando.id, dto });
    agregarNotificacion({ tipo: 'exito', mensaje: 'Beneficiario actualizado correctamente' });
    refetch();
    setDialogoAbierto(false);
    setEditando(null);
  };

  const manejarEliminar = async () => {
    if (!eliminarConfirmar) return;
    await eliminar(eliminarConfirmar.id);
    agregarNotificacion({ tipo: 'exito', mensaje: 'Beneficiario eliminado correctamente' });
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
            Beneficiarios
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestión de beneficiarios del Club de Leones
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
          Nuevo beneficiario
        </Button>
      </Box>

      <TablaDatos
        datos={beneficiarios || []}
        columnas={columnas}
        acciones={acciones}
        claveUnica="id"
        cargando={isLoading}
        vacioMensaje="No hay beneficiarios registrados"
      />

      <DialogoFormulario
        open={dialogoAbierto}
        onClose={() => { setDialogoAbierto(false); setEditando(null); }}
        onSubmit={editando ? () => manejarActualizar({}) : () => manejarCrear({})}
        titulo={editando ? `Editar: ${editando.nombreCompleto}` : 'Nuevo beneficiario'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioBeneficiario
          inicial={editando || undefined}
          onSubmit={editando ? manejarActualizar : manejarCrear}
        />
      </DialogoFormulario>

      {eliminarConfirmar && (
        <DialogoConfirmacion
          open={true}
          onClose={() => setEliminarConfirmar(null)}
          onConfirm={manejarEliminar}
          titulo="Eliminar beneficiario"
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
        <Alert severity="warning" sx={{ mt: 2 }}>
          Esta acción no se puede deshacer.
        </Alert>
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