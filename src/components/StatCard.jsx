import React from 'react'
import { motion } from 'framer-motion'

const gradients = {
  blue: 'from-avirat-blue to-avirat-deep-blue',
  orange: 'from-avirat-orange to-amber-500',
  green: 'from-avirat-green to-emerald-500',
  purple: 'from-avirat-purple to-violet-500',
  red: 'from-avirat-red to-rose-500',
}

const StatCard = ({ icon: Icon, label, value, gradient = 'blue', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`stat-card bg-gradient-to-br ${gradients[gradient]} shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
            <Icon size={24} className="text-white/90" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default StatCard
