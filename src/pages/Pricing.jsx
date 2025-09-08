import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../stores/authStore'
import { SUBSCRIPTION_PLANS, createCheckoutSession } from '../services/stripe'
import { 
  Check, 
  Sparkles, 
  Crown, 
  Zap,
  ArrowRight,
  Star
} from 'lucide-react'

const Pricing = () => {
  const { user, subscriptionTier } = useAuthStore()
  const [isLoading, setIsLoading] = useState(null)
  const [billingCycle, setBillingCycle] = useState('monthly')

  const handleUpgrade = async (planId) => {
    if (planId === 'free' || planId === subscriptionTier) return
    
    setIsLoading(planId)
    try {
      const plan = SUBSCRIPTION_PLANS[planId]
      await createCheckoutSession(plan.priceId)
    } catch (error) {
      console.error('Upgrade error:', error)
      // You could add a toast notification here
    } finally {
      setIsLoading(null)
    }
  }

  const getPlanIcon = (planId) => {
    switch (planId) {
      case 'free':
        return <Sparkles className="text-gray-400" size={24} />
      case 'pro':
        return <Zap className="text-primary" size={24} />
      case 'business':
        return <Crown className="text-accent" size={24} />
      default:
        return <Star className="text-gray-400" size={24} />
    }
  }

  const getPlanColor = (planId) => {
    switch (planId) {
      case 'free':
        return 'border-gray-600'
      case 'pro':
        return 'border-primary shadow-primary/20'
      case 'business':
        return 'border-accent shadow-accent/20'
      default:
        return 'border-gray-600'
    }
  }

  const isCurrentPlan = (planId) => subscriptionTier === planId

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Scale your influencer business with AI-powered tools and automation
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`
                px-6 py-2 rounded-md text-sm font-medium transition-colors
                ${billingCycle === 'monthly' 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`
                px-6 py-2 rounded-md text-sm font-medium transition-colors relative
                ${billingCycle === 'yearly' 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-success text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {Object.entries(SUBSCRIPTION_PLANS).map(([planId, plan], index) => (
            <motion.div
              key={planId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative bg-surface rounded-xl p-8 border-2 transition-all duration-300
                ${getPlanColor(planId)}
                ${planId === 'pro' ? 'scale-105 shadow-xl' : 'hover:shadow-lg'}
              `}
            >
              {/* Popular badge */}
              {planId === 'pro' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {getPlanIcon(planId)}
                </div>
                
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-text-primary">
                    ${billingCycle === 'yearly' ? Math.round(plan.price * 0.8) : plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-text-secondary">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  )}
                </div>

                {billingCycle === 'yearly' && plan.price > 0 && (
                  <p className="text-sm text-success">
                    Save ${Math.round(plan.price * 0.2 * 12)}/year
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="text-success flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleUpgrade(planId)}
                disabled={isCurrentPlan(planId) || isLoading === planId}
                className={`
                  w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
                  flex items-center justify-center gap-2
                  ${isCurrentPlan(planId)
                    ? 'bg-gray-700 text-text-secondary cursor-not-allowed'
                    : planId === 'pro'
                      ? 'btn-primary hover:scale-105'
                      : planId === 'business'
                        ? 'bg-accent text-white hover:opacity-90'
                        : 'btn-outline'
                  }
                `}
              >
                {isLoading === planId ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Processing...
                  </>
                ) : isCurrentPlan(planId) ? (
                  'Current Plan'
                ) : planId === 'free' ? (
                  'Get Started'
                ) : (
                  <>
                    Upgrade Now
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Plan limits info */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Storefronts:</span>
                    <span className="text-text-primary ml-1">
                      {plan.limits.storefronts === -1 ? 'Unlimited' : plan.limits.storefronts}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Products:</span>
                    <span className="text-text-primary ml-1">
                      {plan.limits.products === -1 ? 'Unlimited' : plan.limits.products}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">AI Credits:</span>
                    <span className="text-text-primary ml-1">
                      {plan.limits.aiGenerations}/month
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Integrations:</span>
                    <span className="text-text-primary ml-1">
                      {plan.limits.fulfillmentServices === -1 ? 'All' : plan.limits.fulfillmentServices}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
              },
              {
                question: "What happens if I exceed my AI generation limit?",
                answer: "You'll receive a notification when you're close to your limit. You can either upgrade your plan or wait for your monthly credits to reset."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
              },
              {
                question: "Can I cancel my subscription?",
                answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-surface rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-text-secondary">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-4">
            Need a custom solution for your business?
          </p>
          <button className="btn-outline">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pricing
