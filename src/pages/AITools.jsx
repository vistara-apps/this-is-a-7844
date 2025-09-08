import React, { useState } from 'react'
import { useStorefrontStore } from '../stores/storefrontStore'
import { useAIStore } from '../stores/aiStore'
import { 
  Sparkles, 
  Copy, 
  Check, 
  Instagram, 
  MessageCircle,
  Youtube,
  ArrowRight
} from 'lucide-react'

const AITools = () => {
  const { products } = useStorefrontStore()
  const { generateSalesPrompt, isGenerating } = useAIStore()
  const [selectedProduct, setSelectedProduct] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [copied, setCopied] = useState(false)

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram Post',
      icon: Instagram,
      description: 'Perfect for feed posts with engaging captions'
    },
    {
      id: 'story',
      name: 'Instagram Story',
      icon: MessageCircle,
      description: 'Short and punchy for story CTAs'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Youtube,
      description: 'Trendy and engaging for TikTok content'
    }
  ]

  const handleGeneratePrompt = async () => {
    if (!selectedProduct) {
      alert('Please select a product first')
      return
    }

    const product = products.find(p => p.id === selectedProduct)
    
    try {
      const prompt = await generateSalesPrompt(product, selectedPlatform)
      setGeneratedPrompt(prompt)
    } catch (error) {
      alert('Failed to generate sales prompt. Please try again.')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          AI Tools
        </h1>
        <p className="text-text-secondary">
          Generate compelling sales prompts and content for your social media
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generator Form */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Sales Prompt Generator
              </h2>
              <p className="text-sm text-text-secondary">
                Create engaging social media content
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Select Product
              </label>
              {products.length > 0 ? (
                <select
                  className="input w-full"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Choose a product...</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-center py-8 bg-bg rounded-lg">
                  <p className="text-text-secondary mb-3">No products found</p>
                  <a href="/products" className="btn-primary inline-flex items-center space-x-2">
                    <span>Add Products First</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Choose Platform
              </label>
              <div className="grid grid-cols-1 gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`
                      flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-150
                      ${selectedPlatform === platform.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-600 hover:border-gray-500'
                      }
                    `}
                  >
                    <platform.icon className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium text-text-primary">{platform.name}</p>
                      <p className="text-sm text-text-secondary">{platform.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGeneratePrompt}
              disabled={isGenerating || !selectedProduct}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Sales Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Content */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">
              Generated Content
            </h2>
            {generatedPrompt && (
              <button
                onClick={handleCopy}
                className="btn-outline px-3 py-2 flex items-center space-x-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>

          {generatedPrompt ? (
            <div className="space-y-4">
              <div className="bg-bg rounded-lg p-4">
                <p className="text-text-primary whitespace-pre-wrap">
                  {generatedPrompt}
                </p>
              </div>
              
              <div className="text-xs text-text-secondary">
                <p>💡 <strong>Pro tip:</strong> Customize this content to match your unique voice and brand!</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-text-secondary" />
              </div>
              <p className="text-text-secondary mb-2">No content generated yet</p>
              <p className="text-sm text-text-secondary">
                Select a product and platform to generate AI-powered sales content
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="card bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <h3 className="text-lg font-semibold text-text-primary mb-3">
          💡 Content Creation Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-secondary">
          <ul className="space-y-2">
            <li>• Personalize AI-generated content with your unique voice</li>
            <li>• Add relevant emojis and hashtags for better engagement</li>
            <li>• Test different prompt styles to see what resonates</li>
          </ul>
          <ul className="space-y-2">
            <li>• Include clear calls-to-action in your posts</li>
            <li>• Use urgency and scarcity to drive conversions</li>
            <li>• Always disclose affiliate/sponsored relationships</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AITools