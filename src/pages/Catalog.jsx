import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Plus, Pencil, Trash2, Search, X, Save,
  Clock, IndianRupee, CreditCard, FileText, Loader2,
  ArrowRight
} from 'lucide-react'
import { useSidebar } from '../components/Sidebar'
import { CloseButton } from '../components/Button'
import AnimatedPage from '../components/AnimatedPage'
import Modal from '../components/Modal'
import { getAllCourses, addCourse, updateCourse, deleteCourse } from '../api'

const emptyForm = { courseName: '', duration: '', totalFees: '', installments: '', description: '' }

const Catalog = () => {
  const navigate = useNavigate()
  const { isOpen } = useSidebar()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [viewCourse, setViewCourse] = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  // Load courses from API on mount
  useEffect(() => { fetchCourses() }, [])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const data = await getAllCourses()
      setCourses(data || [])
    } catch (err) {
      console.error('Failed to load courses:', err)
      fire('error', 'Failed to load courses')
    } finally { setLoading(false) }
  }

const filteredCourses = courses?.content?.filter(c =>
  (c.courseName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (c.catlogId || '').toLowerCase().includes(searchTerm.toLowerCase())
) || []

  const openAdd = () => {
    setEditingCourse(null)
    setForm(emptyForm)
    setIsModalOpen(true)
  }

  const openEdit = (course) => {
    setEditingCourse(course)
    setForm({
      courseName: course.courseName || '',
      duration: course.duration || '',
      totalFees: course.totalFees || '',
      installments: course.installments || '',
      description: course.description || ''
    })
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.courseName || !form.duration || !form.totalFees || !form.installments) return
    setSaving(true)
    try {
      if (editingCourse) {
        await updateCourse(editingCourse.catlogId, {
          courseName: form.courseName,
          duration: form.duration,
          totalFees: Number(form.totalFees),
          installments: Number(form.installments),
          description: form.description
        })
        fire('success', `${form.courseName} updated!`)
      } else {
        await addCourse({
          courseName: form.courseName,
          duration: form.duration,
          totalFees: Number(form.totalFees),
          installments: Number(form.installments),
          description: form.description
        })
        fire('success', `${form.courseName} added!`)
      }
      setIsModalOpen(false)
      setForm(emptyForm)
      fetchCourses() // Refresh from DB
    } catch (err) {
      fire('error', err.message || 'Save failed')
    } finally { setSaving(false) }
  }

  const handleDelete = async (course) => {
    try {
      await deleteCourse(course.catlogId)
      fire('success', `${course.courseName} deleted!`)
      setViewCourse(null)
      fetchCourses()
    } catch (err) {
      fire('error', err.message || 'Delete failed')
    }
  }

  const fire = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 4000) }
  const inputClass = "input-field text-sm"

  return (
    <div className="min-h-screen bg-avirat-yellow flex">
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-[88px]' : 'ml-0'} p-4 sm:p-6 relative`}>
        <CloseButton onClick={() => navigate('/home')} />

        {/* Toast */}
        <AnimatePresence>{toast && (
          <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium ${
              toast.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {toast.msg}
          </motion.div>
        )}</AnimatePresence>

        <AnimatedPage>
          {/* Header */}
          <motion.div className="flex items-center justify-between mb-6"
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-avirat-green/10 flex items-center justify-center">
                <BookOpen size={22} className="text-avirat-green" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-avirat-slate">Course Catalog</h1>
                <p className="text-xs text-avirat-muted">Manage courses, fees & installments</p>
              </div>
            </div>
            <motion.button onClick={openAdd} className="btn-green flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Plus size={16} /> Add Course
            </motion.button>
          </motion.div>

          {/* Search */}
          <motion.div className="card-glass p-4 mb-6 flex items-center gap-4"
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <div className="search-wrapper flex-1">
              <Search size={14} className="search-icon" />
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input text-sm" placeholder="   Search by course name or ID..." />
            </div>
            <span className="badge badge-blue whitespace-nowrap">{filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}</span>
          </motion.div>

          {/* Course Grid */}
          {loading ? (
            <div className="card-glass p-12 text-center">
              <Loader2 size={32} className="animate-spin text-avirat-blue mx-auto mb-3" />
              <p className="text-avirat-muted text-sm">Loading courses...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredCourses.map((course, index) => (
                  <motion.div key={course.catlogId} className="card-glass p-4 group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                    onClick={() => setViewCourse(course)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-avirat-green/10 flex items-center justify-center flex-shrink-0">
                          <BookOpen size={18} className="text-avirat-green" />
                        </div>
                        <div>
                          <h3 className="font-bold text-avirat-slate text-sm leading-tight">{course.courseName}</h3>
                          <span className="text-[10px] text-avirat-muted">{course.catlogId}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-avirat-muted mb-3 line-clamp-2 leading-relaxed">{course.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-avirat-slate">
                          <Clock size={12} className="text-avirat-blue" /> {course.duration}
                        </span>
                        <span className="flex items-center gap-1 text-avirat-slate">
                          <IndianRupee size={12} className="text-avirat-green" /> ₹{(course.totalFees || 0).toLocaleString()}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-avirat-blue opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                        View <ArrowRight size={12} />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && filteredCourses.length === 0 && (
            <div className="card-glass p-12 text-center">
              <BookOpen size={40} className="text-avirat-muted mx-auto mb-3" />
              <p className="text-avirat-muted">No courses found</p>
            </div>
          )}
        </AnimatedPage>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        title={editingCourse ? 'Edit Course' : 'Add New Course'} size="md">
        <div className="space-y-4">
          <div>
            <label className="form-label">Course Name<span className="form-required">*</span></label>
            <input type="text" value={form.courseName} onChange={(e) => setForm(f => ({ ...f, courseName: e.target.value }))}
              className={inputClass} placeholder="e.g. Java Programming" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Duration<span className="form-required">*</span></label>
              <select value={form.duration} onChange={(e) => setForm(f => ({ ...f, duration: e.target.value }))} className="form-select text-sm">
                <option value="">Select...</option>
                <option>2 Months</option><option>3 Months</option><option>5 Months</option>
                <option>6 Months</option><option>1 Year</option><option>2 Years</option>
              </select>
            </div>
            <div>
              <label className="form-label">Total Fees (₹)<span className="form-required">*</span></label>
              <input type="number" value={form.totalFees} onChange={(e) => setForm(f => ({ ...f, totalFees: e.target.value }))}
                className={inputClass} placeholder="e.g. 35000" />
            </div>
          </div>
          <div>
            <label className="form-label">No. of Installments</label>
            <select value={form.installments} onChange={(e) => setForm(f => ({ ...f, installments: e.target.value }))} className="form-select text-sm">
              <option value="1">Select...</option>
              {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div> 
            <label className="form-label">Description</label>
            <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              className={`${inputClass} min-h-[80px] resize-none`} placeholder="Brief course description..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setIsModalOpen(false)} className="btn-ghost text-sm">Cancel</button>
            <motion.button onClick={handleSave} className="btn-green flex items-center gap-2 text-sm"
              disabled={saving} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? 'Saving...' : (editingCourse ? 'Update' : 'Add Course')}
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Detail Modal with Edit + Delete */}
      <Modal isOpen={!!viewCourse} onClose={() => setViewCourse(null)} title="Course Details" size="md">
        {viewCourse && (
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-avirat-green/10 to-avirat-blue/10 rounded-xl p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-avirat-green to-emerald-400 flex items-center justify-center shadow-lg">
                <BookOpen size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-avirat-slate">{viewCourse.courseName}</h3>
                <span className="badge badge-blue">{viewCourse.catlogId}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-avirat-slate mb-2 flex items-center gap-2">
                <FileText size={14} className="text-avirat-blue" /> Description
              </h4>
              <p className="text-sm text-avirat-muted leading-relaxed bg-avirat-warm/30 rounded-lg p-3">
                {viewCourse.description || 'No description'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-avirat-warm/30 rounded-lg p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-avirat-blue/10 flex items-center justify-center"><Clock size={18} className="text-avirat-blue" /></div>
                <div><p className="text-[10px] text-avirat-muted uppercase tracking-wider">Duration</p><p className="text-sm font-bold text-avirat-slate">{viewCourse.duration}</p></div>
              </div>
              <div className="bg-avirat-warm/30 rounded-lg p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-avirat-green/10 flex items-center justify-center"><IndianRupee size={18} className="text-avirat-green" /></div>
                <div><p className="text-[10px] text-avirat-muted uppercase tracking-wider">Total Fees</p><p className="text-sm font-bold text-avirat-slate">₹{(viewCourse.totalFees || 0).toLocaleString()}</p></div>
              </div>
              <div className="bg-avirat-warm/30 rounded-lg p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-avirat-orange/10 flex items-center justify-center"><CreditCard size={18} className="text-avirat-orange" /></div>
                <div><p className="text-[10px] text-avirat-muted uppercase tracking-wider">Installments</p><p className="text-sm font-bold text-avirat-slate">{viewCourse.installments} payment{viewCourse.installments > 1 ? 's' : ''}</p></div>
              </div>
              <div className="bg-avirat-warm/30 rounded-lg p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center"><IndianRupee size={18} className="text-purple-500" /></div>
                <div><p className="text-[10px] text-avirat-muted uppercase tracking-wider">Per Installment</p><p className="text-sm font-bold text-avirat-slate">≈ ₹{Math.round((viewCourse.totalFees || 0) / (viewCourse.installments || 1)).toLocaleString()}</p></div>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <motion.button onClick={() => handleDelete(viewCourse)}
                className="btn-outline text-avirat-red border-red-200 hover:bg-red-50 flex items-center gap-1.5 text-sm"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Trash2 size={14} /> Delete
              </motion.button>
              <div className="flex gap-2">
                <motion.button onClick={() => { setViewCourse(null); openEdit(viewCourse) }}
                  className="btn-orange flex items-center gap-1.5 text-sm"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Pencil size={14} /> Edit
                </motion.button>
                <button onClick={() => setViewCourse(null)} className="btn-ghost text-sm">Close</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Catalog
