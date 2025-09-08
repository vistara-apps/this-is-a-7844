import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Eye, 
  ShoppingCart,
  Heart,
  Share2,
  MoreVertical,
  Copy,
  Sparkles
} from 'lucide-react'

const ProductCard = ({ 
  product, 
  variant = 'admin',
  onEdit,
  onDelete,
  onView,
  onGenerateDescription,
  className = ''
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: product.url || window.location.href
        })
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(product.url || window.location.href)
    // You could add a toast notification here
  }

  // Admin variant - for product management
  if (variant === 'admin') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`card hover:shadow-lg transition-all duration-200 ${className}`}
      >
        {/* Product Image */}
        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gray-800">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-secondary">
              <ShoppingCart size={48} />
            </div>
          )}
          
          {/* Actions overlay */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors"
              >
                <MoreVertical size={16} />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-1 bg-surface border border-gray-700 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                  <button
                    onClick={() => {
                      onEdit?.(product)
                      setIsMenuOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onView?.(product)
                      setIsMenuOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Eye size={14} />
                    Preview
                  </button>
                  <button
                    onClick={() => {
                      onGenerateDescription?.(product)
                      setIsMenuOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-text-primary hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Sparkles size={14} />
                    AI Enhance
                  </button>
                  <hr className="my-1 border-gray-700" />
                  <button
                    onClick={() => {
                      onDelete?.(product)
                      setIsMenuOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-destructive hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-text-primary truncate">
            {product.name}
          </h3>
          
          <p className="text-text-secondary text-sm line-clamp-2">
            {product.description || 'No description available'}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ${product.price}
            </span>
            
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <Eye size={12} />
              {product.views || 0}
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center justify-between">
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${product.status === 'active' 
                ? 'bg-success/20 text-success' 
                : 'bg-gray-700 text-text-secondary'
              }
            `}>
              {product.status || 'draft'}
            </span>
            
            {product.fulfillmentService && (
              <span className="text-xs text-text-secondary">
                via {product.fulfillmentService}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // Storefront variant - for customer-facing display
  if (variant === 'storefront') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        whileHover={{ y: -4 }}
        className={`
          group bg-surface rounded-xl overflow-hidden shadow-card 
          hover:shadow-lg transition-all duration-300 cursor-pointer
          ${className}
        `}
        onClick={() => onView?.(product)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <ShoppingCart size={48} className="text-text-secondary" />
            </div>
          )}
          
          {/* Action buttons overlay */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsLiked(!isLiked)
              }}
              className={`
                p-2 rounded-full backdrop-blur-sm transition-colors
                ${isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-black/30 text-white hover:bg-black/50'
                }
              `}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleShare()
              }}
              className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors"
            >
              <Share2 size={16} />
            </button>
          </div>
          
          {/* Price badge */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-primary text-white px-3 py-1 rounded-full font-semibold">
              ${product.price}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <p className="text-text-secondary text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              // Handle add to cart or purchase
            }}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </motion.div>
    )
  }

  // Compact variant - for lists or smaller spaces
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className={`
          flex items-center gap-4 p-4 bg-surface rounded-lg 
          hover:bg-gray-700/30 transition-colors cursor-pointer
          ${className}
        `}
        onClick={() => onView?.(product)}
      >
        {/* Product Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart size={20} className="text-text-secondary" />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-text-primary truncate">
            {product.name}
          </h4>
          <p className="text-sm text-text-secondary truncate">
            {product.description}
          </p>
          <div className="flex items-center gap-4 mt-1">
            <span className="font-semibold text-primary">
              ${product.price}
            </span>
            <span className="text-xs text-text-secondary">
              {product.views || 0} views
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit?.(product)
            }}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onView?.(product)
            }}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </motion.div>
    )
  }

  return null
}

export default ProductCard
