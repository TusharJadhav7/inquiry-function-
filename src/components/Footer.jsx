import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, Mail, Phone, MapPin, ExternalLink, GraduationCap,
  MessageSquare, Send, ChevronDown, HelpCircle
} from 'lucide-react'
import logoImg from '../assets/logoAvirat.png'

const footerLinks = [
  { label: 'Home', path: '/home' },
  { label: 'Registration', path: '/registration' },
  { label: 'Search', path: '/search' },
  { label: 'Catalog', path: '/catalog' },
  { label: 'Fees', path: '/fees' },
  { label: 'About Us', path: '/about' },
]

const faqs = [
  { q: 'What courses does Avirat Academy offer?', a: 'We offer coaching for 8th to 12th standard, Commerce, Engineering, Java, Python, English, and Frontend Development.' },
  { q: 'What are the payment options?', a: 'Fees can be paid in installments. The number of installments depends on the course — typically 2 to 4 payments.' },
  { q: 'How do I enroll my child?', a: 'Visit Avirat Academy near Balewadi Bus Stop or use the Registration page in the admin panel. You will need the student\'s personal, academic, and Aadhaar details.' },
  { q: 'What is the batch timing?', a: 'Batches run in morning (8AM-12PM) and evening (4PM-8PM) slots. Contact us for your preferred timing.' },
  { q: 'Can I get a fee receipt or invoice?', a: 'Yes! You can download, print, or receive invoices via email/SMS from the Fees section.' },
]

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [openFaq, setOpenFaq] = useState(null)
  const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [showInquiry, setShowInquiry] = useState(false)
  const [showFaq, setShowFaq] = useState(false)

  if (location.pathname === '/') return null

  const handleInquirySubmit = (e) => {
    e.preventDefault()
    if (inquiry.name && inquiry.email && inquiry.message) {
      setSubmitted(true)
      setInquiry({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-b from-avirat-yellow to-avirat-warm border-t border-avirat-gold/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Toggle Buttons for Inquiry + FAQ */}
        <div className="flex flex-wrap gap-3 mb-6">
          <motion.button
            onClick={() => setShowInquiry(p => !p)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              showInquiry
                ? 'bg-gradient-to-r from-avirat-blue to-avirat-dark-blue text-white shadow-glow-blue'
                : 'bg-white/70 text-avirat-slate border border-avirat-gold/20 hover:border-avirat-blue/30 hover:shadow-md'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageSquare size={16} /> Inquiry / Feedback
          </motion.button>
          <motion.button
            onClick={() => setShowFaq(p => !p)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              showFaq
                ? 'bg-gradient-to-r from-avirat-orange to-yellow-300 text-avirat-slate shadow-glow-orange'
                : 'bg-white/70 text-avirat-slate border border-avirat-gold/20 hover:border-avirat-orange/30 hover:shadow-md'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <HelpCircle size={16} /> FAQ
          </motion.button>
        </div>

        {/* Collapsible Sections */}
        <AnimatePresence>
          {(showInquiry || showFaq) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8 pb-8 border-b border-avirat-gold/15"
            >
              <div className={`grid grid-cols-1 ${showInquiry && showFaq ? 'lg:grid-cols-2' : ''} gap-6`}>
          {showInquiry && (
          <div>
            <h4 className="font-bold text-avirat-slate text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare size={16} className="text-avirat-blue" />
              Inquiry / Feedback
            </h4>
            <form onSubmit={handleInquirySubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text" placeholder="Your Name *" value={inquiry.name}
                  onChange={(e) => setInquiry(p => ({ ...p, name: e.target.value }))}
                  className="flex-1 bg-white rounded-lg px-3 py-2 text-sm border border-avirat-gold/20
                    focus:outline-none focus:ring-2 focus:ring-avirat-blue/30 focus:border-avirat-blue
                    placeholder:text-gray-400 transition-all"
                  required
                />
                <input
                  type="email" placeholder="Email Address *" value={inquiry.email}
                  onChange={(e) => setInquiry(p => ({ ...p, email: e.target.value }))}
                  className="flex-1 bg-white rounded-lg px-3 py-2 text-sm border border-avirat-gold/20
                    focus:outline-none focus:ring-2 focus:ring-avirat-blue/30 focus:border-avirat-blue
                    placeholder:text-gray-400 transition-all"
                  required
                />
              </div>
              <textarea
                placeholder="Your message or feedback... *" value={inquiry.message}
                onChange={(e) => setInquiry(p => ({ ...p, message: e.target.value }))}
                className="w-full bg-white rounded-lg px-3 py-2 text-sm border border-avirat-gold/20
                  focus:outline-none focus:ring-2 focus:ring-avirat-blue/30 focus:border-avirat-blue
                  placeholder:text-gray-400 transition-all resize-none min-h-[70px]"
                required
              />
              <div className="flex items-center gap-3">
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-avirat-blue to-avirat-dark-blue text-white
                    px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2
                    hover:shadow-glow-blue transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send size={14} /> Send
                </motion.button>
                <AnimatePresence>
                  {submitted && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-avirat-green text-sm font-medium"
                    >
                      ✓ Thank you! We'll get back to you soon.
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
          )}

          {/* FAQ Accordion */}
          {showFaq && (
          <div>
            <h4 className="font-bold text-avirat-slate text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle size={16} className="text-avirat-orange" />
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white/60 rounded-lg border border-avirat-gold/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left
                      hover:bg-avirat-warm/50 transition-colors"
                  >
                    <span className="text-sm font-medium text-avirat-slate pr-4">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="text-avirat-muted flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-3 text-xs text-avirat-muted leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Section: Brand + Links + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="AVIRAT" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="text-xl font-extrabold text-gradient-gold">AVIRAT ACADEMY</h3>
                <p className="text-[9px] text-avirat-muted tracking-[0.25em] uppercase">Fly Towards Passion</p>
              </div>
            </div>
            <p className="text-sm text-avirat-muted leading-relaxed mt-1">
              Empowering students from 1th to 12th standard with specialized coaching .
            </p>
            <div className="flex items-center gap-2 mt-2">
              <GraduationCap size={16} className="text-avirat-blue" />
              <span className="text-xs text-avirat-muted">Founded by Er. Rahul Gawade | Est. 2016</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-avirat-slate text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <motion.button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="text-sm text-avirat-muted hover:text-avirat-blue
                    flex items-center gap-1.5 py-1 transition-colors duration-200 text-left group"
                  whileHover={{ x: 4 }}
                >
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-avirat-slate text-sm mb-4 uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-avirat-orange mt-0.5 flex-shrink-0" />
                <span className="text-sm text-avirat-muted">Near Balewadi Bus Stop, Balewadi - 411045</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-avirat-orange flex-shrink-0" />
                <a href="mailto:rahulgawade87@gmail.com"
                  className="text-sm text-avirat-muted hover:text-avirat-blue transition-colors">
                  rahulgawade87@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-avirat-orange flex-shrink-0" />
                <span className="text-sm text-avirat-muted">+91 7741020109 / +91 9657839439</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-5 border-t border-avirat-gold/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-avirat-muted flex items-center gap-1">
            © {new Date().getFullYear()} AVIRAT Academy Made with
            <Heart size={12} className="text-avirat-red fill-avirat-red" />
            for education.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/about')}
              className="text-xs text-avirat-muted hover:text-avirat-blue transition-colors">
              About Us
            </button>
            <span className="text-avirat-gold/30">|</span>
            <button onClick={() => navigate('/profile')}
              className="text-xs text-avirat-muted hover:text-avirat-blue transition-colors">
              Admin Panel
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
