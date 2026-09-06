import { createTheme } from '@mui/material/styles';

// ── Paleta institucional Club de Leones de San Ramón ──
const LIONS_BLUE = '#00338D';       // Azul institucional (Pantone 286C)
const LIONS_BLUE_LIGHT = '#1A4FA0'; // Azul claro para hover
const LIONS_BLUE_DARK = '#002266';  // Azul oscuro para contraste
const LIONS_GOLD = '#FDB913';       // Dorado institucional (Pantone 1235C)
const LIONS_GOLD_LIGHT = '#FFCC44'; // Dorado claro
const LIONS_GOLD_DARK = '#E0A000';  // Dorado oscuro

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
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#F8F9FC', // Gris azulado muy claro
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E', // Azul muy oscuro para texto
      secondary: '#5A6178', // Gris azulado
    },
    error: {
      main: '#C62828',
      light: '#EF5350',
      dark: '#8E0000',
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
    divider: 'rgba(0, 51, 141, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: LIONS_BLUE,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: LIONS_BLUE,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: LIONS_BLUE,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: LIONS_BLUE,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1A1A2E',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1A1A2E',
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
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 51, 141, 0.04), 0 1px 2px rgba(0, 0, 0, 0.04)',
    '0 2px 6px rgba(0, 51, 141, 0.06), 0 1px 3px rgba(0, 0, 0, 0.05)',
    '0 4px 12px rgba(0, 51, 141, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
    '0 6px 16px rgba(0, 51, 141, 0.1), 0 3px 6px rgba(0, 0, 0, 0.05)',
    '0 8px 24px rgba(0, 51, 141, 0.12), 0 4px 8px rgba(0, 0, 0, 0.05)',
    '0 12px 32px rgba(0, 51, 141, 0.14), 0 6px 12px rgba(0, 0, 0, 0.06)',
    '0 16px 40px rgba(0, 51, 141, 0.16), 0 8px 16px rgba(0, 0, 0, 0.06)',
    '0 20px 48px rgba(0, 51, 141, 0.18), 0 10px 20px rgba(0, 0, 0, 0.07)',
    '0 24px 56px rgba(0, 51, 141, 0.2), 0 12px 24px rgba(0, 0, 0, 0.07)',
    '0 28px 64px rgba(0, 51, 141, 0.22), 0 14px 28px rgba(0, 0, 0, 0.08)',
    '0 32px 72px rgba(0, 51, 141, 0.24), 0 16px 32px rgba(0, 0, 0, 0.08)',
    '0 36px 80px rgba(0, 51, 141, 0.26), 0 18px 36px rgba(0, 0, 0, 0.09)',
    '0 40px 88px rgba(0, 51, 141, 0.28), 0 20px 40px rgba(0, 0, 0, 0.09)',
    '0 44px 96px rgba(0, 51, 141, 0.3), 0 22px 44px rgba(0, 0, 0, 0.1)',
    '0 48px 104px rgba(0, 51, 141, 0.32), 0 24px 48px rgba(0, 0, 0, 0.1)',
    '0 52px 112px rgba(0, 51, 141, 0.34), 0 26px 52px rgba(0, 0, 0, 0.11)',
    '0 56px 120px rgba(0, 51, 141, 0.36), 0 28px 56px rgba(0, 0, 0, 0.11)',
    '0 60px 128px rgba(0, 51, 141, 0.38), 0 30px 60px rgba(0, 0, 0, 0.12)',
    '0 64px 136px rgba(0, 51, 141, 0.4), 0 32px 64px rgba(0, 0, 0, 0.12)',
    '0 68px 144px rgba(0, 51, 141, 0.42), 0 34px 68px rgba(0, 0, 0, 0.13)',
    '0 72px 152px rgba(0, 51, 141, 0.44), 0 36px 72px rgba(0, 0, 0, 0.13)',
    '0 76px 160px rgba(0, 51, 141, 0.46), 0 38px 76px rgba(0, 0, 0, 0.14)',
    '0 80px 168px rgba(0, 51, 141, 0.48), 0 40px 80px rgba(0, 0, 0, 0.14)',
    '0 84px 176px rgba(0, 51, 141, 0.5), 0 42px 84px rgba(0, 0, 0, 0.15)',
  ],
  components: {
    // ── Botones ──
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          fontWeight: 600,
          fontSize: '0.875rem',
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${LIONS_BLUE} 0%, ${LIONS_BLUE_LIGHT} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${LIONS_BLUE_DARK} 0%, ${LIONS_BLUE} 100%)`,
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 51, 141, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${LIONS_GOLD} 0%, ${LIONS_GOLD_LIGHT} 100%)`,
          color: '#1A1A2E',
          '&:hover': {
            background: `linear-gradient(135deg, ${LIONS_GOLD_DARK} 0%, ${LIONS_GOLD} 100%)`,
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(253, 185, 19, 0.4)',
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(0, 51, 141, 0.04)',
          },
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: 'rgba(0, 51, 141, 0.04)',
          },
        },
      },
    },
    // ── Cards ──
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 51, 141, 0.04), 0 1px 2px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 51, 141, 0.06)',
          borderRadius: 12,
          transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 51, 141, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
            borderColor: 'rgba(0, 51, 141, 0.12)',
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
    // ── TextFields ──
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: LIONS_BLUE_LIGHT,
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 3px rgba(0, 51, 141, 0.1)`,
            },
          },
        },
      },
    },
    // ── Select ──
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
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
    // ── Tabla ──
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 51, 141, 0.03)',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: LIONS_BLUE,
            borderBottom: `2px solid rgba(0, 51, 141, 0.1)`,
            fontSize: '0.8125rem',
            letterSpacing: '0.02em',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-body': {
            borderBottom: '1px solid rgba(0, 51, 141, 0.06)',
            fontSize: '0.875rem',
          },
          '& .MuiTableRow-root:hover': {
            backgroundColor: 'rgba(0, 51, 141, 0.02)',
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
          borderRadius: 6,
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
          borderRadius: 16,
          boxShadow: '0 24px 56px rgba(0, 51, 141, 0.2), 0 12px 24px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '1.25rem',
          color: LIONS_BLUE,
          padding: '24px 24px 8px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '8px 24px 24px',
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
          minHeight: '64px',
        },
      },
    },
    // ── List / ListItem ──
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          padding: '10px 16px',
          transition: 'all 0.15s ease-in-out',
          '&.Mui-selected': {
            backgroundColor: 'rgba(253, 185, 19, 0.12)',
            color: LIONS_GOLD_DARK,
            '& .MuiListItemIcon-root': {
              color: LIONS_GOLD_DARK,
            },
            '&:hover': {
              backgroundColor: 'rgba(253, 185, 19, 0.18)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 51, 141, 0.04)',
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
          color: 'rgba(0, 51, 141, 0.3)',
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
            '&.Mui-selected': {
              backgroundColor: LIONS_BLUE,
              color: '#FFFFFF',
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
          borderRadius: 10,
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
            borderRadius: 10,
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
          borderRadius: 6,
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
          borderColor: 'rgba(0, 51, 141, 0.08)',
        },
      },
    },
    // ── LinearProgress ──
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
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
          borderRadius: 6,
          '&::after': {
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 51, 141, 0.04) 50%, transparent 100%)',
          },
        },
      },
    },
    // ── TableRow (zebra striping + hover mejorado) ──
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease-in-out',
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(0, 51, 141, 0.015)',
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 51, 141, 0.04) !important',
          },
        },
      },
    },
    // ── Backdrop (blur para diálogos) ──
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 15, 42, 0.5)',
          backdropFilter: 'blur(4px)',
        },
      },
    },
    // ── IconButton (mejores focus/hover states) ──
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
      main: LIONS_GOLD, // En oscuro, el dorado es más legible como primario
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
      default: '#0D1117',
      paper: '#161B22',
    },
    text: {
      primary: '#E6EDF3',
      secondary: '#8B949E',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
  },
  components: {
    ...tema.components,
    MuiCard: {
      ...tema.components?.MuiCard,
      styleOverrides: {
        ...tema.components?.MuiCard?.styleOverrides,
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 12,
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(253, 185, 19, 0.05)',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: LIONS_GOLD,
            borderBottom: '2px solid rgba(253, 185, 19, 0.15)',
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-body': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          },
          '& .MuiTableRow-root:hover': {
            backgroundColor: 'rgba(253, 185, 19, 0.03)',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(255, 255, 255, 0.015)',
          },
          '&:hover': {
            backgroundColor: 'rgba(253, 185, 19, 0.04) !important',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          padding: '10px 16px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(253, 185, 19, 0.12)',
            color: LIONS_GOLD,
            '& .MuiListItemIcon-root': {
              color: LIONS_GOLD,
            },
            '&:hover': {
              backgroundColor: 'rgba(253, 185, 19, 0.18)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        },
      },
    },
  },
});
