import React from 'react'
import { Link } from 'react-router-dom'
import { useStorefrontStore } from '../stores/storefrontStore'
import { useAuthStore } from '../stores/authStore'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingBag,
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react'

const Dashboard = () => {
  const { storefronts, products } = useStorefrontStore()
  const { user, subscriptionTier } = useAuthStore()

  const stats = [
    {
      name: 'Total Revenue',
      value: '$2,847',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-success'
    },
    {
      name: 'Active Products',
      value: products.length.toString(),
      change: '+3 this week',
      icon: ShoppingBag,
      color: 'text-primary'
    },
    {
      name: 'Storefront Views',
      value: '1,247',
      change: '+18.2%',
      icon: Users,
      color: 'text-accent'
    },
    {
      name: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      icon: TrendingUp,
      color: 'text-success'
    }
  ]

  const recentProducts = products.slice(-3)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Welcome back, {user?.username || 'Influencer'}! 👋
            </h1>
            <p className="text-text-secondary">
              Here's what's happening with your influencer empire today.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Link to="/products" className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
            <Link to="/ai-tools" className="btn-outline flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>AI Tools</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-text-primary mt-1">
                  {stat.value}
                </p>
                <p className={`text-sm mt-1 ${stat.color}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link 
              to="/storefront" 
              className="flex items-center justify-between p-4 bg-bg rounded-lg hover:bg-gray-700 transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Create Storefront</p>
                  <p className="text-sm text-text-secondary">Set up a new storefront in minutes</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-text-secondary" />
            </Link>

            <Link 
              to="/ai-tools" 
              className="flex items-center justify-between p-4 bg-bg rounded-lg hover:bg-gray-700 transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Generate AI Content</p>
                  <p className="text-sm text-text-secondary">Create descriptions and sales prompts</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-text-secondary" />
            </Link>

            <Link 
              to="/products" 
              className="flex items-center justify-between p-4 bg-bg rounded-lg hover:bg-gray-700 transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Manage Products</p>
                  <p className="text-sm text-text-secondary">Add and edit your product catalog</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-text-secondary" />
            </Link>
          </div>
        </div>

        {/* Recent Products */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">
              Recent Products
            </h2>
            <Link to="/products" className="text-primary hover:opacity-80 text-sm font-medium">
              View all
            </Link>
          </div>
          
          {recentProducts.length > 0 ? (
            <div className="space-y-3">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-3 p-3 bg-bg rounded-lg">
                  <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-text-secondary">
                      ${product.price}
                    </p>
                  </div>
                  <div className="text-xs text-text-secondary">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="w-12 h-12 text-text-secondary mx-auto mb-3" />
              <p className="text-text-secondary mb-3">No products yet</p>
              <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Your First Product</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Status */}
      {subscriptionTier === 'free' && (
        <div className="card bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Unlock More AI Power
              </h3>
              <p className="text-text-secondary mb-4 md:mb-0">
                Upgrade to Pro for unlimited AI credits, premium templates, and advanced analytics.
              </p>
            </div>
            <button className="btn-primary px-6 py-2">
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard