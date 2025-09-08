import React, { useState } from 'react'
import { useStorefrontStore } from '../stores/storefrontStore'
import { 
  Store, 
  Globe, 
  Palette, 
  Check,
  ExternalLink
} from 'lucide-react'

const StorefrontSetup = () => {
  const { storefronts, addStorefront, setCurrentStorefront } = useStorefrontStore()
  const [isCreating, setIsCreating] = useState(false)
  const [step, setStep] = useState(1)
  
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    theme: 'modern',
    primaryColor: '#3B82F6',
    socialLinks: {
      instagram: '',
      tiktok: '',
      youtube: ''
    }
  })

  const themes = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and minimal design',
      preview: 'bg-gradient-to-br from-blue-500 to-purple-600'
    },
    {
      id: 'vibrant',
      name: 'Vibrant',
      description: 'Bold colors and dynamic layouts',
      preview: 'bg-gradient-to-br from-pink-500 to-orange-500'
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Sophisticated and luxurious',
      preview: 'bg-gradient-to-br from-gray-800 to-gray-900'
    },
    {
      id: 'playful',
      name: 'Playful',
      description: 'Fun and energetic design',
      preview: 'bg-gradient-to-br from-green-400 to-blue-500'
    }
  ]

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const generateUrl = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  }

  React.useEffect(() => {
    if (formData.name) {
      setFormData(prev => ({
        ...prev,
        url: generateUrl(prev.name)
      }))
    }
  }, [formData.name])

  const handleCreateStorefront = async () => {
    setIsCreating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newStorefront = {
      ...formData,
      url: `${formData.url}.influencerflow.store`
    }
    
    addStorefront(newStorefront)
    setCurrentStorefront(newStorefront)
    setIsCreating(false)
    setStep(4) // Success step
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Basic Information
              </h2>
              <p className="text-text-secondary">
                Let's start with the basics for your storefront
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Storefront Name
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="e.g., Sarah's Style Collection"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Storefront URL
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="input flex-1"
                    value={formData.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                  />
                  <span className="ml-2 text-text-secondary">.influencerflow.store</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description
                </label>
                <textarea
                  className="textarea w-full h-24"
                  placeholder="Tell your audience what your storefront is about..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.url}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Design
            </button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Choose Your Theme
              </h2>
              <p className="text-text-secondary">
                Select a design theme that matches your brand
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => handleInputChange('theme', theme.id)}
                  className={`
                    relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-150
                    ${formData.theme === theme.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-600 hover:border-gray-500'
                    }
                  `}
                >
                  <div className={`w-full h-24 rounded-lg mb-3 ${theme.preview}`} />
                  <h3 className="font-semibold text-text-primary mb-1">{theme.name}</h3>
                  <p className="text-sm text-text-secondary">{theme.description}</p>
                  {formData.theme === theme.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary"
              >
                Continue to Social Links
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Social Media Links
              </h2>
              <p className="text-text-secondary">
                Connect your social media profiles (optional)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Instagram
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="@yourusername"
                  value={formData.socialLinks.instagram}
                  onChange={(e) => handleInputChange('socialLinks.instagram', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  TikTok
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="@yourusername"
                  value={formData.socialLinks.tiktok}
                  onChange={(e) => handleInputChange('socialLinks.tiktok', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  YouTube
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Channel URL or @handle"
                  value={formData.socialLinks.youtube}
                  onChange={(e) => handleInputChange('socialLinks.youtube', e.target.value)}
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(2)}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={handleCreateStorefront}
                disabled={isCreating}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Storefront...</span>
                  </>
                ) : (
                  <span>Create Storefront</span>
                )}
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Storefront Created Successfully! 🎉
              </h2>
              <p className="text-text-secondary">
                Your storefront is now live and ready for products
              </p>
            </div>

            <div className="bg-bg rounded-lg p-4">
              <p className="text-sm text-text-secondary mb-2">Your storefront URL:</p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-primary font-medium">{formData.url}.influencerflow.store</span>
                <button className="p-1 hover:bg-gray-700 rounded">
                  <ExternalLink className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setStep(1)
                  setFormData({
                    name: '',
                    url: '',
                    description: '',
                    theme: 'modern',
                    primaryColor: '#3B82F6',
                    socialLinks: { instagram: '', tiktok: '', youtube: '' }
                  })
                }}
                className="btn-outline"
              >
                Create Another
              </button>
              <button
                onClick={() => window.location.href = '/products'}
                className="btn-primary"
              >
                Add Products
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (storefronts.length > 0 && step === 1) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Your Storefronts
            </h1>
            <p className="text-text-secondary">
              Manage your existing storefronts or create a new one
            </p>
          </div>
          <button
            onClick={() => setStep(1)}
            className="btn-primary flex items-center space-x-2"
          >
            <Store className="w-4 h-4" />
            <span>New Storefront</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storefronts.map((storefront) => (
            <div key={storefront.id} className="card hover:shadow-modal transition-shadow duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{storefront.name}</h3>
                  <p className="text-sm text-text-secondary">{storefront.theme}</p>
                </div>
              </div>
              
              <p className="text-text-secondary text-sm mb-4">
                {storefront.description || 'No description provided'}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">{storefront.url}</span>
                <button className="text-primary hover:opacity-80">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Step {step} of 3</span>
            <span className="text-sm text-text-secondary">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  )
}

export default StorefrontSetup