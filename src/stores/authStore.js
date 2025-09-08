import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  subscriptionTier: 'free',
  
  login: (userData) => set({
    isAuthenticated: true,
    user: userData,
    subscriptionTier: userData.subscriptionTier || 'free'
  }),
  
  logout: () => set({
    isAuthenticated: false,
    user: null,
    subscriptionTier: 'free'
  }),
  
  upgradeSubscription: (tier) => set((state) => ({
    subscriptionTier: tier,
    user: { ...state.user, subscriptionTier: tier }
  }))
}))