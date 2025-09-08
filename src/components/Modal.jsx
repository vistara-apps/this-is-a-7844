import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true 
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const sizeClasses = {
    small: 'max-w-md',
    default: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl'
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleOverlayClick}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ 
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={`
              relative w-full ${sizeClasses[size]} 
              bg-surface rounded-xl shadow-modal 
              border border-gray-700/50
              max-h-[90vh] overflow-hidden
              flex flex-col
            `}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                {title && (
                  <h2 className="text-xl font-semibold text-text-primary">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="
                      p-2 rounded-lg text-text-secondary 
                      hover:text-text-primary hover:bg-gray-700/50
                      transition-colors duration-150
                    "
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Modal variants for common use cases
export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="p-6">
        <p className="text-text-secondary mb-6">
          {message}
        </p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={isDestructive ? 'btn-destructive' : 'btn-primary'}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export const LoadingModal = ({ isOpen, message = "Loading..." }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => {}} 
      showCloseButton={false}
      closeOnOverlayClick={false}
      size="small"
    >
      <div className="p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-text-secondary">{message}</p>
      </div>
    </Modal>
  )
}

export default Modal
