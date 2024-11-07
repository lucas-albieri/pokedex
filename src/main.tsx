import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom"
import { theme } from './theme/index.ts'
import { Analytics } from "@vercel/analytics/react"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider
      theme={theme}
    >
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
