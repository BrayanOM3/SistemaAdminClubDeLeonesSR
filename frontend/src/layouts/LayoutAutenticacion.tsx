import { Outlet } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';

export function LayoutAutenticacion() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 440, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
              Club de Leones
            </Typography>
            <Typography variant="body2" color="text.secondary">
              San Ramón
            </Typography>
          </Box>
          <Outlet />
        </CardContent>
      </Card>
    </Box>
  );
}