/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyles } from './theme/globalStyles';
import { Router } from './routes/index.routes';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache()
})

function App() {

  return (
    <ApolloProvider
      client={client}
    >
      <HelmetProvider>
        <Router />
        <GlobalStyles />
      </HelmetProvider>
    </ApolloProvider>
  )
}

export default App
