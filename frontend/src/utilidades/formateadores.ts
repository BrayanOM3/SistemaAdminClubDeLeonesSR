export function formatoFechaCorta(fecha: string | Date | undefined | null): string {
  if (!fecha) return '';
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatoFechaLarga(fecha: string | Date | undefined | null): string {
  if (!fecha) return '';
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}

export function formatoFechaHora(fecha: string | Date | undefined | null): string {
  if (!fecha) return '';
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(d.getTime())) return '';
  return d.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function formatoMoneda(valor: number | undefined | null): string {
  if (valor === null || valor === undefined || isNaN(valor)) return '$0.00';
  return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC', minimumFractionDigits: 2 }).format(valor);
}

export function formatoNumero(valor: number | undefined | null): string {
  if (valor === null || valor === undefined || isNaN(valor)) return '0';
  return new Intl.NumberFormat('es-CR').format(valor);
}

export function truncarTexto(texto: string, maxLongitud: number): string {
  if (!texto || texto.length <= maxLongitud) return texto || '';
  return texto.substring(0, maxLongitud).trim() + '...';
}

export function iniciales(nombre: string): string {
  if (!nombre) return '?';
  const partes = nombre.trim().split(/\s+/);
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}