export const endpoints = {
  autenticacion: {
    login: '/autenticacion/login',
    validarToken: '/autenticacion/validar-token',
  },
  beneficiarios: {
    base: '/beneficiarios',
    porId: (id: string) => `/beneficiarios/${id}`,
  },
  donaciones: {
    base: '/donaciones',
    porId: (id: string) => `/donaciones/${id}`,
  },
  campanas: {
    base: '/campanas',
    porId: (id: string) => `/campanas/${id}`,
  },
  voluntarios: {
    base: '/voluntarios',
    porId: (id: string) => `/voluntarios/${id}`,
  },
  ayudasSociales: {
    base: '/ayudas-sociales',
    porId: (id: string) => `/ayudas-sociales/${id}`,
  },
  actividades: {
    base: '/actividades',
    porId: (id: string) => `/actividades/${id}`,
  },
  usuarios: {
    base: '/usuarios',
    porId: (id: string) => `/usuarios/${id}`,
  },
  calendario: {
    base: '/calendario',
    rango: (desde: string, hasta: string) => `/calendario?desde=${desde}&hasta=${hasta}`,
    donacionesDelDia: (fecha: string) => `/calendario/${fecha}/donaciones`,
    ayudasSocialesDelDia: (fecha: string) => `/calendario/${fecha}/ayudas-sociales`,
  },
  reportes: {
    base: '/reportes',
    beneficiarios: '/reportes/beneficiarios',
    donaciones: '/reportes/donaciones',
    campanas: '/reportes/campanas',
    voluntarios: '/reportes/voluntarios',
    ayudasSociales: '/reportes/ayudas-sociales',
    actividades: '/reportes/actividades',
  },
} as const;