import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FontProvider } from './contexts/FontContext'
import App from './App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FontProvider>
      <BrowserRouter basename="/architecturesdata">
        <App />
      </BrowserRouter>
    </FontProvider>
  </React.StrictMode>,
)
