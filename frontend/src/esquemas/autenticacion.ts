import { z } from 'zod';

export const esquemaIniciarSesion = z.object({
  nombreUsuario: z.string().min(1, 'El nombre de usuario es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export type IniciarSesionFormData = z.infer<typeof esquemaIniciarSesion>;