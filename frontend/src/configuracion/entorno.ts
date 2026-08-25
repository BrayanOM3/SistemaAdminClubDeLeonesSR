const apiUrl = import.meta.env.VITE_API_URL ?? 'https://localhost:7001/api/v1';

export const entorno = {
  apiUrl,
} as const;

export type Entorno = typeof entorno;