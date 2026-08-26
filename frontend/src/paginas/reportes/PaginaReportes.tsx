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
          { key: 'beneficiarioId', label: 'Beneficiario ID' },
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
      return new Date(String(valor)).toLocaleDateString('es-ES');
    }
    return String(valor);
  };

  const exportarCSV = () => {
    if (!datosActuales.length) return;
    const headers = columnas.map((c) => c.label).join(',');
    const rows = datosActuales.map((fila) =>
      columnas.map((c) => `"${String(formatearValor(fila as unknown as Record<string, unknown>, c.key)).replace(/"/g, '""')}"`).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reporte-${tipoReporte}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
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
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Reportes y Exportación
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Generar reportes en CSV o PDF
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<TableChart />} onClick={exportarCSV} disabled={!datosActuales.length || cargandoActual}>
            Exportar CSV
          </Button>
          <Button variant="outlined" startIcon={<PictureAsPdf />} onClick={exportarPDF} disabled={!datosActuales.length || cargandoActual || exportando}>
            {exportando ? 'Generando PDF...' : 'Exportar PDF'}
          </Button>
        </Box>
      </Box>

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

      <Card>
        <CardContent>
          {cargandoActual ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              Cargando datos...
            </Typography>
          ) : datosActuales.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No hay datos para mostrar en este reporte
            </Typography>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F5F5F5' }}>
                    {columnas.map((col) => (
                      <th key={col.key} style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0', fontWeight: 600 }}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datosActuales.map((fila, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                      {columnas.map((col) => (
                        <td key={col.key} style={{ padding: '8px 12px', borderBottom: '1px solid #F0F0F0' }}>
                          {formatearValor(fila as unknown as Record<string, unknown>, col.key)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          )}
        </CardContent>
      </Card>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Total de registros: {datosActuales.length}
      </Typography>
    </Box>
  );
}