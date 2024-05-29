import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import { AuthProvider } from './auth/auth-context.jsx';
import { DataProvider } from './components/DataContext';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
      <ErrorBoundary>
        <AuthProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </AuthProvider>
      </ErrorBoundary>
    </>
);