import React from 'react'
import { motion } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', loading = false, icon: Icon, disabled = false }) => {
  const variantClasses = {
    primary: 'btn-primary',
    orange: 'btn-orange',
    green: 'btn-green',
    red: 'btn-red',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${variantClasses[variant]} btn-ripple ${className} 
        ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''} 
        inline-flex items-center justify-center gap-2`}
      whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : Icon ? (
        <Icon size={18} />
      ) : null}
      {children}
    </motion.button>
  )
}

export const CloseButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="absolute top-3 right-4 w-8 h-8 rounded-full
      bg-red-50 text-avirat-red
      flex items-center justify-center
      hover:bg-red-100 hover:scale-110
      transition-all duration-200 z-10"
    whileHover={{ rotate: 90 }}
    whileTap={{ scale: 0.8 }}
  >
    <X size={18} />
  </motion.button>
)

export default Button
