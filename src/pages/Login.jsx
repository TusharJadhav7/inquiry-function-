import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import Logo from '../components/Logo'

// Generate floating particles
const generateParticles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.15 + 0.05,
    color: ['#FDB846', '#7B9EFF', '#22C55E', '#9B72CF'][Math.floor(Math.random() * 4)],
  }))
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const particles = useMemo(() => generateParticles(12), [])

  // Frontend-only authentication
  const VALID_EMAIL = 'rahulgawade87@gmail.com'
  const VALID_PASS = 'R@hul#2016'

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!username || !password) {
      setError('Please enter email and password')
      return
    }
    if (username !== VALID_EMAIL || password !== VALID_PASS) {
      setError('Invalid email or password')
      return
    }
    setIsLoading(true)
    // Store auth state in sessionStorage (clears on tab close)
    sessionStorage.setItem('avirat_auth', 'true')
    sessionStorage.setItem('avirat_user', VALID_EMAIL)
    setTimeout(() => {
      navigate('/home')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-avirat-yellow flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Particles Background */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, ${p.color}40, ${p.color}10)`,
            opacity: p.opacity,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-10 -left-20 w-72 h-72 bg-avirat-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-avirat-orange/10 rounded-full blur-3xl" />

      {/* Logo */}
      <motion.div
        className="mb-8 relative z-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Logo size="xl" />
      </motion.div>

      {/* Login Card */}
      <motion.div
        className="card-glass w-full max-w-sm overflow-hidden relative z-10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-avirat-orange to-yellow-300 py-4 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <h2 className="text-2xl font-bold text-center relative z-10">
            <span className="text-avirat-blue">ADMIN</span>{' '}
            <span className="text-avirat-slate">Login!</span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-6 flex flex-col gap-4">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5 text-center font-medium"
            >
              {error}
            </motion.div>
          )}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="form-label">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
              id="login-username"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-12"
                required
                id="login-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-avirat-muted 
                  hover:text-avirat-blue transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full mt-2 flex items-center justify-center gap-2 py-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="login-submit"
          >
            {isLoading ? (
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
            ) : (
              <>
                <LogIn size={18} />
                Sign in
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Footer text */}
      <motion.p
        className="text-xs text-avirat-muted mt-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © 2026 Avirat Coaching Institute
      </motion.p>
    </div>
  )
}

export default Login