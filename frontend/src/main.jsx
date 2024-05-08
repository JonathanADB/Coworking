import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/index.jsx'
import './styles/global.css'
import { AuthProvider } from './auth/auth-context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
)