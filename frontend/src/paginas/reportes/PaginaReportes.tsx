import { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { PictureAsPdf, TableChart, Assessment } from '@mui/icons-material';
import { useBeneficiarios } from '../../hooks/useBeneficiarios';
import { useDonaciones } from '../../hooks/useDonaciones';
import { useCampanas } from '../../hooks/useCampanas';
import { useVoluntarios } from '../../hooks/useVoluntarios';
import { useAyudasSociales } from '../../hooks/useAyudasSociales';
import { useActividades } from '../../hooks/useActividades';
import { formatoMoneda } from '../../utilidades/formateadores';
import { EncabezadoPagina } from '../../componentes/EncabezadoPagina';
import { TablaDatos } from '../../componentes/TablaDatos';
import { descargarArchivo } from '../../utilidades/descargaArchivos';
import { endpoints } from '../../api/constantesEndpoints';

type TipoReporte = 'beneficiarios' | 'donaciones' | 'campanas' | 'voluntarios' | 'ayudasSociales' | 'actividades';

const tiposReporte: { value: TipoReporte; label: string; icono: React.ReactNode }[] = [
  { value: 'beneficiarios', label: 'Beneficiarios', icono: <Assessment /> },
  { value: 'donaciones', label: 'Donaciones', icono: <Assessment /> },
  { value: 'campanas', label: 'Campañas', icono: <Assessment /> },
  { value: 'voluntarios', label: 'Voluntarios', icono: <Assessment /> },
  { value: 'ayudasSociales', label: 'Ayudas Sociales', icono: <Assessment /> },
  { value: 'actividades', label: 'Actividades', icono: <Assessment /> },
];

export function PaginaReportes() {
  const { data: beneficiarios, isLoading: cargandoBeneficiarios } = useBeneficiarios();
  const { data: donaciones, isLoading: cargandoDonaciones } = useDonaciones();
  const { data: campanas, isLoading: cargandoCampanas } = useCampanas();
  const { data: voluntarios, isLoading: cargandoVoluntarios } = useVoluntarios();
  const { data: ayudas, isLoading: cargandoAyudas } = useAyudasSociales();
  const { data: actividades, isLoading: cargandoActividades } = useActividades();

  const [tipoReporte, setTipoReporte] = useState<TipoReporte>('beneficiarios');
  const [exportando, setExportando] = useState(false);

  const datosPorTipo = {
    beneficiarios: beneficiarios,
    donaciones: donaciones,
    campanas: campanas,
    voluntarios: voluntarios,
    ayudasSociales: ayudas,
    actividades: actividades,
  };

  const cargandoPorTipo = {
    beneficiarios: cargandoBeneficiarios,
    donaciones: cargandoDonaciones,
    campanas: cargandoCampanas,
    voluntarios: cargandoVoluntarios,
    ayudasSociales: cargandoAyudas,
    actividades: cargandoActividades,
  };

  const datosActuales = datosPorTipo[tipoReporte] || [];
  const cargandoActual = cargandoPorTipo[tipoReporte];

  const obtenerColumnas = (tipo: TipoReporte) => {
    switch (tipo) {
      case 'beneficiarios':
        return [
          { key: 'nombreCompleto', label: 'Nombre completo' },
          { key: 'cedula', label: 'Cédula' },
          { key: 'telefono', label: 'Teléfono' },
          { key: 'correo', label: 'Correo' },
          { key: 'direccion', label: 'Dirección' },
          { key: 'estadoCivil', label: 'Estado civil' },
          { key: 'situacionNecesidad', label: 'Situación necesidad' },
          { key: 'fechaRegistro', label: 'Fecha registro' },
          { key: 'estado', label: 'Estado' },
        ];
      case 'donaciones':
        return [
          { key: 'donanteNombre', label: 'Donante' },
          { key: 'tipo', label: 'Tipo' },
          { key: 'monto', label: 'Monto' },
          { key: 'descripcion', label: 'Descripción' },
          { key: 'fecha', label: 'Fecha' },
          { key: 'reciboNumero', label: 'Recibo' },
        ];
      case 'campanas':
        return [
          { key: 'nombre', label: 'Nombre' },
          { key: 'descripcion', label: 'Descripción' },
          { key: 'fechaInicio', label: 'Fecha inicio' },
          { key: 'fechaFin', label: 'Fecha fin' },
          { key: 'objetivoMonto', label: 'Objetivo' },
          { key: 'estado', label: 'Estado' },
          { key: 'tipo', label: 'Tipo' },
        ];
      case 'voluntarios':
        return [
          { key: 'nombreCompleto', label: 'Nombre completo' },
          { key: 'cedula', label: 'Cédula' },
          { key: 'telefono', label: 'Teléfono' },
          { key: 'correo', label: 'Correo' },
          { key: 'fechaIngreso', label: 'Fecha ingreso' },
          { key: 'disponibilidad', label: 'Disponibilidad' },
          { key: 'especialidad', label: 'Especialidad' },
          { key: 'estado', label: 'Estado' },
        ];
      case 'ayudasSociales':
        return [
          { key: 'nombreBeneficiario', label: 'Beneficiario' },
          { key: 'tipo', label: 'Tipo' },
          { key: 'descripcion', label: 'Descripción' },
          { key: 'monto', label: 'Monto' },
          { key: 'fechaEntrega', label: 'Fecha entrega' },
          { key: 'estado', label: 'Estado' },
        ];
      case 'actividades':
        return [
          { key: 'nombre', label: 'Nombre' },
          { key: 'descripcion', label: 'Descripción' },
          { key: 'tipo', label: 'Tipo' },
          { key: 'fecha', label: 'Fecha' },
          { key: 'lugar', label: 'Lugar' },
        ];
      default:
        return [];
    }
  };

  const columnas = obtenerColumnas(tipoReporte);

  const formatearValor = (fila: Record<string, unknown>, key: string) => {
    const valor = fila[key];
    if (valor === null || valor === undefined) return '';
    if (key.includes('Monto') || key === 'monto' || key === 'objetivoMonto') {
      return formatoMoneda(Number(valor));
    }
    if (key.includes('Fecha') || key === 'fecha' || key === 'fechaInicio' || key === 'fechaFin' || key === 'fechaRegistro' || key === 'fechaIngreso' || key === 'fechaEntrega') {
      // Parsear 'yyyy-MM-dd' como fecha LOCAL para evitar desface de zona horaria
      const fechaStr = String(valor);
      let d: Date;
      if (/^\d{4}-\d{2}-\d{2}$/.test(fechaStr)) {
        const [anio, mes, dia] = fechaStr.split('-').map(Number);
        d = new Date(anio, mes - 1, dia);
      } else {
        d = new Date(fechaStr);
      }
      return d.toLocaleDateString('es-ES');
    }
    return String(valor);
  };

  const urlReportePorTipo: Record<TipoReporte, string> = {
    beneficiarios: endpoints.reportes.beneficiarios,
    donaciones: endpoints.reportes.donaciones,
    campanas: endpoints.reportes.campanas,
    voluntarios: endpoints.reportes.voluntarios,
    ayudasSociales: endpoints.reportes.ayudasSociales,
    actividades: endpoints.reportes.actividades,
  };

  const exportarExcel = async () => {
    if (!datosActuales.length || exportando) return;
    setExportando(true);
    try {
      const fecha = new Date().toISOString().split('T')[0];
      await descargarArchivo(urlReportePorTipo[tipoReporte], `reporte-${tipoReporte}-${fecha}.xlsx`);
    } catch (error) {
      console.error('Error al generar el reporte Excel:', error);
      alert('No se pudo generar el archivo de Excel. Verifique que el servidor esté disponible.');
    } finally {
      setExportando(false);
    }
  };

  const exportarPDF = async () => {
    if (!datosActuales.length) return;
    setExportando(true);
    try {
      const { jsPDF } = await import('jspdf');
      const { autoTable } = await import('jspdf-autotable');

      const doc = new jsPDF('landscape');
      doc.setFontSize(16);
      doc.text(`Reporte de ${tiposReporte.find((t) => t.value === tipoReporte)?.label || tipoReporte}`, 14, 15);
      doc.setFontSize(10);
      doc.text(`Generado: ${new Date().toLocaleString('es-ES')}`, 14, 22);
      doc.text(`Total registros: ${datosActuales.length}`, 14, 28);

      autoTable(doc, {
        startY: 35,
        head: [columnas.map((c) => c.label)],
        body: datosActuales.map((fila) =>
          columnas.map((c) => formatearValor(fila as unknown as Record<string, unknown>, c.key))
        ),
        styles: { fontSize: 7, cellPadding: 2 },
        headStyles: { fillColor: [27, 94, 32] },
        alternateRowStyles: { fillColor: [240, 248, 240] },
      });

      doc.save(`reporte-${tipoReporte}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar PDF. Asegúrese de tener instaladas las dependencias: npm install jspdf jspdf-autotable');
    } finally {
      setExportando(false);
    }
  };

  return (
    <Box>
      <EncabezadoPagina
        titulo="Reportes y Exportación"
        descripcion="Generar reportes en Excel o PDF"
        acciones={
          <>
            <Button variant="outlined" startIcon={<TableChart />} onClick={exportarExcel} disabled={!datosActuales.length || cargandoActual || exportando}>
              {exportando ? 'Generando Excel...' : 'Exportar Excel'}
            </Button>
            <Button variant="outlined" startIcon={<PictureAsPdf />} onClick={exportarPDF} disabled={!datosActuales.length || cargandoActual || exportando}>
              {exportando ? 'Generando PDF...' : 'Exportar PDF'}
            </Button>
          </>
        }
      />

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <FormControl size="small" sx={{ minWidth: 250 }}>
            <InputLabel id="tipo-reporte-label">Tipo de reporte</InputLabel>
            <Select
              labelId="tipo-reporte-label"
              value={tipoReporte}
              label="Tipo de reporte"
              onChange={(e) => setTipoReporte(e.target.value as TipoReporte)}
            >
              {tiposReporte.map((tipo) => (
                <MenuItem key={tipo.value} value={tipo.value}>
                  {tipo.icono} {tipo.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Vista previa con TablaDatos (theme-aware): búsqueda, orden y paginación, legible en claro y oscuro */}
      <TablaDatos
        datos={datosActuales}
        columnas={columnas.map((col) => ({
          campo: col.key,
          encabezado: col.label,
          ordenable: true,
          formatear: (_valor, fila) =>
            formatearValor(fila as unknown as Record<string, unknown>, col.key),
        }))}
        claveUnica="id"
        cargando={cargandoActual}
        vacioMensaje="No hay datos para mostrar en este reporte"
      />

      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Total de registros: {datosActuales.length}
      </Typography>
    </Box>
  );
}