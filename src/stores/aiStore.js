import { create } from 'zustand'
import { generateProductDescription, generateSalesPrompt } from '../services/openai'
import toast from 'react-hot-toast'

export const useAIStore = create((set, get) => ({
  isGenerating: false,
  usageCount: 0,
  monthlyLimit: 50, // Free tier limit
  
  generateProductDescription: async (productInfo) => {
    const state = get()
    
    // Check usage limits
    if (state.usageCount >= state.monthlyLimit) {
      toast.error('Monthly AI generation limit reached. Please upgrade your plan.')
      throw new Error('Usage limit exceeded')
    }
    
    set({ isGenerating: true })
    
    try {
      const description = await generateProductDescription(productInfo)
      
      set((state) => ({ 
        isGenerating: false,
        usageCount: state.usageCount + 1
      }))
      
      toast.success('Product description generated successfully!')
      return description
      
    } catch (error) {
      set({ isGenerating: false })
      toast.error(error.message || 'Failed to generate description')
      throw error
    }
  },
  
  generateSalesPrompt: async (productInfo, promptType) => {
    const state = get()
    
    // Check usage limits
    if (state.usageCount >= state.monthlyLimit) {
      toast.error('Monthly AI generation limit reached. Please upgrade your plan.')
      throw new Error('Usage limit exceeded')
    }
    
    set({ isGenerating: true })
    
    try {
      const prompt = await generateSalesPrompt(productInfo, promptType)
      
      set((state) => ({ 
        isGenerating: false,
        usageCount: state.usageCount + 1
      }))
      
      toast.success('Sales prompt generated successfully!')
      return prompt
      
    } catch (error) {
      set({ isGenerating: false })
      toast.error(error.message || 'Failed to generate sales prompt')
      throw error
    }
  },
  
  // Update usage limits based on subscription tier
  updateLimits: (subscriptionTier) => {
    const limits = {
      free: 50,
      pro: 500,
      business: 2000
    }
    
    set({ monthlyLimit: limits[subscriptionTier] || 50 })
  },
  
  // Reset monthly usage (called on subscription renewal)
  resetUsage: () => {
    set({ usageCount: 0 })
  }
}))
