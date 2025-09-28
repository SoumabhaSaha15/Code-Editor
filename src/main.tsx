import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/themes/md-light-indigo/theme.css";
import ThemeProvider from "./context/ThemeProvider.tsx";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/primereact.min.css";
import { createRoot } from 'react-dom/client'
import { Toast } from "primereact/toast";
import "primeicons/primeicons.css";
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: true }}>
      <ThemeProvider>
        <Toast />
        <App />
      </ThemeProvider>
    </PrimeReactProvider>
  </StrictMode>,
);