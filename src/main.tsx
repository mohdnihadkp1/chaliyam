import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext.tsx';

// Register PWA service worker for full offline support and performance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      (err) => {
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </HelmetProvider>
);
