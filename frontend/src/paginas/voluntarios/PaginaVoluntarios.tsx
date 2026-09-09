import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useVoluntarios, useCrearVoluntario, useActualizarVoluntario, useEliminarVoluntario } from '../../hooks/useVoluntarios';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { DialogoConfirmacion } from '../../componentes/DialogoConfirmacion';
import { EncabezadoPagina } from '../../componentes/EncabezadoPagina';
import { FormularioVoluntario } from './FormularioVoluntario';
import type { VoluntarioDto, CrearVoluntarioDto, ActualizarVoluntarioDto } from '../../tipos/voluntario';
import { useStoreUI } from '../../store/storeUi';
import { obtenerMensajeError } from '../../utilidades/manejoErrores';

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

  const manejarSubmit = async (dto: CrearVoluntarioDto | ActualizarVoluntarioDto) => {
    try {
      if (editando) {
        await actualizar({ id: editando.id, dto: dto as ActualizarVoluntarioDto });
        agregarNotificacion({ tipo: 'exito', mensaje: 'Voluntario actualizado correctamente' });
      } else {
        await crear(dto as CrearVoluntarioDto);
        agregarNotificacion({ tipo: 'exito', mensaje: 'Voluntario registrado correctamente' });
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
      agregarNotificacion({ tipo: 'exito', mensaje: 'Voluntario eliminado correctamente' });
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
      <EncabezadoPagina
        titulo="Voluntarios"
        descripcion="Gestión de voluntarios del Club de Leones"
        acciones={
          <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
            Nuevo voluntario
          </Button>
        }
      />

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
        titulo={editando ? `Editar: ${editando.nombreCompleto}` : 'Nuevo voluntario'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioVoluntario
          inicial={editando || undefined}
          onSubmit={manejarSubmit}
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