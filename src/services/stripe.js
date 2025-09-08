import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
    features: [
      '1 Storefront',
      '5 Products',
      '50 AI Generations/month',
      'Basic Analytics',
      'Email Support'
    ],
    limits: {
      storefronts: 1,
      products: 5,
      aiGenerations: 50,
      fulfillmentServices: 1
    }
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 29,
    priceId: import.meta.env.VITE_STRIPE_PRO_PRICE_ID,
    features: [
      '5 Storefronts',
      'Unlimited Products',
      '500 AI Generations/month',
      'Advanced Analytics',
      'Priority Support',
      'Custom Branding',
      'Social Media Integration'
    ],
    limits: {
      storefronts: 5,
      products: -1, // unlimited
      aiGenerations: 500,
      fulfillmentServices: 3
    }
  },
  business: {
    id: 'business',
    name: 'Business',
    price: 79,
    priceId: import.meta.env.VITE_STRIPE_BUSINESS_PRICE_ID,
    features: [
      'Unlimited Storefronts',
      'Unlimited Products',
      '2000 AI Generations/month',
      'Advanced Analytics + Insights',
      '24/7 Priority Support',
      'White-label Solution',
      'API Access',
      'Custom Integrations',
      'Dedicated Account Manager'
    ],
    limits: {
      storefronts: -1, // unlimited
      products: -1, // unlimited
      aiGenerations: 2000,
      fulfillmentServices: -1 // unlimited
    }
  }
}

/**
 * Create a checkout session for subscription
 * @param {string} priceId - Stripe price ID
 * @param {string} customerId - Stripe customer ID (optional)
 * @returns {Promise<void>} Redirects to Stripe checkout
 */
export const createCheckoutSession = async (priceId, customerId = null) => {
  try {
    const stripe = await stripePromise
    
    const response = await fetch('/api/payments/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({
        priceId,
        customerId,
        successUrl: `${window.location.origin}/dashboard?success=true`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`
      })
    })

    const session = await response.json()

    if (session.error) {
      throw new Error(session.error)
    }

    // Redirect to Stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      throw new Error(result.error.message)
    }
  } catch (error) {
    console.error('Stripe checkout error:', error)
    throw new Error('Failed to create checkout session')
  }
}

/**
 * Create a customer portal session
 * @returns {Promise<void>} Redirects to Stripe customer portal
 */
export const createPortalSession = async () => {
  try {
    const response = await fetch('/api/payments/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({
        returnUrl: `${window.location.origin}/dashboard`
      })
    })

    const session = await response.json()

    if (session.error) {
      throw new Error(session.error)
    }

    // Redirect to customer portal
    window.location.href = session.url
  } catch (error) {
    console.error('Stripe portal error:', error)
    throw new Error('Failed to access billing portal')
  }
}

/**
 * Get subscription status
 * @returns {Promise<Object>} Subscription details
 */
export const getSubscriptionStatus = async () => {
  try {
    const response = await fetch('/api/payments/subscription-status', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get subscription status')
    }

    return data
  } catch (error) {
    console.error('Subscription status error:', error)
    throw new Error('Failed to get subscription status')
  }
}

/**
 * Update subscription
 * @param {string} newPriceId - New price ID
 * @returns {Promise<Object>} Updated subscription
 */
export const updateSubscription = async (newPriceId) => {
  try {
    const response = await fetch('/api/payments/update-subscription', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({ priceId: newPriceId })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update subscription')
    }

    return data
  } catch (error) {
    console.error('Update subscription error:', error)
    throw new Error('Failed to update subscription')
  }
}

/**
 * Cancel subscription
 * @returns {Promise<Object>} Canceled subscription
 */
export const cancelSubscription = async () => {
  try {
    const response = await fetch('/api/payments/cancel-subscription', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to cancel subscription')
    }

    return data
  } catch (error) {
    console.error('Cancel subscription error:', error)
    throw new Error('Failed to cancel subscription')
  }
}

/**
 * Get plan by tier
 * @param {string} tier - Subscription tier
 * @returns {Object} Plan details
 */
export const getPlanByTier = (tier) => {
  return SUBSCRIPTION_PLANS[tier] || SUBSCRIPTION_PLANS.free
}

/**
 * Check if user can perform action based on plan limits
 * @param {string} tier - User's subscription tier
 * @param {string} action - Action to check (storefronts, products, aiGenerations)
 * @param {number} currentCount - Current count of the resource
 * @returns {boolean} Whether action is allowed
 */
export const canPerformAction = (tier, action, currentCount) => {
  const plan = getPlanByTier(tier)
  const limit = plan.limits[action]
  
  // -1 means unlimited
  if (limit === -1) return true
  
  return currentCount < limit
}

export default {
  createCheckoutSession,
  createPortalSession,
  getSubscriptionStatus,
  updateSubscription,
  cancelSubscription,
  getPlanByTier,
  canPerformAction,
  SUBSCRIPTION_PLANS
}
