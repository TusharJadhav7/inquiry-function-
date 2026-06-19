import React from 'react'
import { motion } from 'framer-motion'
import logoImg from '../assets/logoAvirat.png'

const Logo = ({ size = 'large', showText = false, animate = true }) => {
  const sizeClasses = {
    small: 'w-[70px] h-[70px]',
    medium: 'w-[110px] h-[110px]',
    large: 'w-[220px] h-[220px]',
    xl: 'w-[300px] h-[300px]',
    xxl: 'w-[400px] h-[400px]'
  }

  const Wrapper = animate ? motion.div : 'div'
  const imgProps = animate ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
  } : {}

  return (
    <div className="flex flex-col items-center">
      <Wrapper {...imgProps}>
        <motion.img
          src={logoImg}
          alt="AVIRAT Logo"
          className={`${sizeClasses[size]} object-contain drop-shadow-lg
            cursor-pointer`}
          style={{ imageRendering: 'crisp-edges' }}
          whileHover={{ scale: 1.05, filter: 'drop-shadow(0 0 12px rgba(253,184,70,0.4))' }}
          transition={{ duration: 0.3 }}
        />
      </Wrapper>
    </div>
  )
}

export default Logo
