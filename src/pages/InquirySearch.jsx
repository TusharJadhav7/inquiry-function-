import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search as SearchIcon, Eraser, Eye, Users, UserCircle,
  ChevronLeft, ChevronRight, Phone, GraduationCap,
  ClipboardList, Loader2, AlertCircle, IndianRupee ,UserPlus
} from 'lucide-react'
import { useSidebar } from '../components/Sidebar'
import { CloseButton } from '../components/Button'
import AnimatedPage from '../components/AnimatedPage'
import Modal from '../components/Modal'
import { searchStudentInquiry, getAllInquiry, deleteInquiry } from '../api'

const ITEMS_PER_PAGE = 5

const InquirySearch = () => {
  const navigate = useNavigate()
  const { isOpen } = useSidebar()

  const [filters, setFilters] = useState({
    inquiryId: '', firstName: '', lastName: '', standard: '',courseEnroll:''
  })
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Load all inquiries on mount
  useEffect(() => {
    loadAllInquiries()
  }, [])

  const loadAllInquiries = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllInquiry()
      const inquiries = data?.content ||( Array.isArray(data) ? data : [])
      setResults(inquiries)
      setHasSearched(true)
    } catch (err) {
      console.error('Failed to load inquiries:', err)
      setError('Failed to load inquiries. Is the backend running?')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field) => (e) => {
    setFilters(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleClear = () => {
    setFilters({ inquiryId: '', firstName: '', lastName: '', standard: '' ,courseEnroll:'' })
    setPage(1)
    loadAllInquiries()
  }

  const handleSearch = async () => {
    setLoading(true)
    setError('')
    setPage(1)

    const hasFilter = Object.values(filters).some(v => v.trim() !== '')

    try {
      if (!hasFilter) {
        await loadAllInquiries()
        return
      }

      const params = {}
      if (filters.inquiryId.trim())  params.inquiryId  = filters.inquiryId.trim()
      if (filters.firstName.trim())  params.firstName  = filters.firstName.trim()
      if (filters.lastName.trim())   params.lastName   = filters.lastName.trim()
      if (filters.standard.trim())   params.standard   = filters.standard.trim()
      if (filters.courseEnroll.trim())   params.courseEnroll   = filters.courseEnroll.trim()
      params.pageNumber = 0
      params.pageSize   = 100

      const data = await searchStudentInquiry(params)

      let inquiries = []
      if (data && data.content) {
        inquiries = data.content
      } else if (Array.isArray(data)) {
        inquiries = data
      }

      setResults(inquiries)
      setHasSearched(true)
    } catch (err) {
      console.error('Search failed:', err)
      setError('Search failed: ' + (err.message || 'Unknown error'))
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  // Enter key triggers search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const paginatedResults = results.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  const computedTotalPages = Math.ceil(results.length / ITEMS_PER_PAGE)

  const inputClass = "input-field text-sm"

  return (
    <div className="min-h-screen bg-avirat-yellow flex">

      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-[88px]' : 'ml-0'} p-4 sm:p-6 relative`}>
        <CloseButton onClick={() => navigate('/home')} />

        <AnimatedPage>
          {/* Title */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="w-10 h-10 rounded-xl bg-avirat-purple/10 flex items-center justify-center">
              <ClipboardList size={22} className="text-avirat-purple" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-avirat-slate">Inquiry Search</h1>
              <p className="text-xs text-avirat-muted">Find and view student inquiry records</p>
            </div>
          </motion.div>

          {/* Search Card */}
          <motion.div
            className="card-glass p-4 sm:p-5 mb-5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <div>
                <label className="form-label">Inquiry ID</label>
                <input className={inputClass} value={filters.inquiryId}
                  onChange={handleChange('inquiryId')} onKeyDown={handleKeyDown}
                  placeholder="e.g. INQ001" />
              </div>
              <div>
                <label className="form-label">First Name</label>
                <input className={inputClass} value={filters.firstName}
                  onChange={handleChange('firstName')} onKeyDown={handleKeyDown}
                  placeholder="First name" />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input className={inputClass} value={filters.lastName}
                  onChange={handleChange('lastName')} onKeyDown={handleKeyDown}
                  placeholder="Last name" />
              </div>
              <div>
                <label className="form-label">Standard</label>
                <input className={inputClass} value={filters.standard}
                  onChange={handleChange('standard')} onKeyDown={handleKeyDown}
                  placeholder="standard" / >
                 
                
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <motion.button onClick={handleClear}
                className="btn-orange flex items-center gap-1.5 text-sm"
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                disabled={loading}>
                <Eraser size={14} /> CLEAR
              </motion.button>
              <motion.button onClick={handleSearch}
                className="btn-primary flex items-center gap-1.5 text-sm"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                disabled={loading}>
                {loading
                  ? <Loader2 size={14} className="animate-spin" />
                  : <SearchIcon size={14} />}
                {loading ? 'SEARCHING...' : 'SEARCH'}
              </motion.button>
            </div>
          </motion.div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2"
            >
              <AlertCircle size={16} /> {error}
            </motion.div>
          )}

          {/* Results Table */}
          <motion.div
            className="card-glass overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="px-5 py-3 border-b border-avirat-gold/10 flex items-center justify-between">
              <span className="text-sm font-semibold text-avirat-slate flex items-center gap-2">
                <Users size={16} className="text-avirat-blue" />
                Inquiry Directory
              </span>
              {hasSearched && (
                <span className="badge badge-blue">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="overflow-x-auto" style={{ minHeight: '340px' }}>
              <table className="table-premium">
                <thead>
                  <tr>
                    <th>Inquiry ID</th>
                    <th>Name</th>
                    <th className="hidden sm:table-cell">courseEnroll</th>
                    <th className="hidden md:table-cell">Standard</th>
                    <th className="hidden lg:table-cell">Parent Mobile</th>
                    <th className="hidden lg:table-cell">Fees</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 size={32} className="animate-spin text-avirat-blue" />
                          <p className="text-avirat-muted text-sm">Loading inquiries...</p>
                        </div>
                      </td>
                    </tr>
                  ) : hasSearched && paginatedResults.length > 0 ? (
                    paginatedResults.map((inq, i) => (
                      <motion.tr key={inq.inquiryId || i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: i * 0.05 }}
                        className="group"
                      >
                        <td><span className="font-semibold text-avirat-blue">{inq.inquiryId}</span></td>
                        <td>{inq.firstName} {inq.middleName ? inq.middleName + ' ' : ''}{inq.lastName}</td>
                        <td className="hidden sm:table-cell">
                          <span className="badge badge-green">{inq.course  || '—'}</span>
                        </td>
                        <td className="hidden md:table-cell">{inq.standard || '—'}</td>
                        <td className="hidden lg:table-cell">{inq.parentMobNumber || '—'}</td>
                        <td className="hidden lg:table-cell">₹{(inq.totalFees || 0).toLocaleString()}</td>
                        <td>
                          <motion.button
                            onClick={() => setSelectedInquiry(inq)}
                            className="flex items-center gap-1.5 text-avirat-blue hover:text-avirat-dark-blue
                              font-medium text-sm hover:bg-avirat-blue/5 px-3 py-1.5 rounded-lg
                              transition-all duration-200"
                            whileHover={{ x: 3 }}
                          >
                            <Eye size={14} /> View
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-avirat-blue/5 flex items-center justify-center">
                            {hasSearched
                              ? <UserCircle size={32} className="text-avirat-muted" />
                              : <SearchIcon size={32} className="text-avirat-muted" />}
                          </div>
                          <p className="text-avirat-muted text-sm">
                            {hasSearched
                              ? 'No inquiries found matching your criteria'
                              : 'Search for inquiries to view records'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {computedTotalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-avirat-gold/10">
                <span className="text-xs text-avirat-muted">
                  Page {page} of {computedTotalPages} ({results.length} inquiries)
                </span>
                <div className="flex gap-1">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-avirat-muted
                      hover:bg-avirat-blue/10 hover:text-avirat-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: computedTotalPages }, (_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                        ${page === i + 1 ? 'bg-avirat-blue text-white' : 'text-avirat-muted hover:bg-avirat-blue/10'}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(computedTotalPages, p + 1))} disabled={page === computedTotalPages}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-avirat-muted
                      hover:bg-avirat-blue/10 hover:text-avirat-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatedPage>
      </div>

      {/* Inquiry Detail Modal */}
      <Modal isOpen={!!selectedInquiry} onClose={() => setSelectedInquiry(null)} title="Inquiry Details" size="lg">
        {selectedInquiry && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-avirat-gold/10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-avirat-blue to-avirat-dark-blue
                flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {(selectedInquiry.firstName || '?')[0]}{(selectedInquiry.lastName || '?')[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-avirat-slate">
                  {selectedInquiry.firstName} {selectedInquiry.middleName} {selectedInquiry.lastName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="badge badge-blue">{selectedInquiry.inquiryId}</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <h4 className="text-sm font-semibold text-avirat-slate mb-3 flex items-center gap-2">
                <GraduationCap size={16} className="text-avirat-green" /> Inquiry Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoItem icon={GraduationCap} label="courseEnroll" value={selectedInquiry.courseEnroll || '—'} />
                <InfoItem icon={GraduationCap} label="Standard" value={selectedInquiry.standard || '—'} />
                <InfoItem icon={Phone} label="Parent Mobile" value={selectedInquiry.parentMobNumber || '—'} />
                <InfoItem icon={IndianRupee} label="Total Fees" value={`₹${(selectedInquiry.totalFees || 0).toLocaleString()}`} />
                <InfoItem icon={ClipboardList} label="Inquiry Date" value={selectedInquiry.inquiryDate || '—'} />
              </div>
              {/* open to Registration form */}
              <motion.button
                   onClick={() => {
                    console.log("Selected Inquiry:", selectedInquiry);
                    navigate('/registration', {
                    state: { fromInquiry: selectedInquiry }
                      })
                    setSelectedInquiry(null)
                       }}
                    className="btn-green w-full flex items-center justify-center gap-2 mt-4"
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                      >
                   <UserPlus size={14} />
                    Proceed for Registration
                   </motion.button>
               </div>
            </div>
           )}
         </Modal>
       </div>
    )
  }

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2 bg-avirat-warm/30 rounded-lg px-3 py-2">
    <Icon size={14} className="text-avirat-muted mt-0.5 flex-shrink-0" />
    <div className="min-w-0">
      <p className="text-[10px] text-avirat-muted uppercase tracking-wider">{label}</p>
      <p className="text-sm text-avirat-slate font-medium truncate">{value}</p>
    </div>
  </div>
)

export default InquirySearch