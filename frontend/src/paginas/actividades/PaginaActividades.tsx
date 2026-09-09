import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useActividades, useCrearActividad, useActualizarActividad, useEliminarActividad } from '../../hooks/useActividades';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { DialogoConfirmacion } from '../../componentes/DialogoConfirmacion';
import { EncabezadoPagina } from '../../componentes/EncabezadoPagina';
import { FormularioActividad } from './FormularioActividad';
import type { ActividadDto, CrearActividadDto, ActualizarActividadDto } from '../../tipos/actividad';
import { useStoreUI } from '../../store/storeUi';
import { obtenerMensajeError } from '../../utilidades/manejoErrores';

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
    try {
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
    } catch (error) {
      agregarNotificacion({ tipo: 'error', mensaje: obtenerMensajeError(error) });
    }
  };

  const manejarEliminar = async () => {
    if (!eliminarConfirmar) return;
    try {
      await eliminar(eliminarConfirmar.id);
      agregarNotificacion({ tipo: 'exito', mensaje: 'Actividad eliminada correctamente' });
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
        titulo="Actividades"
        descripcion="Gestión de actividades y eventos"
        acciones={
          <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
            Nueva actividad
          </Button>
        }
      />

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