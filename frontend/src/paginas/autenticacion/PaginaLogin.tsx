import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
} from '@mui/material';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { esquemaIniciarSesion, type IniciarSesionFormData } from '../../esquemas/autenticacion';
import { autenticacionServicio } from '../../servicios/autenticacionServicio';
import { useStoreSesion } from '../../store/storeSesion';
import { useStoreUI } from '../../store/storeUi';

export function PaginaLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { iniciarSesion } = useStoreSesion();
  const { agregarNotificacion } = useStoreUI();
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recordar, setRecordar] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname || '/inicio';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IniciarSesionFormData>({
    resolver: zodResolver(esquemaIniciarSesion),
  });

  const manejarSubmit = async (data: IniciarSesionFormData) => {
    setCargando(true);
    setError(null);

    try {
      const respuesta = await autenticacionServicio.iniciarSesion(data);
      iniciarSesion(respuesta);
      agregarNotificacion({ tipo: 'exito', mensaje: 'Bienvenido de nuevo' });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : 'Error al iniciar sesión';
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { mensaje?: string } } };
        setError(axiosError.response?.data?.mensaje || 'Credenciales inválidas');
      } else {
        setError(mensaje);
      }
      agregarNotificacion({ tipo: 'error', mensaje: error || 'Credenciales inválidas' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Iniciar sesión
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Ingresa tus credenciales para acceder al sistema
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(manejarSubmit)} noValidate>
        <TextField
          fullWidth
          label="Nombre de usuario"
          {...register('nombreUsuario')}
          error={!!errors.nombreUsuario}
          helperText={errors.nombreUsuario?.message}
          margin="normal"
          autoComplete="username"
          autoFocus
        />

        <TextField
          fullWidth
          label="Contraseña"
          type={mostrarPassword ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  edge="end"
                  aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {mostrarPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={<Checkbox checked={recordar} onChange={(e) => setRecordar(e.target.checked)} />}
          label="Recordarme"
          sx={{ mb: 2, display: 'block' }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={cargando}
          sx={{ py: 1.5 }}
        >
          {cargando ? <CircularProgress size={24} color="inherit" /> : 'Iniciar sesión'}
        </Button>
      </form>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Usuario de prueba: <strong>admin@clubdeleones.org</strong> / <strong>Admin123!</strong>
        </Typography>
      </Box>
    </Box>
  );
}