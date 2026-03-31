import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';




import AppRoutes from './AppRoutes'
import { AuthProvider } from './features/auth/auth.contes'

import { SongProvider } from './features/home/Song.conext'

function App() {

  return (
    <AuthProvider>
      <SongProvider>

        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </SongProvider>
    </AuthProvider>
  )
}

export default App
