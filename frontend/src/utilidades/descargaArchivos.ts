import clienteAxios from '../api/clienteAxios';

/**
 * Descarga un archivo binario (.xlsx, .pdf, etc.) desde el backend usando la sesión
 * autenticada. El interceptor de axios ya protege los Blob para no transformarlos.
 */
export async function descargarArchivo(url: string, nombreArchivo: string): Promise<void> {
  const respuesta = await clienteAxios.get<Blob>(url, { responseType: 'blob' });
  const blob = respuesta.data;

  const objectUrl = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = objectUrl;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(objectUrl);
}