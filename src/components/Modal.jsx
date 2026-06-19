import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15 },
  },
}

const Modal = ({ isOpen, onClose, title, children, size = 'md', variant = 'primary' }) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  // lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="modal-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="modal-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {variant === 'primary' ? (
              <div className={`modal-primary rounded-2xl ${sizeClasses[size]}`}>
                <div className="modal-inner">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-avirat-slate">{title}</h2>
                    <button
                      onClick={onClose}
                      className="w-8 h-8 rounded-full flex items-center justify-center
                        text-avirat-muted hover:text-avirat-red hover:bg-red-50
                        transition-all duration-200"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  {children}
                </div>
              </div>
            ) : (
              <div className={`bg-white rounded-2xl p-6 shadow-2xl ${sizeClasses[size]}`}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-avirat-slate">{title}</h2>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center
                      text-avirat-muted hover:text-avirat-red hover:bg-red-50
                      transition-all duration-200"
                  >
                    <X size={18} />
                  </button>
                </div>
                {children}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal
