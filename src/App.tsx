/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyles } from './theme/globalStyles';
import { Router } from './routes/index.routes';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {

  return (
    <QueryClientProvider
      client={queryClient}
    >
      <HelmetProvider>
        <Router />
        <GlobalStyles />
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
