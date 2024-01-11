import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './style.css'
import UserProvider, { LOCAL_STORAGE_KEY } from './contexts/UserContext'
import App from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
