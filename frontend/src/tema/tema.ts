import { createTheme } from '@mui/material/styles';

// ── Paleta institucional Club de Leones de San Ramón ──
const LIONS_BLUE = '#00338D';       // Azul institucional (Pantone 286C)
const LIONS_BLUE_LIGHT = '#1A4FA0'; // Azul claro para hover
const LIONS_BLUE_DARK = '#002266';  // Azul oscuro para contraste
const LIONS_GOLD = '#FDB913';       // Dorado institucional (Pantone 1235C)
const LIONS_GOLD_LIGHT = '#FFCC44'; // Dorado claro
const LIONS_GOLD_DARK = '#E0A000';  // Dorado oscuro

// ── Superficies Soft UI ──
const SOFT_BG_LIGHT = '#EDF1F8';      // Fondo general: gris muy claro azulado
const SOFT_SURFACE_LIGHT = '#F4F7FC'; // Superficies internas (búsqueda, listas)
const SOFT_BG_DARK = '#0A0F1E';       // Fondo oscuro: azul marino profundo
const SOFT_PAPER_DARK = '#121A2E';    // Panel oscuro
const TEXT_DARK_NAVY = '#0F2447';     // Texto principal azul marino

// ── Sombras difusas "flotantes" ──
const CARD_SHADOW_LIGHT =
  '0 2px 6px rgba(15, 36, 71, 0.04), 0 22px 40px -18px rgba(15, 36, 71, 0.18)';
const CARD_SHADOW_DARK =
  '0 2px 6px rgba(0, 0, 0, 0.30), 0 24px 48px -18px rgba(0, 0, 0, 0.60)';
const CARD_SHADOW_HOVER_LIGHT =
  '0 2px 6px rgba(15, 36, 71, 0.05), 0 30px 52px -18px rgba(15, 36, 71, 0.24)';
const CARD_SHADOW_HOVER_DARK =
  '0 2px 6px rgba(0, 0, 0, 0.34), 0 32px 58px -18px rgba(0, 0, 0, 0.66)';

export const tema = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: LIONS_BLUE,
      light: LIONS_BLUE_LIGHT,
      dark: LIONS_BLUE_DARK,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: LIONS_GOLD,
      light: LIONS_GOLD_LIGHT,
      dark: LIONS_GOLD_DARK,
      contrastText: '#1A1A2E',
    },
    background: {
      default: SOFT_BG_LIGHT,
      paper: '#FFFFFF',
    },
    text: {
      primary: TEXT_DARK_NAVY,
      secondary: '#5A6178',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#9A0007',
    },
    warning: {
      main: '#E65100',
      light: '#FF9800',
      dark: '#AC1900',
    },
    info: {
      main: LIONS_BLUE,
      light: LIONS_BLUE_LIGHT,
      dark: LIONS_BLUE_DARK,
    },
    success: {
      main: '#2E7D32',
      light: '#60AD5E',
      dark: '#005005',
    },
    divider: 'rgba(15, 36, 71, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      color: TEXT_DARK_NAVY,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 800,
      letterSpacing: '-0.01em',
      color: TEXT_DARK_NAVY,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: TEXT_DARK_NAVY,
    },
    h4: {
      fontSize: '1.375rem',
      fontWeight: 700,
      color: TEXT_DARK_NAVY,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 700,
      color: TEXT_DARK_NAVY,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
      color: TEXT_DARK_NAVY,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#5A6178',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#5A6178',
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#5A6178',
    },
    overline: {
      fontSize: '0.6875rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(15, 36, 71, 0.04), 0 1px 2px rgba(0, 0, 0, 0.04)',
    '0 2px 6px rgba(15, 36, 71, 0.06), 0 1px 3px rgba(0, 0, 0, 0.05)',
    '0 4px 12px rgba(15, 36, 71, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
    '0 6px 16px rgba(15, 36, 71, 0.10), 0 3px 6px rgba(0, 0, 0, 0.05)',
    '0 8px 24px rgba(15, 36, 71, 0.12), 0 4px 8px rgba(0, 0, 0, 0.05)',
    '0 12px 32px rgba(15, 36, 71, 0.14), 0 6px 12px rgba(0, 0, 0, 0.06)',
    '0 16px 40px rgba(15, 36, 71, 0.16), 0 8px 16px rgba(0, 0, 0, 0.06)',
    '0 20px 48px rgba(15, 36, 71, 0.18), 0 10px 20px rgba(0, 0, 0, 0.07)',
    '0 24px 56px rgba(15, 36, 71, 0.20), 0 12px 24px rgba(0, 0, 0, 0.07)',
    '0 28px 64px rgba(15, 36, 71, 0.22), 0 14px 28px rgba(0, 0, 0, 0.08)',
    '0 32px 72px rgba(15, 36, 71, 0.24), 0 16px 32px rgba(0, 0, 0, 0.08)',
    '0 36px 80px rgba(15, 36, 71, 0.26), 0 18px 36px rgba(0, 0, 0, 0.09)',
    '0 40px 88px rgba(15, 36, 71, 0.28), 0 20px 40px rgba(0, 0, 0, 0.09)',
    '0 44px 96px rgba(15, 36, 71, 0.30), 0 22px 44px rgba(0, 0, 0, 0.10)',
    '0 48px 104px rgba(15, 36, 71, 0.32), 0 24px 48px rgba(0, 0, 0, 0.10)',
    '0 52px 112px rgba(15, 36, 71, 0.34), 0 26px 52px rgba(0, 0, 0, 0.11)',
    '0 56px 120px rgba(15, 36, 71, 0.36), 0 28px 56px rgba(0, 0, 0, 0.11)',
    '0 60px 128px rgba(15, 36, 71, 0.38), 0 30px 60px rgba(0, 0, 0, 0.12)',
    '0 64px 136px rgba(15, 36, 71, 0.40), 0 32px 64px rgba(0, 0, 0, 0.12)',
    '0 68px 144px rgba(15, 36, 71, 0.42), 0 34px 68px rgba(0, 0, 0, 0.13)',
    '0 72px 152px rgba(15, 36, 71, 0.44), 0 36px 72px rgba(0, 0, 0, 0.13)',
    '0 76px 160px rgba(15, 36, 71, 0.46), 0 38px 76px rgba(0, 0, 0, 0.14)',
    '0 80px 168px rgba(15, 36, 71, 0.48), 0 40px 80px rgba(0, 0, 0, 0.14)',
    '0 84px 176px rgba(15, 36, 71, 0.50), 0 42px 84px rgba(0, 0, 0, 0.15)',
  ],
  components: {
    // ── Botones ──
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '9px 20px',
          fontWeight: 600,
          fontSize: '0.875rem',
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${LIONS_BLUE} 0%, ${LIONS_BLUE_LIGHT} 100%)`,
          boxShadow: '0 8px 18px -8px rgba(0, 51, 141, 0.55)',
          '&:hover': {
            background: `linear-gradient(135deg, ${LIONS_BLUE_DARK} 0%, ${LIONS_BLUE} 100%)`,
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 22px -8px rgba(0, 51, 141, 0.6)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${LIONS_GOLD} 0%, ${LIONS_GOLD_LIGHT} 100%)`,
          color: '#1A1A2E',
          boxShadow: '0 8px 18px -8px rgba(253, 185, 19, 0.6)',
          '&:hover': {
            background: `linear-gradient(135deg, ${LIONS_GOLD_DARK} 0%, ${LIONS_GOLD} 100%)`,
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 22px -8px rgba(253, 185, 19, 0.65)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(0, 51, 141, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(0, 51, 141, 0.05)',
            borderColor: LIONS_BLUE,
          },
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: 'rgba(0, 51, 141, 0.05)',
          },
        },
      },
    },
    // ── Cards: panel flotante con esquinas grandes y sombra difusa ──
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 20,
          boxShadow: CARD_SHADOW_LIGHT,
          border: 'none',
          transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
          '&:hover': {
            boxShadow: CARD_SHADOW_HOVER_LIGHT,
          },
        },
      },
    },
    // ── Paper ──
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    // ── TextFields: input suave con fondo gris claro y borde redondeado ──
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            backgroundColor: SOFT_SURFACE_LIGHT,
            transition: 'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#EDF1F8',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 0 3px rgba(0, 51, 141, 0.12)`,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: LIONS_BLUE,
                borderWidth: 1,
              },
            },
          },
        },
      },
    },
    // ── Select ──
    MuiSelect: {
      defaultProps: {
        size: 'small',
        variant: 'outlined' as const,
      },
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: SOFT_SURFACE_LIGHT,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
        },
      },
    },
    // ── FormControl / InputLabel ──
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          '&.Mui-focused': {
            color: LIONS_BLUE,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFormHelperText-root': {
            fontSize: '0.75rem',
          },
        },
      },
    },
    // ── Tabla: filas limpias sin bordes duros ──
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 36, 71, 0.03)',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'rgba(15, 36, 71, 0.6)',
            borderBottom: 'none',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-body': {
            borderBottom: '1px solid rgba(15, 36, 71, 0.05)',
            fontSize: '0.875rem',
          },
          '& .MuiTableRow-root:hover': {
            backgroundColor: 'rgba(0, 51, 141, 0.03)',
          },
        },
      },
    },
    // ── Chips ──
    MuiChip: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
          fontSize: '0.75rem',
        },
        colorPrimary: {
          backgroundColor: LIONS_BLUE,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: LIONS_BLUE_LIGHT,
          },
        },
        colorSecondary: {
          backgroundColor: LIONS_GOLD,
          color: '#1A1A2E',
          '&:hover': {
            backgroundColor: LIONS_GOLD_LIGHT,
          },
        },
      },
    },
    // ── Dialogs ──
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          boxShadow: '0 8px 20px rgba(10, 20, 45, 0.08), 0 30px 70px -20px rgba(10, 20, 45, 0.4)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '1.25rem',
          color: TEXT_DARK_NAVY,
          padding: '24px 28px 8px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '16px 28px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '8px 28px 28px',
        },
      },
    },
    // ── Menús ──
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(10, 20, 45, 0.06), 0 24px 56px -16px rgba(10, 20, 45, 0.35)',
        },
      },
    },
    // ── AppBar ──
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    // ── Toolbar ──
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '72px',
        },
      },
    },
    // ── List / ListItem (sidebar: ítem activo como pill sólido) ──
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 12px',
          padding: '10px 14px',
          transition: 'all 0.18s ease-in-out',
          '&.Mui-selected': {
            backgroundColor: LIONS_BLUE,
            color: '#FFFFFF',
            boxShadow: '0 8px 18px -8px rgba(0, 51, 141, 0.6)',
            '& .MuiListItemIcon-root': {
              color: '#FFFFFF',
            },
            '&:hover': {
              backgroundColor: LIONS_BLUE_LIGHT,
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(15, 36, 71, 0.05)',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 500,
          fontSize: '0.875rem',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: 'inherit',
        },
      },
    },
    // ── Breadcrumbs ──
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          color: 'rgba(15, 36, 71, 0.3)',
        },
        li: {
          '& a': {
            color: LIONS_BLUE,
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
    },
    // ── Pagination ──
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: 10,
            fontWeight: 600,
            '&.Mui-selected': {
              backgroundColor: LIONS_BLUE,
              color: '#FFFFFF',
              boxShadow: '0 6px 14px -6px rgba(0, 51, 141, 0.6)',
              '&:hover': {
                backgroundColor: LIONS_BLUE_LIGHT,
              },
            },
          },
        },
      },
    },
    // ── Alert ──
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          fontWeight: 500,
        },
        filledInfo: {
          backgroundColor: LIONS_BLUE,
        },
      },
    },
    // ── Snackbar ──
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            borderRadius: 14,
            boxShadow: '0 4px 12px rgba(10, 20, 45, 0.08), 0 20px 44px -12px rgba(10, 20, 45, 0.4)',
          },
        },
      },
    },
    // ── Tabs ──
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          '&.Mui-selected': {
            color: LIONS_BLUE,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: LIONS_GOLD,
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    // ── Tooltip ──
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: LIONS_BLUE_DARK,
          fontSize: '0.75rem',
          borderRadius: 10,
          padding: '6px 12px',
        },
        arrow: {
          color: LIONS_BLUE_DARK,
        },
      },
    },
    // ── Divider ──
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(15, 36, 71, 0.08)',
        },
      },
    },
    // ── LinearProgress ──
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: 'rgba(0, 51, 141, 0.08)',
        },
        colorPrimary: {
          backgroundColor: LIONS_BLUE,
        },
      },
    },
    // ── Skeleton ──
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&::after': {
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 51, 141, 0.06) 50%, transparent 100%)',
          },
        },
      },
    },
    // ── TableRow (zebra + hover suave) ──
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease-in-out',
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(15, 36, 71, 0.018)',
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 51, 141, 0.03) !important',
          },
        },
      },
    },
    // ── Backdrop (blur para diálogos) ──
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(8, 15, 34, 0.5)',
          backdropFilter: 'blur(6px)',
        },
      },
    },
    // ── IconButton ──
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.15s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(0, 51, 141, 0.06)',
          },
        },
      },
    },
  },
});

// ── Tema oscuro ──
export const temaOscuro = createTheme({
  ...tema,
  palette: {
    ...tema.palette,
    mode: 'dark',
    primary: {
      main: LIONS_GOLD,
      light: LIONS_GOLD_LIGHT,
      dark: LIONS_GOLD_DARK,
      contrastText: '#1A1A2E',
    },
    secondary: {
      main: LIONS_BLUE_LIGHT,
      light: '#4A7FC4',
      dark: LIONS_BLUE,
      contrastText: '#FFFFFF',
    },
    background: {
      default: SOFT_BG_DARK,
      paper: SOFT_PAPER_DARK,
    },
    text: {
      primary: '#E8EDF7',
      secondary: '#8B94AE',
    },
    divider: 'rgba(255, 255, 255, 0.07)',
  },
  components: {
    ...tema.components,
    MuiCard: {
      ...tema.components?.MuiCard,
      styleOverrides: {
        ...tema.components?.MuiCard?.styleOverrides,
        root: {
          boxShadow: CARD_SHADOW_DARK,
          borderRadius: 20,
          backgroundImage: 'none',
          border: 'none',
          '&:hover': {
            boxShadow: CARD_SHADOW_HOVER_DARK,
          },
        },
      },
    },
    MuiTextField: {
      ...tema.components?.MuiTextField,
      styleOverrides: {
        ...tema.components?.MuiTextField?.styleOverrides,
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.09)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '&.Mui-focused': {
              backgroundColor: SOFT_PAPER_DARK,
              boxShadow: `0 0 0 3px rgba(253, 185, 19, 0.15)`,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: LIONS_GOLD,
                borderWidth: 1,
              },
            },
          },
        },
      },
    },
    MuiSelect: {
      ...tema.components?.MuiSelect,
      styleOverrides: {
        ...tema.components?.MuiSelect?.styleOverrides,
        root: {
          borderRadius: 14,
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
        },
      },
    },
    MuiTableHead: {
      ...tema.components?.MuiTableHead,
      styleOverrides: {
        ...tema.components?.MuiTableHead?.styleOverrides,
        root: {
          backgroundColor: 'rgba(253, 185, 19, 0.05)',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: LIONS_GOLD,
            borderBottom: 'none',
          },
        },
      },
    },
    MuiTableBody: {
      ...tema.components?.MuiTableBody,
      styleOverrides: {
        ...tema.components?.MuiTableBody?.styleOverrides,
        root: {
          '& .MuiTableCell-body': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          },
          '& .MuiTableRow-root:hover': {
            backgroundColor: 'rgba(253, 185, 19, 0.04)',
          },
        },
      },
    },
    MuiTableRow: {
      ...tema.components?.MuiTableRow,
      styleOverrides: {
        ...tema.components?.MuiTableRow?.styleOverrides,
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          },
          '&:hover': {
            backgroundColor: 'rgba(253, 185, 19, 0.04) !important',
          },
        },
      },
    },
    MuiListItemButton: {
      ...tema.components?.MuiListItemButton,
      styleOverrides: {
        ...tema.components?.MuiListItemButton?.styleOverrides,
        root: {
          borderRadius: 12,
          margin: '4px 12px',
          padding: '10px 14px',
          '&.Mui-selected': {
            backgroundColor: LIONS_GOLD,
            color: '#1A1A2E',
            boxShadow: '0 8px 18px -8px rgba(253, 185, 19, 0.55)',
            '& .MuiListItemIcon-root': {
              color: '#1A1A2E',
            },
            '&:hover': {
              backgroundColor: LIONS_GOLD_LIGHT,
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiDialog: {
      ...tema.components?.MuiDialog,
      styleOverrides: {
        ...tema.components?.MuiDialog?.styleOverrides,
        paper: {
          borderRadius: 24,
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4), 0 30px 70px -20px rgba(0, 0, 0, 0.8)',
        },
      },
    },
    MuiPagination: {
      ...tema.components?.MuiPagination,
      styleOverrides: {
        ...tema.components?.MuiPagination?.styleOverrides,
        root: {
          '& .MuiPaginationItem-root': {
            '&.Mui-selected': {
              backgroundColor: LIONS_GOLD,
              color: '#1A1A2E',
              '&:hover': {
                backgroundColor: LIONS_GOLD_LIGHT,
              },
            },
          },
        },
      },
    },
    MuiTooltip: {
      ...tema.components?.MuiTooltip,
      styleOverrides: {
        ...tema.components?.MuiTooltip?.styleOverrides,
        tooltip: {
          backgroundColor: '#0A0F1E',
        },
        arrow: {
          color: '#0A0F1E',
        },
      },
    },
  },
});