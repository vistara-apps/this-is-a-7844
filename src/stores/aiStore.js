import { create } from 'zustand'

export const useAIStore = create((set) => ({
  isGenerating: false,
  usageCount: 0,
  monthlyLimit: 50, // Free tier limit
  
  generateProductDescription: async (productInfo) => {
    set({ isGenerating: true })
    
    try {
      // Simulate AI generation for demo
      const descriptions = [
        `Transform your style with this must-have ${productInfo.name}! 🌟 Crafted for the modern influencer who demands both comfort and sophistication. This piece isn't just clothing - it's a statement of confidence and authenticity that your followers will absolutely love.`,
        
        `Elevate your wardrobe game with this stunning ${productInfo.name}! ✨ Perfect for creating those scroll-stopping content moments while keeping you comfortable all day long. Your audience has been asking where to get pieces like this - now you can show them!`,
        
        `Meet your new favorite ${productInfo.name} - the perfect blend of style and substance! 💫 Whether you're creating content or living your best life, this piece moves with you and photographs beautifully. Your followers are going to be obsessed!`
      ]
      
      const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      set((state) => ({ 
        isGenerating: false,
        usageCount: state.usageCount + 1
      }))
      
      return randomDescription
      
    } catch (error) {
      set({ isGenerating: false })
      throw new Error('Failed to generate description')
    }
  },
  
  generateSalesPrompt: async (productInfo, promptType) => {
    set({ isGenerating: true })
    
    try {
      const prompts = {
        instagram: [
          `🔥 SWIPE UP for the ${productInfo.name} everyone's been asking about! This is the piece that's been selling out everywhere... but I got you covered! Link in bio 👆 #InfluencerFinds #StyleInspo`,
          
          `You guys LOVED my ${productInfo.name} in yesterday's post! 😍 So many DMs asking where it's from... it's finally available in my shop! Grab yours before they're gone 🏃‍♀️💨 Link in bio!`,
          
          `POV: You find the perfect ${productInfo.name} that looks expensive but won't break the bank 💸✨ Your closet will thank me later! Shop the link in my bio 🛍️ #AffordableLuxury`
        ],
        
        story: [
          `Swipe up to shop this ${productInfo.name}! You've been asking about it non-stop 🔥`,
          
          `This ${productInfo.name} is selling fast! Don't sleep on it 😴 Swipe up!`,
          
          `Last chance to grab this ${productInfo.name} before it sells out! ⏰ Swipe up now!`
        ],
        
        tiktok: [
          `That girl who found the perfect ${productInfo.name} that actually looks good AND feels good 💅 #MainCharacterEnergy #OOTD #InfluencerFinds`,
          
          `POV: You're about to save your followers from another fashion emergency with this ${productInfo.name} 🦸‍♀️ Link in bio! #StyleHero #FashionTok`,
          
          `When the ${productInfo.name} hits different and you know your followers need it too 😮‍💨 Link in bio bestie! #MustHave #GRWM`
        ]
      }
      
      const typePrompts = prompts[promptType] || prompts.instagram
      const randomPrompt = typePrompts[Math.floor(Math.random() * typePrompts.length)]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      set((state) => ({ 
        isGenerating: false,
        usageCount: state.usageCount + 1
      }))
      
      return randomPrompt
      
    } catch (error) {
      set({ isGenerating: false })
      throw new Error('Failed to generate sales prompt')
    }
  }
}))