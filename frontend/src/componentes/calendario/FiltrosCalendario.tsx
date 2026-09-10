import { Box, Chip, useTheme } from '@mui/material';
import type { TipoEventoCalendario } from '../../tipos/calendario';
import { TIPOS_EVENTO, ETIQUETA_TIPO, COLORES_EVENTO } from '../../utilidades/calendario';

interface FiltrosCalendarioProps {
  tiposActivos: TipoEventoCalendario[];
  onCambiar: (tipos: TipoEventoCalendario[]) => void;
}

/**
 * Chips de filtro por tipo de evento. Filtra en el cliente sobre los datos ya cargados:
 * no dispara ninguna request cuando se oculta/muestra una categoría.
 */
export function FiltrosCalendario({ tiposActivos, onCambiar }: FiltrosCalendarioProps) {
  const theme = useTheme();
  const esOscuro = theme.palette.mode === 'dark';
  const todosActivos = tiposActivos.length === 0;

  const alternar = (tipo: TipoEventoCalendario) => {
    const activo = tiposActivos.includes(tipo);
    onCambiar(activo ? tiposActivos.filter((t) => t !== tipo) : [...tiposActivos, tipo]);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
      <Chip
        label="Todos"
        onClick={() => onCambiar([])}
        color="primary"
        variant={todosActivos ? 'filled' : 'outlined'}
      />
      {TIPOS_EVENTO.map((tipo) => {
        const activo = tiposActivos.includes(tipo);
        const color = COLORES_EVENTO[tipo][esOscuro ? 'oscuro' : 'claro'];
        return (
          <Chip
            key={tipo}
            label={ETIQUETA_TIPO[tipo]}
            onClick={() => alternar(tipo)}
            variant={activo ? 'filled' : 'outlined'}
            sx={{
              '&.MuiChip-filled': {
                backgroundColor: color.fondo,
                color: color.texto,
                fontWeight: 700,
              },
              '&.MuiChip-outlined': {
                borderColor: color.tinta,
                color: color.tinta,
                fontWeight: 600,
                '&:hover': { backgroundColor: `${color.fondo}1A` },
              },
            }}
          />
        );
      })}
    </Box>
  );
}