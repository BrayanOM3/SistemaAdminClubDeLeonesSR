import { createBrowserRouter } from 'react-router-dom';
import { LayoutPrincipal } from '../layouts/LayoutPrincipal';
import { LayoutAutenticacion } from '../layouts/LayoutAutenticacion';
import { RutaProtegida } from './RutaProtegida';
import { PaginaLogin } from '../paginas/autenticacion/PaginaLogin';
import { PaginaInicio } from '../paginas/inicio/PaginaInicio';
import { PaginaBeneficiarios } from '../paginas/beneficiarios/PaginaBeneficiarios';
import { PaginaDonaciones } from '../paginas/donaciones/PaginaDonaciones';
import { PaginaCampanas } from '../paginas/campanas/PaginaCampanas';
import { PaginaVoluntarios } from '../paginas/voluntarios/PaginaVoluntarios';
import { PaginaAyudasSociales } from '../paginas/ayudasSociales/PaginaAyudasSociales';
import { PaginaActividades } from '../paginas/actividades/PaginaActividades';
import { PaginaReportes } from '../paginas/reportes/PaginaReportes';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LayoutAutenticacion />,
    children: [
      { index: true, element: <PaginaLogin /> },
    ],
  },
  {
    element: <LayoutPrincipal />,
    children: [
      { path: '/inicio', element: <PaginaInicio /> },
      { path: '/beneficiarios', element: <PaginaBeneficiarios /> },
      { path: '/donaciones', element: <PaginaDonaciones /> },
      { path: '/campanas', element: <PaginaCampanas /> },
      { path: '/voluntarios', element: <PaginaVoluntarios /> },
      { path: '/ayudas-sociales', element: <PaginaAyudasSociales /> },
      { path: '/actividades', element: <PaginaActividades /> },
      { path: '/reportes', element: <PaginaReportes /> },
    ],
  },
  { path: '*', element: <Navigate to="/inicio" replace /> },
]);

import { Navigate } from 'react-router-dom';