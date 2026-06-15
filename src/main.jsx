import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setupApiInterceptor } from './utils/apiInterceptor.js'

// Setup global API interceptor to fallback to localStorage if backend server is not running
setupApiInterceptor();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
