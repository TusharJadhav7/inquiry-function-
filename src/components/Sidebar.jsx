import React, { useState, createContext, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserCircle, ClipboardList, Search, BookOpen, Banknote, Home, Info, Menu, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Context for sidebar state — shared across pages
const SidebarContext = createContext()
export const useSidebar = () => useContext(SidebarContext)

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle: () => setIsOpen(p => !p) }}>
      {children}
    </SidebarContext.Provider>
  )
}

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
    { path: '/inquiry', icon: ClipboardList, label: 'Inquiry' },
  { path: '/registration', icon: ClipboardList, label: 'Register' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/inquiry-search', icon: Search , label:'InquirySearch'},
  { path: '/catalog', icon: BookOpen, label: 'Catalog' },
  { path: '/fees', icon: Banknote, label: 'Fees' },
  { path: '/about', icon: Info, label: 'About' },
]

const SIDEBAR_WIDTH = 88 // px — wider sidebar

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isOpen, toggle } = useSidebar()

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -SIDEBAR_WIDTH }}
        animate={{ x: isOpen ? 0 : -SIDEBAR_WIDTH }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ width: SIDEBAR_WIDTH }}
        className="glass-sidebar flex flex-col items-center py-5
          fixed left-0 top-0 bottom-0 z-40 shadow-xl"
      >
        {/* Toggle button */}
        <motion.button
          onClick={toggle}
          className="w-10 h-10 rounded-xl flex items-center justify-center
            bg-white/10 text-white hover:bg-white/20 transition-colors mb-3"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={20} />
        </motion.button>

        {/* Profile Avatar */}
        <div className="tooltip-wrapper mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/profile')}
            className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg
              transition-all duration-300
              ${isActive('/profile')
                ? 'bg-avirat-orange ring-2 ring-white ring-offset-2 ring-offset-avirat-blue'
                : 'bg-white/20 hover:bg-white/30'}`}
            style={{ width: 52, height: 52 }}
          >
            <UserCircle size={28} className={isActive('/profile') ? 'text-avirat-slate' : 'text-white'} />
          </motion.button>
          <span className="tooltip-content">Profile</span>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-white/20 mb-3" />

        {/* Navigation — NO overflow scroll */}
        <div className="flex flex-col gap-3 w-full px-3 flex-1">
          {navItems.map((item) => {
            const active = isActive(item.path)
            return (
              <div key={item.path} className="tooltip-wrapper relative">
                <motion.button
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { navigate(item.path); if (window.innerWidth < 1024) toggle() }}
                  className={`w-full py-3 rounded-xl flex flex-col items-center gap-1
                    transition-all duration-300 relative
                    ${active
                      ? 'bg-gradient-to-r from-avirat-orange to-yellow-300 text-avirat-slate shadow-glow-orange'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                    }`}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-white rounded-r-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon size={20} />
                  <span className="text-[10px] font-semibold leading-none">{item.label}</span>
                </motion.button>
                <span className="tooltip-content">{item.label}</span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Floating hamburger when sidebar is hidden */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggle}
            className="fixed top-3 left-3 z-50 w-10 h-10 rounded-xl
              bg-avirat-blue text-white shadow-lg flex items-center justify-center
              hover:bg-avirat-dark-blue transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
