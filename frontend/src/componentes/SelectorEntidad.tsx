import { Autocomplete, TextField } from '@mui/material';

export interface OpcionSelector {
  id: string;
  etiqueta: string;
}

interface SelectorEntidadProps {
  opciones: OpcionSelector[];
  value: string | null;
  onChange: (id: string | null) => void;
  label: string;
  requerido?: boolean;
  cargando?: boolean;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export function SelectorEntidad({
  opciones,
  value,
  onChange,
  label,
  requerido = false,
  cargando = false,
  placeholder,
  disabled = false,
  error = false,
  helperText,
}: SelectorEntidadProps) {
  const seleccionado = opciones.find((opcion) => opcion.id === value) || null;

  return (
    <Autocomplete
      options={opciones}
      getOptionLabel={(opcion) => opcion.etiqueta}
      isOptionEqualToValue={(opcion, valor) => opcion.id === valor.id}
      value={seleccionado}
      onChange={(_evento, nueva) => onChange(nueva ? nueva.id : null)}
      disabled={disabled}
      loading={cargando}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label={requerido ? `${label} *` : label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}
