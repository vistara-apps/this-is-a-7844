import { create } from 'zustand'

export const useStorefrontStore = create((set, get) => ({
  storefronts: [],
  currentStorefront: null,
  products: [],
  
  addStorefront: (storefront) => set((state) => ({
    storefronts: [...state.storefronts, {
      ...storefront,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }]
  })),
  
  setCurrentStorefront: (storefront) => set({ currentStorefront: storefront }),
  
  addProduct: (product) => set((state) => ({
    products: [...state.products, {
      ...product,
      id: Date.now().toString(),
      storefrontId: state.currentStorefront?.id,
      createdAt: new Date().toISOString()
    }]
  })),
  
  updateProduct: (productId, updates) => set((state) => ({
    products: state.products.map(product =>
      product.id === productId ? { ...product, ...updates } : product
    )
  })),
  
  getProductsByStorefront: (storefrontId) => {
    const state = get()
    return state.products.filter(product => product.storefrontId === storefrontId)
  }
}))