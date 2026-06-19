import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardList, Search, Banknote, GraduationCap, BookOpen, TrendingUp, Users } from 'lucide-react'
import { useSidebar } from '../components/Sidebar'
import Logo from '../components/Logo'
import AnimatedPage from '../components/AnimatedPage'
import StatCard from '../components/StatCard'

const dashboardCards = [
  {
    path: '/registration',
    icon: ClipboardList,
    label: 'Registration',
    description: 'Enroll new students',
    iconColor: 'text-avirat-blue',
    iconBg: 'bg-avirat-blue/10',
  },
  {
    path: '/search',
    icon: Search,
    label: 'Search',
    description: 'Find enrolled students',
    iconColor: 'text-avirat-purple',
    iconBg: 'bg-avirat-purple/10',
  },
  {
    path: '/catalog',
    icon: BookOpen,
    label: 'Catalog',
    description: 'Manage courses',
    iconColor: 'text-avirat-green',
    iconBg: 'bg-avirat-green/10',
  },
  {
    path: '/fees',
    icon: Banknote,
    label: 'Fees',
    description: 'Payment & installments',
    iconColor: 'text-avirat-orange',
    iconBg: 'bg-avirat-orange/10',
  },
]

const HomePage = () => {
  const navigate = useNavigate()
  const { isOpen } = useSidebar()

  return (
    <div className="min-h-screen bg-avirat-yellow flex">

      <AnimatedPage className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-[88px]' : 'ml-0'}
        flex flex-col items-center justify-center p-4 sm:p-8`}>
        {/* Logo */}
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Logo size="xxl" />
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="flex items-center gap-3 mb-6 sm:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-avirat-blue/10 flex items-center justify-center">
            <BookOpen size={20} className="text-avirat-blue sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-avirat-slate">
            bright way towards <span className="text-gradient">Learning!</span>
          </h2>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-10 w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <StatCard icon={Users} label="Students" value="128" gradient="blue" delay={0.6} />
          <StatCard icon={GraduationCap} label="Courses" value="11" gradient="orange" delay={0.7} />
          <StatCard icon={TrendingUp} label="Success Rate" value="94%" gradient="green" delay={0.8} />
        </motion.div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 w-full max-w-3xl">
          {dashboardCards.map((card, index) => (
            <motion.button
              key={card.path}
              onClick={() => navigate(card.path)}
              className="dashboard-card group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${card.iconBg} flex items-center justify-center
                dashboard-card-icon transition-transform duration-300`}>
                <card.icon size={24} className={card.iconColor} />
              </div>
              <span className="font-bold text-avirat-slate text-xs sm:text-sm">{card.label}</span>
              <span className="text-[10px] sm:text-xs text-avirat-muted hidden sm:block">{card.description}</span>
            </motion.button>
          ))}
        </div>
      </AnimatedPage>
    </div>
  )
}

export default HomePage
