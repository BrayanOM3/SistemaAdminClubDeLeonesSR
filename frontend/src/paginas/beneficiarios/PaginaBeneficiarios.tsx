import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useBeneficiarios, useCrearBeneficiario, useActualizarBeneficiario, useEliminarBeneficiario } from '../../hooks/useBeneficiarios';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { DialogoConfirmacion } from '../../componentes/DialogoConfirmacion';
import { FormularioBeneficiario } from './FormularioBeneficiario';
import type { BeneficiarioDto, CrearBeneficiarioDto, ActualizarBeneficiarioDto } from '../../tipos/beneficiario';
import { useStoreUI } from '../../store/storeUi';
import { obtenerMensajeError } from '../../utilidades/manejoErrores';

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

  const manejarSubmit = async (dto: CrearBeneficiarioDto | ActualizarBeneficiarioDto) => {
    try {
      if (editando) {
        await actualizar({ id: editando.id, dto: dto as ActualizarBeneficiarioDto });
        agregarNotificacion({ tipo: 'exito', mensaje: 'Beneficiario actualizado correctamente' });
      } else {
        await crear(dto as CrearBeneficiarioDto);
        agregarNotificacion({ tipo: 'exito', mensaje: 'Beneficiario creado correctamente' });
      }
      refetch();
      setDialogoAbierto(false);
      setEditando(null);
    } catch (error) {
      agregarNotificacion({ tipo: 'error', mensaje: obtenerMensajeError(error) });
    }
  };

  const manejarEliminar = async () => {
    if (!eliminarConfirmar) return;
    try {
      await eliminar(eliminarConfirmar.id);
      agregarNotificacion({ tipo: 'exito', mensaje: 'Beneficiario eliminado correctamente' });
      refetch();
      setEliminarConfirmar(null);
    } catch (error) {
      agregarNotificacion({ tipo: 'error', mensaje: obtenerMensajeError(error) });
    }
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
        titulo={editando ? `Editar: ${editando.nombreCompleto}` : 'Nuevo beneficiario'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioBeneficiario
          inicial={editando || undefined}
          onSubmit={manejarSubmit}
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