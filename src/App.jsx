import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import StorefrontSetup from './pages/StorefrontSetup'
import ProductManager from './pages/ProductManager'
import AITools from './pages/AITools'
import AppShell from './components/AppShell'

function App() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Landing />
  }

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/storefront" element={<StorefrontSetup />} />
        <Route path="/products" element={<ProductManager />} />
        <Route path="/ai-tools" element={<AITools />} />
      </Routes>
    </AppShell>
  )
}

export default App