import React, { useState } from 'react'
import { useStorefrontStore } from '../stores/storefrontStore'
import { useAIStore } from '../stores/aiStore'
import { 
  Plus, 
  Package, 
  Edit3, 
  Trash2, 
  Sparkles,
  DollarSign,
  Image as ImageIcon
} from 'lucide-react'

const ProductManager = () => {
  const { products, addProduct, updateProduct } = useStorefrontStore()
  const { generateProductDescription, isGenerating } = useAIStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    category: 'clothing',
    fulfillmentService: 'printful'
  })

  const categories = [
    { value: 'clothing', label: 'Clothing & Apparel' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'beauty', label: 'Beauty & Skincare' },
    { value: 'fitness', label: 'Fitness & Wellness' },
    { value: 'tech', label: 'Tech & Gadgets' },
    { value: 'home', label: 'Home & Lifestyle' },
    { value: 'other', label: 'Other' }
  ]

  const fulfillmentServices = [
    { value: 'printful', label: 'Printful' },
    { value: 'printify', label: 'Printify' },
    { value: 'gooten', label: 'Gooten' },
    { value: 'manual', label: 'Manual Fulfillment' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGenerateDescription = async () => {
    if (!formData.name) {
      alert('Please enter a product name first')
      return
    }

    try {
      const description = await generateProductDescription({
        name: formData.name,
        category: formData.category,
        price: formData.price
      })
      
      setFormData(prev => ({
        ...prev,
        description
      }))
    } catch (error) {
      alert('Failed to generate description. Please try again.')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingProduct) {
      updateProduct(editingProduct.id, formData)
      setEditingProduct(null)
    } else {
      addProduct(formData)
    }
    
    setFormData({
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      category: 'clothing',
      fulfillmentService: 'printful'
    })
    setShowAddForm(false)
  }

  const handleEdit = (product) => {
    setFormData(product)
    setEditingProduct(product)
    setShowAddForm(true)
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      category: 'clothing',
      fulfillmentService: 'printful'
    })
    setEditingProduct(null)
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Product Manager
          </h1>
          <p className="text-text-secondary">
            Add and manage products for your storefronts
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2 mt-4 md:mt-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={handleCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  className="input w-full"
                  placeholder="e.g., Vintage Denim Jacket"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Price
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="input w-full pl-10"
                    placeholder="29.99"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Category
                </label>
                <select
                  className="input w-full"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Fulfillment Service
                </label>
                <select
                  className="input w-full"
                  value={formData.fulfillmentService}
                  onChange={(e) => handleInputChange('fulfillmentService', e.target.value)}
                >
                  {fulfillmentServices.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Image URL
              </label>
              <input
                type="url"
                className="input w-full"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-text-primary">
                  Product Description
                </label>
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isGenerating || !formData.name}
                  className="btn-outline px-3 py-1 text-sm flex items-center space-x-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3" />
                      <span>Generate with AI</span>
                    </>
                  )}
                </button>
              </div>
              <textarea
                required
                className="textarea w-full h-32"
                placeholder="Describe your product. Use the AI generator to create compelling descriptions automatically!"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="btn-primary"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card hover:shadow-modal transition-shadow duration-200">
              <div className="aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-text-secondary" />
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary">{product.name}</h3>
                    <p className="text-sm text-text-secondary">{categories.find(c => c.value === product.category)?.label}</p>
                  </div>
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                </div>
                
                <p className="text-sm text-text-secondary line-clamp-3">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <span className="text-xs text-text-secondary">
                    {fulfillmentServices.find(s => s.value === product.fulfillmentService)?.label}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 hover:bg-gray-700 rounded transition-colors duration-150"
                    >
                      <Edit3 className="w-4 h-4 text-text-secondary" />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded transition-colors duration-150">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !showAddForm && (
        <div className="card text-center py-12">
          <Package className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No products yet
          </h3>
          <p className="text-text-secondary mb-6">
            Start building your product catalog with AI-powered descriptions
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Product</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductManager