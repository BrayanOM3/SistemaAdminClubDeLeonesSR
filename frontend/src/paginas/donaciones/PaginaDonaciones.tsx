import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useDonaciones, useCrearDonacion, useActualizarDonacion, useEliminarDonacion } from '../../hooks/useDonaciones';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { DialogoConfirmacion } from '../../componentes/DialogoConfirmacion';
import { EncabezadoPagina } from '../../componentes/EncabezadoPagina';
import { FormularioDonacion } from './FormularioDonacion';
import type { DonacionDto, CrearDonacionDto, ActualizarDonacionDto } from '../../tipos/donacion';
import { useStoreUI } from '../../store/storeUi';
import { obtenerMensajeError } from '../../utilidades/manejoErrores';

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

  const manejarSubmit = async (dto: CrearDonacionDto | ActualizarDonacionDto) => {
    try {
      if (editando) {
        await actualizar({ id: editando.id, dto: dto as ActualizarDonacionDto });
        agregarNotificacion({ tipo: 'exito', mensaje: 'Donación actualizada correctamente' });
      } else {
        await crear(dto as CrearDonacionDto);
        agregarNotificacion({ tipo: 'exito', mensaje: 'Donación registrada correctamente' });
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
      agregarNotificacion({ tipo: 'exito', mensaje: 'Donación eliminada correctamente' });
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
        titulo="Donaciones"
        descripcion="Registro y gestión de donaciones"
        acciones={
          <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
            Nueva donación
          </Button>
        }
      />

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
        titulo={editando ? `Editar: ${editando.donanteNombre}` : 'Nueva donación'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioDonacion
          inicial={editando || undefined}
          onSubmit={manejarSubmit}
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