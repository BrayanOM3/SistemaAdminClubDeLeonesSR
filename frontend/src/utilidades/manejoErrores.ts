import type { AxiosError } from 'axios';

interface CuerpoError {
  detail?: string;
  title?: string;
  Detail?: string;
  Title?: string;
  errors?: Record<string, unknown>;
  Errors?: Record<string, unknown>;
}

/**
 * Extrae el primer mensaje legible de un diccionario de errores de validación
 * (formato ValidationProblemDetails de FluentValidation: campo -> mensajes[]).
 */
function primerMensaje(diccionario: Record<string, unknown> | undefined): string | null {
  if (!diccionario) return null;

  for (const valor of Object.values(diccionario)) {
    if (Array.isArray(valor)) {
      const mensajes = valor.filter((m): m is string => typeof m === 'string' && m.length > 0);
      if (mensajes.length > 0) return mensajes.join(' ');
    } else if (typeof valor === 'string' && valor.length > 0) {
      return valor;
    }
  }

  return null;
}

/**
 * Extrae un mensaje legible a partir de un error de Axios.
 *
 * Soporta dos formas de respuesta del backend:
 *  - ProblemDetails del middleware (camelCase): { detail, title }
 *  - ValidationProblemDetails de FluentValidation (PascalCase, PropertyNamingPolicy = null):
 *    { Errors: { Campo: ["mensaje"] } }
 */
export function obtenerMensajeError(error: unknown, fallback = 'Ha ocurrido un error inesperado'): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const data = (error as AxiosError<CuerpoError>).response?.data;

    if (data) {
      const desdeErrores = primerMensaje(data.errors ?? data.Errors);
      if (desdeErrores) return desdeErrores;

      const detalle = data.detail ?? data.Detail;
      if (detalle) return detalle;

      const titulo = data.title ?? data.Title;
      if (titulo) return titulo;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
