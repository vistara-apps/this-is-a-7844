import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Sparkles, 
  Copy, 
  RefreshCw, 
  ThumbsUp, 
  ThumbsDown,
  Wand2,
  MessageSquare,
  Bot
} from 'lucide-react'

const AgentChat = ({ 
  variant = 'withTools',
  onGenerate,
  isGenerating = false,
  className = ''
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm your AI assistant. I can help you create compelling product descriptions and sales prompts. What would you like to work on today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [selectedTool, setSelectedTool] = useState('description')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const tools = [
    {
      id: 'description',
      name: 'Product Description',
      icon: Wand2,
      description: 'Generate compelling product descriptions'
    },
    {
      id: 'instagram',
      name: 'Instagram Post',
      icon: MessageSquare,
      description: 'Create Instagram sales posts'
    },
    {
      id: 'story',
      name: 'Story Copy',
      icon: Sparkles,
      description: 'Generate story swipe-up copy'
    },
    {
      id: 'tiktok',
      name: 'TikTok Caption',
      icon: Bot,
      description: 'Create TikTok captions'
    }
  ]

  const handleSendMessage = async () => {
    if (!input.trim() || isGenerating) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Add loading message
    const loadingMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      content: 'Generating...',
      isLoading: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, loadingMessage])

    try {
      // Call the generation function
      const result = await onGenerate?.(input, selectedTool)
      
      // Replace loading message with result
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          ...msg,
          content: result || 'Generated content will appear here.',
          isLoading: false,
          canCopy: true,
          canRegenerate: true
        } : msg
      ))
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          ...msg,
          content: 'Sorry, I encountered an error. Please try again.',
          isLoading: false,
          isError: true
        } : msg
      ))
    }
  }

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content)
    // You could add a toast notification here
  }

  const handleRegenerateMessage = (messageId) => {
    // Find the user message that triggered this response
    const messageIndex = messages.findIndex(msg => msg.id === messageId)
    if (messageIndex > 0) {
      const userMessage = messages[messageIndex - 1]
      if (userMessage.type === 'user') {
        handleSendMessage()
      }
    }
  }

  const handleFeedback = (messageId, isPositive) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? {
        ...msg,
        feedback: isPositive ? 'positive' : 'negative'
      } : msg
    ))
  }

  // Compact variant for smaller spaces
  if (variant === 'compact') {
    return (
      <div className={`bg-surface rounded-lg border border-gray-700 ${className}`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Bot className="text-primary" size={20} />
            <span className="font-medium text-text-primary">AI Assistant</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me to generate content..."
              className="input flex-1"
              disabled={isGenerating}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isGenerating}
              className="btn-primary px-3"
            >
              {isGenerating ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Full variant with tools and chat history
  return (
    <div className={`bg-surface rounded-lg border border-gray-700 flex flex-col h-[600px] ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="text-primary" size={24} />
            <div>
              <h3 className="font-semibold text-text-primary">AI Assistant</h3>
              <p className="text-sm text-text-secondary">Powered by GPT-3.5</p>
            </div>
          </div>
          
          {variant === 'withTools' && (
            <div className="flex gap-1">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`
                    p-2 rounded-lg transition-colors text-xs
                    ${selectedTool === tool.id 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-700 text-text-secondary hover:bg-gray-600'
                    }
                  `}
                  title={tool.description}
                >
                  <tool.icon size={16} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              
              <div className={`
                max-w-[80%] rounded-lg p-3
                ${message.type === 'user' 
                  ? 'bg-primary text-white' 
                  : message.isError
                    ? 'bg-destructive/20 border border-destructive/50 text-destructive'
                    : 'bg-gray-700 text-text-primary'
                }
              `}>
                {message.isLoading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Message actions */}
                    {message.type === 'assistant' && !message.isError && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-600">
                        {message.canCopy && (
                          <button
                            onClick={() => handleCopyMessage(message.content)}
                            className="text-xs text-text-secondary hover:text-text-primary flex items-center gap-1"
                          >
                            <Copy size={12} />
                            Copy
                          </button>
                        )}
                        
                        {message.canRegenerate && (
                          <button
                            onClick={() => handleRegenerateMessage(message.id)}
                            className="text-xs text-text-secondary hover:text-text-primary flex items-center gap-1"
                          >
                            <RefreshCw size={12} />
                            Regenerate
                          </button>
                        )}
                        
                        <div className="flex items-center gap-1 ml-auto">
                          <button
                            onClick={() => handleFeedback(message.id, true)}
                            className={`
                              p-1 rounded transition-colors
                              ${message.feedback === 'positive' 
                                ? 'text-success bg-success/20' 
                                : 'text-text-secondary hover:text-success'
                              }
                            `}
                          >
                            <ThumbsUp size={12} />
                          </button>
                          <button
                            onClick={() => handleFeedback(message.id, false)}
                            className={`
                              p-1 rounded transition-colors
                              ${message.feedback === 'negative' 
                                ? 'text-destructive bg-destructive/20' 
                                : 'text-text-secondary hover:text-destructive'
                              }
                            `}
                          >
                            <ThumbsDown size={12} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-white">U</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        {variant === 'withTools' && (
          <div className="mb-3">
            <p className="text-sm text-text-secondary mb-2">
              Selected tool: <span className="text-primary font-medium">
                {tools.find(t => t.id === selectedTool)?.name}
              </span>
            </p>
          </div>
        )}
        
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Ask me to generate ${tools.find(t => t.id === selectedTool)?.name.toLowerCase() || 'content'}...`}
            className="input flex-1"
            disabled={isGenerating}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isGenerating}
            className="btn-primary px-4"
          >
            {isGenerating ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgentChat
