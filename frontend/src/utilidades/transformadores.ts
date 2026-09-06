/**
 * Utilidades para transformar datos del backend (PascalCase) a frontend (camelCase)
 */

function esObjetoPlano(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

export function aCamelCase<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => aCamelCase(item)) as T;
  }

  if (esObjetoPlano(obj)) {
    const resultado: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
      resultado[camelKey] = aCamelCase(value);
    }
    return resultado as T;
  }

  // Para Date, RegExp, y otros objetos no planos, devolver tal cual
  return obj;
}

export function aPascalCase<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => aPascalCase(item)) as T;
  }

  if (esObjetoPlano(obj)) {
    const resultado: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
      resultado[pascalKey] = aPascalCase(value);
    }
    return resultado as T;
  }

  return obj;
}