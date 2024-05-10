import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/index.jsx'
import './styles/global.css'
import { AuthProvider } from './auth/auth-context.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
      <AuthProvider>
        <App />
      </AuthProvider>
    </>,
)
