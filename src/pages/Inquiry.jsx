import React, { useState, useRef ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Eraser, ClipboardList, Phone, User, GraduationCap, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useSidebar } from '../components/Sidebar'
import { CloseButton } from '../components/Button'
import AnimatedPage from '../components/AnimatedPage'
import { saveInquiry, getAllCourses } from '../api'

const Inquiry = () => {
  const navigate = useNavigate()
  const { isOpen } = useSidebar()

  const today = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    standard: '',
    courseEnroll: '',
    parentMobNumber: '',
    totalFees: '',
    inquiryDate: today,
  })

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [catalogData, setCatalogData] = useState([])
  const [successModal, setSuccessModal] = useState(null)

  const fieldRefs = useRef({})
  const setRef = (field) => (el) => { fieldRefs.current[field] = el }

  const fieldOrder = [
    'firstName', 'middleName', 'lastName',
    'parentMobNumber', 'standard', 'courseEnroll',
    'totalFees', 'inquiryDate'
  ]


  
  // ====== ENTER KEY NAVIGATION ======
  const handleKeyDown = (field) => (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const idx = fieldOrder.indexOf(field)
      if (idx >= 0 && idx < fieldOrder.length - 1) {
        const nextRef = fieldRefs.current[fieldOrder[idx + 1]]
        if (nextRef) nextRef.focus()
      }
    }
  }
   // Fetch catalog data for auto-fill
   useEffect(() => {
      getAllCourses()
        .then(data => {
            const courses = data?.content ||(Array.isArray(data) ? data : [])
               setCatalogData(courses)
               })
            
        .catch(() =>{
          setCatalogData([])
           })
    }, []);

 // Auto-fill: when course/duration/fees changes, populate related fields from catalog
  const autoFillFromCatalog = (field, value) => {
    if (!catalogData.length) return {}
    let match = null

    if (field === 'courseEnroll') {
      match = catalogData.find(c => c.courseName === value)
    }  else if (field === 'totalFees') {
      const byFees = catalogData.filter(c => String(c.totalFees) === String(value))
      if (byFees.length === 1) match = byFees[0]
    }

    if (!match) return {}
    const fill = {}
    if (field !== 'courseEnroll' && match.courseName) fill.courseEnroll = match.courseName
    if (field !== 'totalFees' && match.totalFees != null) fill.totalFees = String(match.totalFees)
    return fill
  }

  const handleChange = (field) => (e) => {
     const value = e.target.value
    const autoFill = autoFillFromCatalog(field, value)
    setFormData(prev => ({ ...prev, [field]: value, ...autoFill }))   
     if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleClear = () => {
    setFormData (Object.fromEntries(Object.keys(formData).map(k => [k,  k === 'inquiryDate' ? today : ''])))
    setErrors({})
  }

  // ====== VALIDATION ======
  const validate = () => {
    const errs = {}
    //if (!formData.firstName.trim())     errs.firstName = 'First name is required'
   // if (!formData.lastName.trim())      errs.lastName = 'Last name is required'
    if (!formData.courseEnroll) errs.courseEnroll = 'Course is required'
    //if (!formData.parentMobNumber.trim()) errs.parentMobNumber = 'Parent mobile is required'
    else if (!/^[0-9]{10}$/.test(formData.parentMobNumber.replace(/\s|\+91/g, '')))
    //  errs.parentMobNumber = 'Mobile must be exactly 10 digits'
    if (!formData.inquiryDate)          errs.inquiryDate = 'Inquiry date is required'
    if (formData.totalFees && Number(formData.totalFees) < 0)
      errs.totalFees = 'Fees cannot be negative'
    return errs
  }

  // ====== SAVE ======
  const handleSave = async () => {
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      const firstErr = fieldOrder.find(f => errs[f])
      if (firstErr && fieldRefs.current[firstErr]) fieldRefs.current[firstErr].focus()
      setToast({ type: 'error', msg: 'Please fix the highlighted errors' })
      setTimeout(() => setToast(null), 4000)
      return
    }

    setSaving(true)
    try {
      const payload = {
      firstName:       formData.firstName.trim(),
      middleName:      formData.middleName.trim(),
      lastName:        formData.lastName.trim(),
      course:          formData.courseEnroll,
      standard:        formData.standard,
      parentMobNumber: formData.parentMobNumber.replace(/\s|\+91/g, ''),
      totalFees:       formData.totalFees ? Number(formData.totalFees) : null,
      inquiryDate:     formData.inquiryDate || null,
    }

      const response = await saveInquiry(payload)

      const studentName = `${formData.firstName} ${formData.lastName}`
      setSuccessModal({ name: studentName })
      handleClear()
    } catch (err) {
      setToast({ type: 'error', msg: 'Failed to save inquiry. Please try again.' })
      setTimeout(() => setToast(null), 5000)
    } finally {
      setSaving(false)
    }
  }

   // Dynamic course names from catalog
  const courseNames = [...new Set(catalogData.map(c => c.courseName).filter(Boolean))]
  const durations = [...new Set(catalogData.map(c => c.duration).filter(Boolean))]


  const inputClass = (field) =>
    `input-field text-sm ${errors[field] ? 'border-red-500 ring-1 ring-red-300' : ''}`
  const selectClass = (field) =>
    `form-select text-sm ${errors[field] ? 'border-red-500 ring-1 ring-red-300' : ''}`
  const labelClass = "form-label"
  const requiredStar = <span className="form-required">*</span>

  const ErrorMsg = ({ field }) => errors[field] ? (
    <span className="text-red-500 text-xs mt-0.5 flex items-center gap-1">
      <AlertCircle size={11} /> {errors[field]}
    </span>
  ) : null

  const SectionTitle = ({ icon: Icon, title, color = 'text-avirat-blue' }) => (
    <div className="flex items-center gap-2 mb-3 mt-2">
      <div className={`w-7 h-7 rounded-lg ${color === 'text-avirat-blue' ? 'bg-avirat-blue/10' : 'bg-avirat-green/10'} flex items-center justify-center`}>
        <Icon size={14} className={color} />
      </div>
      <h3 className="font-semibold text-avirat-slate text-sm">{title}</h3>
    </div>
  )

  // Standard categories: 12+
  const standardOptions = [
    '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
    '11th', '12th', 'UG-1st Year', 'UG-2nd Year', 'UG-3rd Year', 'UG-4th Year',
    'PG-1st Year', 'PG-2nd Year', 'Diploma', 'Other'
  ]

  return (
    <div className="min-h-screen bg-avirat-yellow flex">

      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-[88px]' : 'ml-0'} p-4 sm:p-6 relative`}>
        <CloseButton onClick={() => navigate('/home')} />

        {/* Toast */}
        {toast && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium ${
              toast.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {toast.msg}
          </motion.div>
        )}

        <AnimatedPage>
          {/* Title */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="w-10 h-10 rounded-xl bg-avirat-blue/10 flex items-center justify-center">
              <ClipboardList size={22} className="text-avirat-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-avirat-slate">Student Inquiry</h1>
              <p className="text-xs text-avirat-muted">Fill in the details to register a new inquiry</p>
            </div>
          </motion.div>

          <motion.div
            className="form-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-3">
                <SectionTitle icon={User} title="Personal Information" />

                {/* Name Row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className={labelClass}>First Name {}</label>
                    <input ref={setRef('firstName')} type="text" value={formData.firstName}
                      onChange={handleChange('firstName')} onKeyDown={handleKeyDown('firstName')}
                      className={inputClass('firstName')} placeholder="First name" />
                  
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>Middle Name</label>
                    <input ref={setRef('middleName')} type="text" value={formData.middleName}
                      onChange={handleChange('middleName')} onKeyDown={handleKeyDown('middleName')}
                      className={inputClass('middleName')} placeholder="Middle name" />
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>Last Name {requiredStar}</label>
                    <input ref={setRef('lastName')} type="text" value={formData.lastName}
                      onChange={handleChange('lastName')} onKeyDown={handleKeyDown('lastName')}
                      className={inputClass('lastName')} placeholder="Last name" />
                    <ErrorMsg field="lastName" />
                  </div>
                </div>

                <SectionTitle icon={Phone} title="Contact Information" color="text-avirat-green" />
                 
                 {/* Parent Mobile Number*/ }
                <div>
                  <label className={labelClass}>Parent Mobile Number </label>
                  <input ref={setRef('parentMobNumber')} type="tel" value={formData.parentMobNumber}
                    onChange={handleChange('parentMobNumber')} onKeyDown={handleKeyDown('parentMobNumber')}
                    className={inputClass('parentMobNumber')} placeholder="10-digit mobile number" maxLength="10" />
                  <ErrorMsg field="parentMobNumber" />
                </div>
              </div>

              {/* Divider */}
              <div className="w-px bg-avirat-gold/20 my-4 hidden lg:block" />

              {/* Right Column */}
              <div className="flex-1 flex flex-col gap-3">
                <SectionTitle icon={GraduationCap} title="Academic Information" />

                <div>
                  <label className={labelClass}>Standard</label>
                  <select ref={setRef('standard')} value={formData.standard}
                    onChange={handleChange('standard')} onKeyDown={handleKeyDown('standard')}
                    className={selectClass('standard')}>
                    <option value="">Select...</option>
                    {standardOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Course Enroll</label>
                  <select ref={setRef('courseEnroll')} value={formData.courseEnroll}
                    onChange={handleChange('courseEnroll')} onKeyDown={handleKeyDown('courseEnroll')}
                    className={selectClass('courseEnroll')}>
                    <option value="">Select...</option>
                    {courseNames.length > 0
                        ? courseNames.map(c => <option key={c} value={c}>{c}</option>)
                        : ['Java','English','Frontend Development','Python','Java Fullstack',
                           '1st Std','2nd Std','3rd Std','4th Std','5th Std','6th Std','7th Std',
                           '8th Std','9th Std','10th Std','11th Std','12th Std',
                           'UG','PG','Diploma','Other'].map(c =>
                            <option key={c} value={c}>{c}</option>
                          )
                      }
                  </select>
                    <ErrorMsg field="courseEnroll" />

                </div>

                <div>
                  <label className={labelClass}>Total Fees (₹)</label>
                     <input ref={setRef('totalFees')} type="number" value={formData.totalFees} readOnly={!!formData.courseEnroll && catalogData.some(c => c.courseName === formData.courseEnroll)} onChange={handleChange('totalFees')} 
                      onKeyDown={handleKeyDown('totalFees')} className={`${inputClass('totalFees')} ${formData.courseEnroll && catalogData.some(c => c.courseName === formData.courseEnroll) ? 'bg-gray-50 cursor-not-allowed' : ''}`} placeholder="Auto-filled from course" min="0" step="0.01" />
                  <ErrorMsg field="totalFees" />
                </div>

                <div>
                  <label className={labelClass}>Date of Inquiry {requiredStar}</label>
                  <input ref={setRef('inquiryDate')} type="date" value={formData.inquiryDate}
                    onChange={handleChange('inquiryDate')} onKeyDown={handleKeyDown('inquiryDate')}
                    className={inputClass('inquiryDate')} />
                  <ErrorMsg field="inquiryDate" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-avirat-gold/20">
              <motion.button onClick={handleClear} className="btn-orange flex items-center gap-2"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled={saving}>
                <Eraser size={16} /> CLEAR
              </motion.button>
              <motion.button onClick={handleSave} className="btn-green flex items-center gap-2"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled={saving}>
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'SAVING...' : 'SAVE'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatedPage>
      </div>

      {/* ===== SUCCESS MODAL ===== */}
      <AnimatePresence>
        {successModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] bg-black/50 backdrop-blur-sm"
            onClick={() => { setSuccessModal(null); navigate('/inquiry') }}
          >
            <motion.div
              initial={{ scale: 0.7, y: -30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: -30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-[90%] text-center border border-avirat-gold/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={44} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-avirat-slate mb-2">Inquiry Saved!</h2>
              <p className="text-avirat-muted text-sm mb-6">
                Inquiry for <span className="font-semibold text-avirat-slate">{successModal.name}</span> has been registered successfully.
              </p>
              <motion.button
                onClick={() => { setSuccessModal(null); navigate('/inquiry') }}
                className="btn-green w-full flex items-center justify-center gap-2 text-base py-3"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              >
                <ClipboardList size={18} />
                Add Next Inquiry
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Inquiry