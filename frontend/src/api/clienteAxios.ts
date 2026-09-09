import axios from 'axios';
import { entorno } from '../configuracion/entorno';
import { useStoreSesion } from '../store/storeSesion';
import { aCamelCase, aPascalCase } from '../utilidades/transformadores';

const clienteAxios = axios.create({
  baseURL: entorno.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

clienteAxios.interceptors.request.use((config) => {
  const token = useStoreSesion.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Transformar datos de salida a PascalCase para el backend
  try {
    if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
      config.data = aPascalCase(config.data);
    }
  } catch (e) {
    console.warn('Error transformando request a PascalCase:', e);
  }

  return config;
});

clienteAxios.interceptors.response.use(
  (response) => {
    // No transformar respuestas binarias (ej. descarga de archivos .xlsx): un Blob
    // no debe pasar por aCamelCase porque perdería el contenido binario.
    if (response.data instanceof Blob) return response;

    // Transformar datos de entrada a camelCase para el frontend
    try {
      if (response.data && typeof response.data === 'object') {
        response.data = aCamelCase(response.data);
      }
    } catch (e) {
      // Si falla la transformación, devolver los datos originales
      console.warn('Error transformando respuesta a camelCase:', e);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      useStoreSesion.getState().cerrarSesion();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default clienteAxios;