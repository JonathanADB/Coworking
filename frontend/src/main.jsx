import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import { AuthProvider } from './auth/auth-context.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    </>
);