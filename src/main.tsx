import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from 'sonner';
import { TRPCProvider } from '@/providers/trpc';
import { QueryProvider } from '@/providers/query';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from '@/contexts/CartContext';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryProvider>
          <TRPCProvider>
            <CartProvider>
              <App />
            </CartProvider>
            <Toaster position="top-center" />
          </TRPCProvider>
        </QueryProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);