import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Expression from './features/faces/pages/Expression'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './features/auth/auth.contes'

import { SongProvider } from './features/home/Song.conext'

function App() {

  return (
    <AuthProvider>
      <SongProvider>

        <AppRoutes />
      </SongProvider>
    </AuthProvider>
  )
}

export default App
