import axios from 'axios'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  getProfile: () => api.get('/auth/profile'),
}

// User API
export const userAPI = {
  updateProfile: (data) => api.put('/users/profile', data),
  updateSubscription: (tier) => api.put('/users/subscription', { tier }),
  getUsage: () => api.get('/users/usage'),
  connectSocialMedia: (platform, credentials) => 
    api.post('/users/social-connect', { platform, credentials }),
}

// Storefront API
export const storefrontAPI = {
  getStorefronts: () => api.get('/storefronts'),
  createStorefront: (data) => api.post('/storefronts', data),
  updateStorefront: (id, data) => api.put(`/storefronts/${id}`, data),
  deleteStorefront: (id) => api.delete(`/storefronts/${id}`),
  getStorefront: (id) => api.get(`/storefronts/${id}`),
  publishStorefront: (id) => api.post(`/storefronts/${id}/publish`),
}

// Product API
export const productAPI = {
  getProducts: (storefrontId) => api.get(`/products?storefrontId=${storefrontId}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getProduct: (id) => api.get(`/products/${id}`),
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/products/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
}

// AI API
export const aiAPI = {
  generateDescription: (productInfo) => 
    api.post('/ai/generate-description', productInfo),
  generateSalesPrompt: (productInfo, promptType) => 
    api.post('/ai/generate-sales-prompt', { productInfo, promptType }),
  getUsageStats: () => api.get('/ai/usage'),
}

// Payment API (Stripe)
export const paymentAPI = {
  createSubscription: (priceId) => 
    api.post('/payments/create-subscription', { priceId }),
  updateSubscription: (subscriptionId, priceId) => 
    api.put('/payments/update-subscription', { subscriptionId, priceId }),
  cancelSubscription: (subscriptionId) => 
    api.delete(`/payments/cancel-subscription/${subscriptionId}`),
  getPaymentMethods: () => api.get('/payments/methods'),
  addPaymentMethod: (paymentMethodId) => 
    api.post('/payments/add-method', { paymentMethodId }),
}

// Fulfillment API
export const fulfillmentAPI = {
  getServices: () => api.get('/fulfillment/services'),
  connectService: (service, credentials) => 
    api.post('/fulfillment/connect', { service, credentials }),
  syncProducts: (serviceId) => api.post(`/fulfillment/sync/${serviceId}`),
  createOrder: (orderData) => api.post('/fulfillment/orders', orderData),
  getOrders: () => api.get('/fulfillment/orders'),
}

// Analytics API
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getStorefrontAnalytics: (storefrontId) => 
    api.get(`/analytics/storefront/${storefrontId}`),
  getProductAnalytics: (productId) => 
    api.get(`/analytics/product/${productId}`),
}

export default api
