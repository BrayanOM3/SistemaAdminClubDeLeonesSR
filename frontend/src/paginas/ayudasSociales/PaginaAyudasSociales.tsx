import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useAyudasSociales, useCrearAyudaSocial, useActualizarAyudaSocial, useEliminarAyudaSocial } from '../../hooks/useAyudasSociales';
import { TablaDatos, formateadores } from '../../componentes/TablaDatos';
import { DialogoFormulario } from '../../componentes/DialogoFormulario';
import { DialogoConfirmacion } from '../../componentes/DialogoConfirmacion';
import { EncabezadoPagina } from '../../componentes/EncabezadoPagina';
import { FormularioAyudaSocial } from './FormularioAyudaSocial';
import type { AyudaSocialDto, CrearAyudaSocialDto, ActualizarAyudaSocialDto } from '../../tipos/ayudaSocial';
import { useStoreUI } from '../../store/storeUi';
import { obtenerMensajeError } from '../../utilidades/manejoErrores';

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

  const manejarSubmit = async (dto: CrearAyudaSocialDto | ActualizarAyudaSocialDto) => {
    try {
      if (editando) {
        await actualizar({ id: editando.id, dto: dto as ActualizarAyudaSocialDto });
        agregarNotificacion({ tipo: 'exito', mensaje: 'Ayuda social actualizada correctamente' });
      } else {
        await crear(dto as CrearAyudaSocialDto);
        agregarNotificacion({ tipo: 'exito', mensaje: 'Ayuda social registrada correctamente' });
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
      agregarNotificacion({ tipo: 'exito', mensaje: 'Ayuda social eliminada correctamente' });
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
        titulo="Ayudas Sociales"
        descripcion="Registro y seguimiento de ayudas entregadas"
        acciones={
          <Button variant="contained" startIcon={<Add />} onClick={abrirNuevo} disabled={creando}>
            Nueva ayuda
          </Button>
        }
      />

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
        titulo={editando ? `Editar ayuda #${editando.id.substring(0, 8)}` : 'Nueva ayuda social'}
        ancho="lg"
        cargando={creando || actualizando}
      >
        <FormularioAyudaSocial
          inicial={editando || undefined}
          onSubmit={manejarSubmit}
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