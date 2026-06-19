import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  GraduationCap, Star, Award, BookOpen, Code, Globe,
  Calculator, Users, Target, Sparkles, ArrowRight, Heart
} from 'lucide-react'
import AnimatedPage from '../components/AnimatedPage'
import { useSidebar } from '../components/Sidebar'
import { CloseButton } from '../components/Button'

// Faculty data
const leadership = [
  {
    name: 'Rahul Vitthal Gawade',
    role: 'Founder & Director',
    specialization: 'B.E Computer Engineering | Est. 2016',
    icon: Star,
    gradient: 'from-avirat-orange via-amber-400 to-yellow-300',
    ringColor: 'ring-avirat-orange',
    iconBg: 'bg-avirat-orange/10',
    iconColor: 'text-avirat-orange',
  },
  {
    name: 'Pooja Rahul Gawade',
    role: 'Co-Founder',
    specialization: 'M.Com | Administration & Student Development',
    icon: Heart,
    gradient: 'from-avirat-purple via-violet-400 to-fuchsia-300',
    ringColor: 'ring-avirat-purple',
    iconBg: 'bg-avirat-purple/10',
    iconColor: 'text-avirat-purple',
  },
]

const faculty = [
  {
    name: 'Naresh Devasi',
    role: 'Senior Professor',
    specialization: 'B.E Computer Science | Java, English & Mathematics',
    icon: Code,
    gradient: 'from-avirat-blue to-avirat-dark-blue',
    badge: 'Senior Faculty',
  },
  {
    name: 'Mayur Suresh Khomane',
    role: 'Professor',
    specialization: 'M.Com | Commerce & Business Studies',
    icon: Calculator,
    gradient: 'from-avirat-green to-emerald-500',
  },
  {
    name: 'Mahesh Pawale',
    role: 'Professor',
    specialization: 'B.E Computer Science | Core Subjects & Fundamentals',
    icon: BookOpen,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Johnathan Tagade',
    role: 'Professor',
    specialization: 'B.E AI & Data Science | Technical & Applied Sciences',
    icon: Globe,
    gradient: 'from-amber-500 to-orange-500',
  },
]

const courses = [
  { name: '8th - 12th Standard', desc: 'Complete school curriculum support', icon: GraduationCap },
  { name: 'Commerce', desc: 'Accounts, Economics & Business Studies', icon: Calculator },
  { name: 'Engineering', desc: 'Physics, Maths & Technical foundation', icon: Target },
  { name: 'Java', desc: 'Core Java, OOP & Advanced concepts', icon: Code },
  { name: 'Python', desc: 'Python programming from basics to advanced', icon: Code },
  { name: 'English', desc: 'Communication, Grammar & Literature', icon: BookOpen },
  { name: 'Frontend Dev', desc: 'HTML, CSS, JavaScript & React', icon: Globe },
]

const About = () => {
  const navigate = useNavigate()
  const { isOpen } = useSidebar()

  return (
    <div className="min-h-screen bg-avirat-yellow flex">
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-[88px]' : 'ml-0'} relative`}>
        <CloseButton onClick={() => navigate('/home')} />
        <AnimatedPage>
        {/* Hero Section */}
        <section className="relative pt-16 pb-16 px-6 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-20 -left-20 w-72 h-72 bg-avirat-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-20 w-80 h-80 bg-avirat-orange/5 rounded-full blur-3xl" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                bg-avirat-blue/10 text-avirat-blue text-sm font-medium mb-6"
            >
              <Sparkles size={14} />
              About Our Institute
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-avirat-slate mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Welcome to{' '}
              <span className="text-gradient-gold">AVIRAT</span>
            </motion.h1>

            <motion.p
              className="text-lg text-avirat-muted max-w-2xl mx-auto mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <em>Fly Towards Passion</em> — A premier coaching institute dedicated to empowering 
              students with knowledge, skills, and the confidence to excel in academics and beyond.
            </motion.p>

            <motion.p
              className="text-sm text-avirat-muted max-w-xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              From school-level foundations to advanced programming and professional courses, 
              we provide a bright way towards learning with a team of passionate educators.
            </motion.p>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-avirat-slate mb-2">Our Leadership</h2>
              <p className="text-sm text-avirat-muted">The visionaries behind AVIRAT</p>
            </motion.div>

            <div className="flex flex-col sm:flex-row justify-center gap-8">
              {leadership.map((person, index) => (
                <motion.div
                  key={person.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  className="card-glass p-8 flex flex-col items-center text-center max-w-xs mx-auto sm:mx-0 group"
                  whileHover={{ y: -6 }}
                >
                  {/* Avatar */}
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${person.gradient}
                    flex items-center justify-center shadow-lg mb-5 
                    ring-4 ${person.ringColor}/30 ring-offset-2 ring-offset-white
                    group-hover:ring-offset-4 transition-all duration-300`}>
                    <person.icon size={36} className="text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-avirat-slate mb-1">{person.name}</h3>
                  <span className="badge badge-orange mb-3">{person.role}</span>
                  <p className="text-sm text-avirat-muted">{person.specialization}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-avirat-slate mb-2 flex items-center justify-center gap-2">
                <Award size={24} className="text-avirat-blue" />
                Our Faculty
              </h2>
              <p className="text-sm text-avirat-muted">Expert educators committed to your success</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {faculty.map((person, index) => (
                <motion.div
                  key={person.name}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-glass p-5 flex items-start gap-4 group cursor-default"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${person.gradient}
                    flex items-center justify-center shadow-md flex-shrink-0
                    group-hover:scale-110 transition-transform duration-300`}>
                    <person.icon size={22} className="text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-avirat-slate text-sm">{person.name}</h3>
                      {person.badge && (
                        <span className="badge badge-blue text-[10px]">{person.badge}</span>
                      )}
                    </div>
                    <p className="text-xs text-avirat-blue font-medium mt-0.5">{person.role}</p>
                    <p className="text-xs text-avirat-muted mt-1">{person.specialization}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Offered */}
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-avirat-slate mb-2 flex items-center justify-center gap-2">
                <BookOpen size={24} className="text-avirat-green" />
                Courses We Offer
              </h2>
              <p className="text-sm text-avirat-muted">Comprehensive coaching across multiple disciplines</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {courses.map((course, index) => (
                <motion.div
                  key={course.name}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="bg-white rounded-xl p-4 border border-avirat-blue/10 
                    shadow-sm hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300 group cursor-default text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-avirat-blue/10 flex items-center justify-center
                    mx-auto mb-3 group-hover:bg-avirat-blue/20 group-hover:scale-110 transition-all duration-300">
                    <course.icon size={20} className="text-avirat-blue" />
                  </div>
                  <h4 className="font-bold text-avirat-slate text-sm mb-1">{course.name}</h4>
                  <p className="text-[11px] text-avirat-muted leading-relaxed">{course.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-avirat-blue to-avirat-dark-blue rounded-2xl p-8 text-center
                relative overflow-hidden shadow-xl"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Start Your Journey?</h3>
                <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
                  Join AVIRAT and let our expert faculty guide you towards academic excellence and career success.
                </p>
                <motion.button
                  onClick={() => navigate('/registration')}
                  className="bg-white text-avirat-blue font-bold px-8 py-3 rounded-xl shadow-lg
                    hover:shadow-xl inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enroll Now
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
        </AnimatedPage>
      </div>
    </div>
  )
}

export default About
