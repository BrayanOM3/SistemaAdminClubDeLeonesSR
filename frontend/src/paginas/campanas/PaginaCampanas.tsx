import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useCampanas, useCrearCampana, useActualizarCampana, useEliminarCampana } from '../../hooks/useCampanas';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { DialogoConfirmacion } from '../../componentes/DialogoConfirmacion';
import { EncabezadoPagina } from '../../componentes/EncabezadoPagina';
import { FormularioCampana } from './FormularioCampana';
import type { CampanaDto, CrearCampanaDto, ActualizarCampanaDto } from '../../tipos/campana';
import { useStoreUI } from '../../store/storeUi';
import { obtenerMensajeError } from '../../utilidades/manejoErrores';

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

  const manejarSubmit = async (dto: CrearCampanaDto | ActualizarCampanaDto) => {
    try {
      if (editando) {
        await actualizar({ id: editando.id, dto: dto as ActualizarCampanaDto });
        agregarNotificacion({ tipo: 'exito', mensaje: 'Campaña actualizada correctamente' });
      } else {
        await crear(dto as CrearCampanaDto);
        agregarNotificacion({ tipo: 'exito', mensaje: 'Campaña creada correctamente' });
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
      agregarNotificacion({ tipo: 'exito', mensaje: 'Campaña eliminada correctamente' });
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
        titulo="Campañas"
        descripcion="Gestión de campañas del Club de Leones"
        acciones={
          <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
            Nueva campaña
          </Button>
        }
      />

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
        titulo={editando ? `Editar: ${editando.nombre}` : 'Nueva campaña'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioCampana
          inicial={editando || undefined}
          onSubmit={manejarSubmit}
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