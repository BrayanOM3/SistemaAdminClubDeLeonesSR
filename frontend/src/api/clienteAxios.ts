import axios from 'axios';
import { entorno } from '../configuracion/entorno';
import { useStoreSesion } from '../store/storeSesion';

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
  return config;
});

clienteAxios.interceptors.response.use(
  (response) => response,
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