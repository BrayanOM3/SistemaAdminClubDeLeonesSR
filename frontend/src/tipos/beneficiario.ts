export interface BeneficiarioDto {
  id: string;
  nombreCompleto: string;
  cedula: string;
  fechaNacimiento?: string;
  telefono?: string;
  correo?: string;
  direccion: string;
  estadoCivil: EstadoCivil;
  situacionNecesidad: string;
  fechaRegistro: string;
  estado: EstadoBeneficiario;
  observaciones?: string;
}

export interface CrearBeneficiarioDto {
  nombreCompleto: string;
  cedula: string;
  fechaNacimiento?: string;
  telefono?: string;
  correo?: string;
  direccion: string;
  estadoCivil: EstadoCivil;
  situacionNecesidad: string;
  observaciones?: string;
}

export interface ActualizarBeneficiarioDto {
  nombreCompleto?: string;
  cedula?: string;
  fechaNacimiento?: string;
  telefono?: string;
  correo?: string;
  direccion?: string;
  estadoCivil?: EstadoCivil;
  situacionNecesidad?: string;
  estado?: EstadoBeneficiario;
  observaciones?: string;
}

export type EstadoBeneficiario = 'Activo' | 'Inactivo';

export type EstadoCivil = 'Soltero' | 'Casado' | 'Viudo' | 'Divorciado' | 'Otro';