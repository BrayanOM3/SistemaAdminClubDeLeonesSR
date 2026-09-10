import type { EventInput } from '@fullcalendar/core';
import type { EventoCalendarioDto, TipoEventoCalendario } from '../tipos/calendario';
import { idUtilizable } from '../tipos/calendario';

export const TIPOS_EVENTO: TipoEventoCalendario[] = ['Campana', 'Actividad', 'Donacion', 'AyudaSocial'];

export const ETIQUETA_TIPO: Record<TipoEventoCalendario, string> = {
  Campana: 'Campaña',
  Actividad: 'Actividad',
  Donacion: 'Donación',
  AyudaSocial: 'Ayuda Social',
};

interface ColorEvento {
  fondo: string;
  texto: string;
  /** Tinta para chips "outlined" (borde y texto legibles sobre el fondo de página). */
  tinta: string;
}

/** Colores por tipo, derivados de la paleta de PaginaInicio (Lions), con variante clara/oscura. */
export const COLORES_EVENTO: Record<TipoEventoCalendario, { claro: ColorEvento; oscuro: ColorEvento }> = {
  Campana: {
    claro: { fondo: '#C89211', texto: '#FFFFFF', tinta: '#8A6508' },
    oscuro: { fondo: '#E0B84F', texto: '#1A1A2E', tinta: '#E0B84F' },
  },
  Actividad: {
    claro: { fondo: '#6A1B9A', texto: '#FFFFFF', tinta: '#5A1480' },
    oscuro: { fondo: '#B77BE0', texto: '#1A1A2E', tinta: '#B77BE0' },
  },
  Donacion: {
    claro: { fondo: '#FDB913', texto: '#1A1A2E', tinta: '#996A00' },
    oscuro: { fondo: '#FFD75E', texto: '#1A1A2E', tinta: '#FFD75E' },
  },
  AyudaSocial: {
    claro: { fondo: '#00838F', texto: '#FFFFFF', tinta: '#005F69' },
    oscuro: { fondo: '#35BEC9', texto: '#0A0F1E', tinta: '#35BEC9' },
  },
};

// --- Helpers de fechas: solo aritmética en UTC, nunca new Date('yyyy-MM-dd') ---

function aPartes(fecha: string): { anio: number; mes: number; dia: number } {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  return { anio, mes, dia };
}

export function aStringYYYYMMDD(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}

export function diaSiguiente(fecha: string): string {
  const { anio, mes, dia } = aPartes(fecha);
  return aStringYYYYMMDD(new Date(Date.UTC(anio, mes - 1, dia + 1)));
}

export function diaAnterior(fecha: string): string {
  const { anio, mes, dia } = aPartes(fecha);
  return aStringYYYYMMDD(new Date(Date.UTC(anio, mes - 1, dia - 1)));
}

/** Fecha de hoy en formato yyyy-MM-dd (hora local, consistente con el calendario). */
export function hoyYYYYMMDD(): string {
  const ahora = new Date();
  const anio = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

/**
 * Mapea un EventoCalendarioDto a un EventInput de FullCalendar.
 * - start = fechaInicio (all-day local).
 * - El `end` de FullCalendar es EXCLUSIVO: para campañas con rango se pasa
 *   fechaFin + 1 día para que se pinte incluyendo la fecha fin.
 */
export function eventoAEventoFullCalendar(evento: EventoCalendarioDto, modoOscuro: boolean): EventInput {
  const color = COLORES_EVENTO[evento.tipo][modoOscuro ? 'oscuro' : 'claro'];
  const id = idUtilizable(evento.id);
  return {
    id: `${evento.tipo}-${evento.esAgregado ? evento.fechaInicio : (id ?? 'sin-id')}`,
    title: evento.titulo,
    start: evento.fechaInicio,
    end: evento.fechaFin ? diaSiguiente(evento.fechaFin) : undefined,
    allDay: true,
    display: 'auto',
    editable: !evento.esAgregado,
    durationEditable: evento.tipo === 'Campana',
    backgroundColor: color.fondo,
    borderColor: color.fondo,
    textColor: color.texto,
    extendedProps: {
      tipo: evento.tipo,
      id,
      esAgregado: evento.esAgregado,
      fechaInicio: evento.fechaInicio,
      cantidadAgregada: evento.cantidadAgregada ?? null,
      montoTotalAgregado: evento.montoTotalAgregado ?? null,
    },
  };
}