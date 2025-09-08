import React, { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { 
  Sparkles, 
  Store, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  Check,
  Play
} from 'lucide-react'

const Landing = () => {
  const { login } = useAuthStore()
  const [isSigningUp, setIsSigningUp] = useState(false)

  const handleGetStarted = () => {
    setIsSigningUp(true)
    // Simulate signup process
    setTimeout(() => {
      login({
        username: 'influencer_sarah',
        email: 'sarah@example.com',
        subscriptionTier: 'free'
      })
    }, 2000)
  }

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Generated Product Descriptions',
      description: 'Create compelling product descriptions that convert with our advanced AI technology.'
    },
    {
      icon: Store,
      title: 'One-Click Storefront Setup',
      description: 'Launch your professional storefront in minutes, no technical skills required.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Sales Prompts',
      description: 'Generate engaging social media content that drives traffic and sales.'
    },
    {
      icon: TrendingUp,
      title: 'Automated Fulfillment',
      description: 'Connect to drop-shipping services and automate your entire sales process.'
    }
  ]

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: ['1 Storefront', '50 AI Credits/month', 'Basic Templates', 'Email Support'],
      buttonText: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      features: ['5 Storefronts', '500 AI Credits/month', 'Premium Templates', 'Priority Support', 'Analytics Dashboard'],
      buttonText: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Business',
      price: '$79',
      period: '/month',
      features: ['Unlimited Storefronts', 'Unlimited AI Credits', 'Custom Branding', 'White-label Options', 'Dedicated Support'],
      buttonText: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 tracking-tight">
              Automate Your
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Influencer Empire</span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
              Create AI-powered storefronts, generate compelling product descriptions, and craft engaging sales copy. 
              Turn your social media presence into a profitable business with zero technical skills.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                disabled={isSigningUp}
                className="btn-primary px-8 py-4 text-lg flex items-center space-x-2 disabled:opacity-50"
              >
                {isSigningUp ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Setting up your account...</span>
                  </>
                ) : (
                  <>
                    <span>Start Free Today</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              
              <button className="btn-outline px-8 py-4 text-lg flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
            
            <p className="text-sm text-text-secondary mt-4">
              No credit card required • 50 AI credits included • Setup in 2 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Everything you need to monetize your influence
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              From storefront creation to AI-powered content generation, we've got you covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-modal transition-shadow duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-text-secondary">
              Choose the plan that fits your influencer journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`card relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-text-primary">
                      {plan.price}
                    </span>
                    <span className="text-text-secondary ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-lg font-medium transition-colors duration-150 ${
                    plan.popular 
                      ? 'bg-primary text-white hover:opacity-90' 
                      : 'btn-outline'
                  }`}
                  onClick={plan.name === 'Free' ? handleGetStarted : undefined}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your influence into income?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of influencers who have automated their success with InfluencerFlow AI
          </p>
          <button
            onClick={handleGetStarted}
            disabled={isSigningUp}
            className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-150 disabled:opacity-50"
          >
            {isSigningUp ? 'Setting up...' : 'Start Your Free Trial'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing