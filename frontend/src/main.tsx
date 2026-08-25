import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { tema, temaOscuro } from './tema/tema';
import { useStoreUI } from './store/storeUi';
import { router } from './rutas/rutasApp';
import { RouterProvider } from 'react-router-dom';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppWrapper() {
  const { temaOscuro: modoOscuro } = useStoreUI();
  const theme = modoOscuro ? temaOscuro : tema;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RouterProvider router={router} />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);