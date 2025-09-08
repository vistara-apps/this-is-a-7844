import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './stores/authStore'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import StorefrontSetup from './pages/StorefrontSetup'
import ProductManager from './pages/ProductManager'
import AITools from './pages/AITools'
import Pricing from './pages/Pricing'
import AppShell from './components/AppShell'

function App() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'hsl(215 28% 20%)',
              color: 'hsl(0 0% 95%)',
              border: '1px solid hsl(215 28% 30%)',
            },
            success: {
              iconTheme: {
                primary: 'hsl(120 40% 50%)',
                secondary: 'hsl(0 0% 95%)',
              },
            },
            error: {
              iconTheme: {
                primary: 'hsl(0 70% 50%)',
                secondary: 'hsl(0 0% 95%)',
              },
            },
          }}
        />
      </>
    )
  }

  return (
    <>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/storefront" element={<StorefrontSetup />} />
          <Route path="/products" element={<ProductManager />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </AppShell>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(215 28% 20%)',
            color: 'hsl(0 0% 95%)',
            border: '1px solid hsl(215 28% 30%)',
          },
          success: {
            iconTheme: {
              primary: 'hsl(120 40% 50%)',
              secondary: 'hsl(0 0% 95%)',
            },
          },
          error: {
            iconTheme: {
              primary: 'hsl(0 70% 50%)',
              secondary: 'hsl(0 0% 95%)',
            },
          },
        }}
      />
    </>
  )
}

export default App
