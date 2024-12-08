import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/contexts/AuthContext';
import { ThemeProvider } from './components/contexts/ThemeContext';
import './index.css';
import './components/styles/themes.css'
import router from './routes/Routes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            className: '',
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-text)',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid var(--toast-border)',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: 'var(--toast-text)',
              },
              style: {
                background: 'var(--toast-success-bg)',
                border: '1px solid var(--toast-success-border)',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: 'var(--toast-text)',
              },
              style: {
                background: 'var(--toast-error-bg)',
                border: '1px solid var(--toast-error-border)',
              },
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);