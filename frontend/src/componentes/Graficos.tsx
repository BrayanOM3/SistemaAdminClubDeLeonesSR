import { Box, Typography, useTheme } from '@mui/material';

interface Punto {
  x: number;
  y: number;
}

function suavizarPuntos(puntos: Punto[]): string {
  if (puntos.length < 2) return '';
  let d = `M ${puntos[0].x} ${puntos[0].y}`;
  for (let i = 0; i < puntos.length - 1; i++) {
    const p0 = puntos[i];
    const p1 = puntos[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

interface GraficoAreaProps {
  valores: number[];
  etiquetas: string[];
  alto?: number;
  colorLinea?: string;
}

/**
 * Gráfico de área suave con relleno degradado — estilo "sales overview" de Soft UI.
 */
export function GraficoArea({ valores, etiquetas, alto = 190, colorLinea = '#00338D' }: GraficoAreaProps) {
  const theme = useTheme();
  const oscuro = theme.palette.mode === 'dark';
  const ancho = 600;
  const altoTotal = 220;
  const pad = 10;
  const base = oscuro ? '#121A2E' : '#FFFFFF';

  const max = Math.max(...valores, 1);
  const stepX = (ancho - pad * 2) / Math.max(valores.length - 1, 1);
  const puntos: Punto[] = valores.map((v, i) => ({
    x: pad + i * stepX,
    y: altoTotal - pad - (v / max) * (altoTotal - pad * 2),
  }));

  const linea = suavizarPuntos(puntos);
  const area =
    linea && puntos.length > 0
      ? `${linea} L ${puntos[puntos.length - 1].x} ${altoTotal} L ${puntos[0].x} ${altoTotal} Z`
      : '';

  const incremento = altoTotal / 4;
  const gridlines = [1, 2, 3].map((i) => altoTotal - pad - i * (incremento * 0.8));

  return (
    <Box>
      <Box sx={{ height: alto, width: '100%' }}>
        <svg
          viewBox={`0 0 ${ancho} ${altoTotal}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={`grad-area-${colorLinea}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorLinea} stopOpacity={0.28} />
              <stop offset="100%" stopColor={colorLinea} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Líneas de guía horizontales */}
          {gridlines.map((y, i) => (
            <line
              key={i}
              x1={0}
              x2={ancho}
              y1={y}
              y2={y}
              stroke={oscuro ? 'rgba(255,255,255,0.08)' : 'rgba(15,36,71,0.06)'}
              strokeWidth={1}
              strokeDasharray="4 6"
            />
          ))}

          {area && <path d={area} fill={`url(#grad-area-${colorLinea})`} />}
          {linea && (
            <path
              d={linea}
              fill="none"
              stroke={colorLinea}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Puntos sobre la línea */}
          {puntos.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill={base}
              stroke={colorLinea}
              strokeWidth={2.5}
            />
          ))}
        </svg>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, mt: 0.75 }}>
        {etiquetas.map((etiqueta, i) => (
          <Typography
            key={i}
            sx={{
              flex: 1,
              textAlign: i === 0 ? 'left' : i === etiquetas.length - 1 ? 'right' : 'center',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'text.secondary',
            }}
          >
            {etiqueta}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

interface GraficoBarrasProps {
  datos: { etiqueta: string; valor: number }[];
  alto?: number;
  color?: string;
  colorSegundo?: string;
}

/**
 * Gráfico de barras con extremos redondeados — fondo oscuro estilo Soft UI.
 */
export function GraficoBarras({ datos, alto = 150, color = '#FDB913', colorSegundo = '#FFCC44' }: GraficoBarrasProps) {
  const ancho = 600;
  const altoTotal = 200;
  const pad = 12;

  const max = Math.max(...datos.map((d) => d.valor), 1);
  const segW = ancho / datos.length;
  const barW = Math.min(38, segW * 0.52);

  return (
    <Box>
      <Box sx={{ height: alto, width: '100%' }}>
        <svg
          viewBox={`0 0 ${ancho} ${altoTotal}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          {datos.map((d, i) => {
            const altura = Math.max((d.valor / max) * (altoTotal - pad * 2), 2);
            const x = i * segW + (segW - barW) / 2;
            const y = altoTotal - pad - altura;
            const id = `grad-bar-${i}`;
            return (
              <g key={i}>
                <defs>
                  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colorSegundo} />
                    <stop offset="100%" stopColor={color} />
                  </linearGradient>
                </defs>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={altura}
                  rx={10}
                  fill={`url(#${id})`}
                />
              </g>
            );
          })}
        </svg>
      </Box>

      <Box sx={{ display: 'flex', px: 0.5, mt: 0.5 }}>
        {datos.map((d, i) => (
          <Typography
            key={i}
            sx={{
              flex: 1,
              textAlign: 'center',
              fontSize: '0.68rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.75)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              px: 0.25,
            }}
            title={d.etiqueta}
          >
            {d.etiqueta}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}