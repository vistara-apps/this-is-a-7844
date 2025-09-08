import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { 
  Home, 
  Store, 
  Package, 
  Sparkles, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'

const AppShell = ({ children }) => {
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Storefront', href: '/storefront', icon: Store },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'AI Tools', href: '/ai-tools', icon: Sparkles },
  ]

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-surface transform transition-transform duration-200 ease-in-out
        md:translate-x-0 md:static md:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">InfluencerFlow</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 rounded-md hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-150
                    ${isActive 
                      ? 'bg-primary text-white' 
                      : 'text-text-secondary hover:bg-gray-700 hover:text-text-primary'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User menu */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {user?.username || 'User'}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {user?.subscriptionTier || 'Free'} Plan
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-gray-700 rounded-lg transition-colors duration-150"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:ml-64">
        {/* Top bar */}
        <div className="bg-surface border-b border-gray-700 px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-700 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-text-primary">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-text-secondary">
                AI Credits: 47/50
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell