import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStoreSesion } from '../store/storeSesion';
import type { ReactNode } from 'react';

interface RutaProtegidaProps {
  rolesPermitidos?: string[];
  children?: ReactNode;
}

export function RutaProtegida({ rolesPermitidos, children }: RutaProtegidaProps) {
  const { estaAutenticado, rol } = useStoreSesion();
  const location = useLocation();

  if (!estaAutenticado) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (rolesPermitidos && rolesPermitidos.length > 0 && rol && !rolesPermitidos.includes(rol)) {
    return <Navigate to="/inicio" replace />;
  }

  return children ?? <Outlet />;
}