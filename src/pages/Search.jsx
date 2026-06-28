import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search as SearchIcon, Eraser, Eye, Users, UserCircle,
  ChevronLeft, ChevronRight, X, Calendar, Phone, Mail,
  MapPin, GraduationCap, IndianRupee, BookOpen, Loader2, AlertCircle
} from 'lucide-react'
import { useSidebar } from '../components/Sidebar'
import { CloseButton } from '../components/Button'
import AnimatedPage from '../components/AnimatedPage'
import Modal from '../components/Modal'
import { searchStudents, getAllStudents } from '../api'

const ITEMS_PER_PAGE = 5

const StudentSearch = () => {
  const navigate = useNavigate()
  const { isOpen } = useSidebar()

  const [filters, setFilters] = useState({
    regId: '', firstName: '', lastName: '', course: '', standard: '', email: '', academicYear: ''
  })
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load all students on mount
  useEffect(() => {
    loadAllStudents()
  }, [])

  const loadAllStudents = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllStudents()
    
      const students = data?.content || (Array.isArray(data) ? data : [])
      setResults(students)
      setTotalElements(students.length)
      setTotalPages(Math.ceil(students.length / ITEMS_PER_PAGE))
      setHasSearched(true)
    } catch (err) {
      console.error('Failed to load students:', err)
      setError('Failed to load students. Is the backend running?')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field) => (e) => {
    setFilters(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleClear = () => {
    setFilters({ regId: '', firstName: '', lastName: '', course: '', standard: '', email: '', academicYear: '' })
    setPage(1)
    loadAllStudents()
  }

  const handleSearch = async () => {
    setLoading(true)
    setError('')
    setPage(1)

    // Check if any filter is filled
    const hasFilter = Object.values(filters).some(v => v.trim() !== '')

    try {
      if (!hasFilter) {
        // No filters → load all
        await loadAllStudents()
        return
      }
        

      // Build search params matching backend @RequestParam names
      const params = {}
      if (filters.regId.trim()) params.regId = filters.regId.trim()
      if (filters.firstName.trim()) params.firstName = filters.firstName.trim()
      if (filters.lastName.trim()) params.lastName = filters.lastName.trim()
      if (filters.course.trim()) params.course = filters.course.trim()
      if (filters.standard.trim()) params.standard = filters.standard.trim()
      if (filters.email.trim()) params.email = filters.email.trim()
      params.pageNumber = 0
      params.pageSize = 100

      const data = await searchStudents(params)

      // Backend returns a Spring Page object: { content: [], totalElements, totalPages, ... }
      let students = []
      if (data && data.content) {
        students = data.content
        setTotalElements(data.totalElements || students.length)
      } else if (Array.isArray(data)) {
        students = data
        setTotalElements(students.length)
      }

      setResults(students)
      setTotalPages(Math.ceil(students.length / ITEMS_PER_PAGE))
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

  // Client-side pagination of results
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
              <SearchIcon size={22} className="text-avirat-purple" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-avirat-slate">Student Search</h1>
              <p className="text-xs text-avirat-muted">Find and view enrolled student records</p>
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
                <label className="form-label">Reg ID</label>
                <input className={inputClass} value={filters.regId} onChange={handleChange('regId')} onKeyDown={handleKeyDown} placeholder="e.g. SMT001" />
              </div>
              <div>
                <label className="form-label">First Name</label>
                <input className={inputClass} value={filters.firstName} onChange={handleChange('firstName')} onKeyDown={handleKeyDown} placeholder="First name" />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input className={inputClass} value={filters.lastName} onChange={handleChange('lastName')} onKeyDown={handleKeyDown} placeholder="Last name" />
              </div>
              <div>
                <label className="form-label">Course</label>
                <input className={inputClass} value={filters.course} onChange={handleChange('course')} onKeyDown={handleKeyDown} placeholder="e.g. Java" />
              </div>
              <div>
                <label className="form-label">Standard</label>
                <input className={inputClass} value={filters.standard} onChange={handleChange('standard')} onKeyDown={handleKeyDown} placeholder="e.g. 10th" />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input className={inputClass} value={filters.email} onChange={handleChange('email')} onKeyDown={handleKeyDown} placeholder="Email" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <motion.button
                onClick={handleClear}
                className="btn-orange flex items-center gap-1.5 text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
              >
                <Eraser size={14} /> CLEAR
              </motion.button>
              <motion.button
                onClick={handleSearch}
                className="btn-primary flex items-center gap-1.5 text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <SearchIcon size={14} />}
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
                Student Directory
              </span>
              {hasSearched && (
                <span className="badge badge-blue">{results.length} result{results.length !== 1 ? 's' : ''}</span>
              )}
            </div>

            <div className="overflow-x-auto" style={{ minHeight: '340px' }}>
              <table className="table-premium">
                <thead>
                  <tr>
                    <th>Reg ID</th>
                    <th>Name</th>
                    <th className="hidden sm:table-cell">Course</th>
                    <th className="hidden md:table-cell">Standard</th>
                    <th className="hidden lg:table-cell">Ac. Year</th>
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
                            <p className="text-avirat-muted text-sm">Loading students...</p>
                          </div>
                        </td>
                      </tr>
                    ) : hasSearched && paginatedResults.length > 0 ? (
                      paginatedResults.map((s, i) => (
                        <motion.tr key={s.regId || i}
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }} transition={{ delay: i * 0.05 }}
                          className="group"
                        >
                          <td><span className="font-semibold text-avirat-blue">{s.regId}</span></td>
                          <td>{s.firstName} {s.middleName ? s.middleName + ' ' : ''}{s.lastName}</td>
                          <td className="hidden sm:table-cell"><span className="badge badge-green">{s.courseEnroll}</span></td>
                          <td className="hidden md:table-cell">{s.standard || '—'}</td>
                          <td className="hidden lg:table-cell"><span className="badge badge-orange">{s.academicYear || '—'}</span></td>
                          <td className="hidden lg:table-cell">₹{(s.totalFees || 0).toLocaleString()}</td>
                          <td>
                            <motion.button
                              onClick={() => setSelectedStudent(s)}
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
                              {hasSearched ? <UserCircle size={32} className="text-avirat-muted" /> : <SearchIcon size={32} className="text-avirat-muted" />}
                            </div>
                            <p className="text-avirat-muted text-sm">
                              {hasSearched ? 'No students found matching your criteria' : 'Search for students to view records'}
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
                  Page {page} of {computedTotalPages} ({results.length} students)
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

      {/* Student Detail Modal */}
      <Modal isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)} title="Student Details" size="lg">
        {selectedStudent && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-avirat-gold/10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-avirat-blue to-avirat-dark-blue flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {(selectedStudent.firstName || '?')[0]}{(selectedStudent.lastName || '?')[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-avirat-slate">
                  {selectedStudent.firstName} {selectedStudent.middleName} {selectedStudent.lastName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="badge badge-blue">{selectedStudent.regId}</span>
                  {selectedStudent.academicYear && <span className="badge badge-orange">{selectedStudent.academicYear}</span>}
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div>
              <h4 className="text-sm font-semibold text-avirat-slate mb-3 flex items-center gap-2">
                <UserCircle size={16} className="text-avirat-blue" /> Personal Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoItem icon={Calendar} label="Date of Birth" value={selectedStudent.dateOfBirth || '—'} />
                <InfoItem icon={UserCircle} label="Gender" value={selectedStudent.gender || '—'} />
                <InfoItem icon={UserCircle} label="Mother's Name" value={selectedStudent.motherName || '—'} />
                <InfoItem icon={UserCircle} label="Guardian" value={selectedStudent.guardianName || '—'} />
                <InfoItem icon={Phone} label="Student Mobile" value={selectedStudent.stdMobNumber || '—'} />
                <InfoItem icon={Phone} label="Parent Mobile" value={selectedStudent.parentMobNumber || '—'} />
                <InfoItem icon={Phone} label="Guardian Mobile" value={selectedStudent.guardianMobileNumber || '—'} />
                <InfoItem icon={Mail} label="Student Email" value={selectedStudent.email || '—'} />
                <InfoItem icon={Mail} label="Parent Email" value={selectedStudent.parentEmail || '—'} />
                <InfoItem icon={MapPin} label="Address" value={selectedStudent.address || '—'} />
                <InfoItem icon={MapPin} label="Parent Address" value={selectedStudent.parentAddress || '—'} />
                <InfoItem icon={UserCircle} label="Aadhaar No." value={selectedStudent.adharCardNumber || '—'} />
              </div>
            </div>

            {/* Academic Info */}
            <div>
              <h4 className="text-sm font-semibold text-avirat-slate mb-3 flex items-center gap-2">
                <GraduationCap size={16} className="text-avirat-green" /> Academic Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoItem icon={BookOpen} label="Course" value={selectedStudent.course || '—'} />
                <InfoItem icon={GraduationCap} label="Standard" value={selectedStudent.standard || '—'} />
                <InfoItem icon={Calendar} label="Academic Year" value={selectedStudent.academicYear || '—'} />
                <InfoItem icon={BookOpen} label="Course Duration" value={selectedStudent.courseDuration || '—'} />
                <InfoItem icon={GraduationCap} label="Academic Group" value={selectedStudent.academicGroup || '—'} />
                <InfoItem icon={Calendar} label="Admission Date" value={selectedStudent.admissionDate || '—'} />
                <InfoItem icon={BookOpen} label="School/College" value={selectedStudent.schoolCollegeName || '—'} />
              </div>
            </div>

            {/* Fee Summary */}
            <div>
              <h4 className="text-sm font-semibold text-avirat-slate mb-3 flex items-center gap-2">
                <IndianRupee size={16} className="text-avirat-orange" /> Fee Summary
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <InfoItem icon={IndianRupee} label="Total Fees" value={`₹${(selectedStudent.totalFees || 0).toLocaleString()}`} />
                <InfoItem icon={IndianRupee} label="Paid Fees" value={`₹${(selectedStudent.paidFees || 0).toLocaleString()}`} />
                <InfoItem icon={IndianRupee} label="Remaining" value={`₹${(selectedStudent.remainingFees || 0).toLocaleString()}`} />
              </div>
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

export default StudentSearch
