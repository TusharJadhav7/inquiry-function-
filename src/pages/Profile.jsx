import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Home, User, Mail, BookOpen, Shield, ChevronDown } from 'lucide-react'
import Logo from '../components/Logo'
import { CloseButton } from '../components/Button'
import AnimatedPage from '../components/AnimatedPage'

const Profile = () => {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState('')

  const courses = [
    '8th Standard',
    '9th Standard',
    '10th Standard',
    '11th Standard',
    '12th Standard',
    'Commerce',
    'Engineering',
    'Java',
    'Python',
    'English',
    'Frontend Development'
  ]

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-avirat-yellow p-6 relative">
      <CloseButton onClick={() => navigate('/home')} />

      <AnimatedPage>
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={() => navigate('/home')} className="cursor-pointer hover:opacity-80 transition-opacity">
            <Logo size="small" showText={false} animate={false} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-avirat-slate">
              Welcome To <span className="text-gradient-gold">AVIRAT</span> Academy!
            </h1>
            <p className="text-sm text-avirat-muted mt-1">Manage your admin profile & settings</p>
          </div>
        </motion.div>

        {/* Profile Content */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 max-w-4xl mx-auto">
          {/* Left: Avatar & Quick Info */}
          <motion.div
            className="card-glass p-6 flex flex-col items-center gap-4 w-full lg:w-72"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Avatar */}
            <div className="avatar-ring">
              <div className="avatar-ring-inner">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-avirat-blue to-avirat-dark-blue
                  flex items-center justify-center">
                  <Shield size={40} className="text-white" />
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-avirat-slate text-lg">Rahul Gawade</h3>
              <span className="badge badge-blue mt-1">Administrator</span>
            </div>
            <div className="w-full h-px bg-avirat-gold/20 my-2" />
            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User size={16} className="text-avirat-blue" />
                <span className="text-avirat-muted">Role:</span>
                <span className="font-medium text-avirat-slate">Super Admin</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-avirat-blue" />
                <span className="text-avirat-muted">Email:</span>
                <span className="font-medium text-avirat-slate text-xs">rahulgawade87@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            className="flex-1 space-y-5 w-full"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Info Card */}
            <div className="card-glass p-6">
              <h3 className="font-bold text-avirat-slate mb-4 flex items-center gap-2">
                <User size={18} className="text-avirat-blue" />
                Profile Information
              </h3>
              <div className="space-y-4">
                <div className="info-row">
                  <label className="info-label w-28">UserName:</label>
                  <div className="info-value">Rahul Gawade</div>
                </div>
                <div className="info-row">
                  <label className="info-label w-28">Email:</label>
                  <div className="info-value">rahulgawade87@gmail.com</div>
                </div>
              </div>
            </div>

            {/* Courses Card */}
            <div className="card-glass p-6">
              <h3 className="font-bold text-avirat-slate mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-avirat-green" />
                Courses Available in AVIRAT
              </h3>
              <div>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="form-select"
                  id="profile-course-select"
                >
                  <option value="">Select a Course to view details</option>
                  {courses.map((course, idx) => (
                    <option key={idx} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              {selectedCourse && (
                <motion.div
                  className="mt-4 p-4 rounded-xl bg-avirat-blue/5 border border-avirat-blue/10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-avirat-slate">
                    <span className="font-semibold">{selectedCourse}</span> — Comprehensive coaching with regular tests, mock exams, and personalized guidance.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex justify-center gap-4 mt-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => navigate('/home')}
            className="btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Home size={18} />
            Back to Home
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="btn-red flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <LogOut size={18} />
            LogOut
          </motion.button>
        </motion.div>
      </AnimatedPage>
    </div>
  )
}

export default Profile
