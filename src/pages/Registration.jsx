import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Eraser, UserPlus, Calendar, Phone, Mail, MapPin, GraduationCap, BookOpen, CheckCircle2, AlertCircle, Loader2, PartyPopper } from 'lucide-react'
import { useSidebar } from '../components/Sidebar'
import { CloseButton } from '../components/Button'
import AnimatedPage from '../components/AnimatedPage'
import { registerStudent, getAllCourses } from '../api'
import { useLocation } from 'react-router-dom'

const Registration = () => {
  const navigate = useNavigate()
  const { isOpen } = useSidebar()
  const location = useLocation()

  // Default admission date to today
  const today = new Date().toISOString().split('T')[0]
  
  const inquiryData = location.state?.fromInquiry

  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '',
    motherName: '', guardianName: '',
    standard: '', courseEnroll: '',
    dob: '', gender: '', aadhaarNo: '', 
    courseDuration: '', academicYear: '',
    residentialAddress: '', academicGroup: '',
    mobileNumber: '', dateOfAdmission: today,
    studentEmail: '', schoolCollegeName: '',
    parentAddress: '', parentMobileNumber: '',
    guardianMobileNumber: '', parentEmail: '',
    totalFees: ''
  })

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null) // { type: 'success'|'error', msg }
  const [catalogData, setCatalogData] = useState([])
  const [successModal, setSuccessModal] = useState(null) // { regId, name }

  // Refs for Enter key navigation
  const fieldRefs = useRef({})

  // Ordered field list for Enter key navigation
  const fieldOrder = [
    'firstName', 'middleName', 'lastName',
    'motherName', 'guardianName',
    'dob', 'gender', 'aadhaarNo',
    'residentialAddress', 'mobileNumber', 'studentEmail',
    'parentAddress', 'parentMobileNumber',
    'guardianMobileNumber', 'parentEmail',
    'standard', 'courseEnroll', 'courseDuration',
    'academicYear', 'academicGroup',
    'dateOfAdmission', 'schoolCollegeName', 'totalFees'
  ]

  // Fetch catalog data for auto-fill
  useEffect(() => {
    getAllCourses()
      .then(data => {
           console.log('✅ Catalog loaded:', data)
           console.log('✅ First item:', data[0])
          const courses = data?.content ||(Array.isArray(data) ? data : [])
             setCatalogData(courses)
             })
          
      .catch((err) =>{
        console.log('❌ Catalog error:', err)
        setCatalogData([])
         })
  }, []);

  useEffect(() => {
    if (inquiryData && catalogData.length > 0) {
      const courseName = inquiryData.courseEnroll || inquiryData.course || ''
      const match = catalogData.find(c => c.courseName === courseName)

      setFormData(prev => ({
        ...prev,
        firstName: inquiryData.firstName || '',
        middleName: inquiryData.middleName || '',
        lastName: inquiryData.lastName || '',
        standard: inquiryData.standard || '',
        courseEnroll: courseName || '',
        courseDuration: match?.duration || '',
        parentMobileNumber: inquiryData.parentMobNumber || '',
        totalFees: match?.totalFees != null ? String(match.totalFees) : (inquiryData.totalFees || '')
      }))
    }
  }, [inquiryData, catalogData])

  // Auto-fill: when course/duration/fees changes, populate related fields from catalog
  const autoFillFromCatalog = (field, value) => {
    if (!catalogData.length) return {}
    let match = null

    if (field === 'courseEnroll') {
      match = catalogData.find(c => c.catlogId === value)
    } else if (field === 'courseDuration') {
      const byDuration = catalogData.filter(c => c.duration === value)
      if (byDuration.length === 1) match = byDuration[0]
      else if (formData.courseEnroll) match = byDuration.find(c => c.catlogId === formData.courseEnroll)
    } else if (field === 'totalFees') {
      const byFees = catalogData.filter(c => String(c.totalFees) === String(value))
      if (byFees.length === 1) match = byFees[0]
    }

    if (!match) return {}
    const fill = {}
    if (field !== 'courseEnroll' && match.courseName) fill.courseEnroll = match.courseName
    if (field !== 'courseDuration' && match.duration) fill.courseDuration = match.duration
    if (field !== 'totalFees' && match.totalFees != null) fill.totalFees = String(match.totalFees)
    return fill
  }

  const handleChange = (field) => (e) => {
    const value = e.target.value
    const autoFill = autoFillFromCatalog(field, value)
    setFormData(prev => ({ ...prev, [field]: value, ...autoFill }))
    // Clear error on change
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  // Enter key → move to next field
  const handleKeyDown = (field) => (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const idx = fieldOrder.indexOf(field)
      if (idx >= 0 && idx < fieldOrder.length - 1) {
        const nextField = fieldOrder[idx + 1]
        const nextRef = fieldRefs.current[nextField]
        if (nextRef) nextRef.focus()
      }
    }
  }

  const setRef = (field) => (el) => { fieldRefs.current[field] = el }

  const handleClear = () => {
    setFormData(Object.fromEntries(Object.keys(formData).map(k => [k, ''])))
    setErrors({})
  }

  // ====== VALIDATION ======
  const validate = () => {
    const errs = {}
    // Required fields
    if (!formData.firstName.trim()) errs.firstName = 'First name is required'
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required'
    if (!formData.gender) errs.gender = 'Gender is required'
    if (!formData.courseEnroll) errs.courseEnroll = 'Course is required'
    if (!formData.schoolCollegeName.trim()) errs.schoolCollegeName = 'School/College name is required'
    if (!formData.totalFees) errs.totalFees = 'Total fees is required'
    else if (Number(formData.totalFees) < 0) errs.totalFees = 'Fees cannot be negative'
    else if (Number(formData.totalFees) === 0) errs.totalFees = 'Fees must be greater than 0'
    if (!formData.dateOfAdmission) errs.dateOfAdmission = 'Admission date is required'

    if (!formData.dob) errs.dob = 'Date of birth is required'
    if (!formData.aadhaarNo.trim()) errs.aadhaarNo = 'Aadhaar number is required'
    else if (!/^[0-9]{12}$/.test(formData.aadhaarNo.replace(/\s/g, ''))) {
      errs.aadhaarNo = 'Aadhaar must be exactly 12 digits'
    }
    if (!formData.residentialAddress.trim()) errs.residentialAddress = 'Residential address is required'
    // Mobile: required + exactly 10 digits
    if (!formData.mobileNumber.trim()) errs.mobileNumber = 'Student mobile is required'
    else if (!/^[0-9]{10}$/.test(formData.mobileNumber.replace(/\s|\+91/g, ''))) {
      errs.mobileNumber = 'Mobile must be exactly 10 digits'
    }
    if (!formData.parentMobileNumber.trim()) errs.parentMobileNumber = 'Parent mobile is required'
    else if (!/^[0-9]{10}$/.test(formData.parentMobileNumber.replace(/\s|\+91/g, ''))) {
      errs.parentMobileNumber = 'Mobile must be exactly 10 digits'
    }
    if (formData.guardianMobileNumber && !/^[0-9]{10}$/.test(formData.guardianMobileNumber.replace(/\s|\+91/g, ''))) {
      errs.guardianMobileNumber = 'Mobile must be exactly 10 digits'
    }
    // Email: required + format
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.studentEmail.trim()) errs.studentEmail = 'Student email is required'
    else if (!emailRe.test(formData.studentEmail)) {
      errs.studentEmail = 'Invalid email format'
    }
    if (!formData.parentEmail.trim()) errs.parentEmail = 'Parent email is required'
    else if (!emailRe.test(formData.parentEmail)) {
      errs.parentEmail = 'Invalid email format'
    }

    return errs
  }

  // ====== SAVE → BACKEND ======
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
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        motherName: formData.motherName.trim(),
        guardianName: formData.guardianName.trim(),
        dateOfBirth: formData.dob || null,
        gender: formData.gender,
        course: formData.courseEnroll,
        standard: formData.standard,
        courseDuration: formData.courseDuration,
        academicYear: formData.academicYear,
        academicGroup: formData.academicGroup,
        admissionDate: formData.dateOfAdmission || null,
        schoolCollegeName: formData.schoolCollegeName.trim(),
        address: formData.residentialAddress.trim(),
        parentAddress: formData.parentAddress.trim(),
        stdMobNumber: formData.mobileNumber.replace(/\s|\+91/g, ''),
        parentMobNumber: formData.parentMobileNumber.replace(/\s|\+91/g, ''),
        guardianMobileNumber: formData.guardianMobileNumber.replace(/\s|\+91/g, ''),
        email: formData.studentEmail.trim(),
        parentEmail: formData.parentEmail.trim(),
        totalFees: Number(formData.totalFees),
        paidFees: 0,
        remainingFees: Number(formData.totalFees),
        adharCardNumber: formData.aadhaarNo.replace(/\s/g, '')
      }

      const response = await registerStudent(payload)
      // Backend returns: "Registered with Reg-X Successfully"
      const regIdMatch = typeof response === 'string' ? response.match(/Reg-\d+/) : null
      const regId = regIdMatch ? regIdMatch[0] : 'N/A'
      const studentName = `${formData.firstName} ${formData.lastName}`

      // Show success modal with Reg ID
      setSuccessModal({ regId, name: studentName })
      handleClear()
    } catch (err) {
      console.error('Registration failed:', err)
      setToast({ type: 'error', msg: err.message || 'Registration failed. Please try again.' })
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

        {/* Toast notification */}
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
              <UserPlus size={22} className="text-avirat-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-avirat-slate">Student Registration</h1>
              <p className="text-xs text-avirat-muted">Fill in the details to enroll a new student</p>
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
                <SectionTitle icon={UserPlus} title="Personal Information" />

                {/* Name Row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className={labelClass}>FirstName{requiredStar}</label>
                    <input ref={setRef('firstName')} type="text" value={formData.firstName} onChange={handleChange('firstName')} onKeyDown={handleKeyDown('firstName')} className={inputClass('firstName')} placeholder="First name" />
                    <ErrorMsg field="firstName" />
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>MiddleName</label>
                    <input ref={setRef('middleName')} type="text" value={formData.middleName} onChange={handleChange('middleName')} onKeyDown={handleKeyDown('middleName')} className={inputClass('middleName')} placeholder="Middle name" />
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>LastName{requiredStar}</label>
                    <input ref={setRef('lastName')} type="text" value={formData.lastName} onChange={handleChange('lastName')} onKeyDown={handleKeyDown('lastName')} className={inputClass('lastName')} placeholder="Last name" />
                    <ErrorMsg field="lastName" />
                  </div>
                </div>

                {/* Mother & Guardian */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className={labelClass}>MotherName</label>
                    <input ref={setRef('motherName')} type="text" value={formData.motherName} onChange={handleChange('motherName')} onKeyDown={handleKeyDown('motherName')} className={inputClass('motherName')} placeholder="Mother's name" />
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>GuardianName</label>
                    <input ref={setRef('guardianName')} type="text" value={formData.guardianName} onChange={handleChange('guardianName')} onKeyDown={handleKeyDown('guardianName')} className={inputClass('guardianName')} placeholder="Guardian's name" />
                  </div>
                </div>

                {/* DOB & Gender */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className={labelClass}>DOB{requiredStar}</label>
                    <input ref={setRef('dob')} type="date" value={formData.dob} onChange={handleChange('dob')} onKeyDown={handleKeyDown('dob')} className={inputClass('dob')} />
                    <ErrorMsg field="dob" />
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>Gender{requiredStar}</label>
                    <select ref={setRef('gender')} value={formData.gender} onChange={handleChange('gender')} onKeyDown={handleKeyDown('gender')} className={selectClass('gender')}>
                      <option value="">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ErrorMsg field="gender" />
                  </div>
                </div>

                {/* Aadhaar No */}
                <div>
                  <label className={labelClass}>Aadhaar No.{requiredStar}</label>
                  <input ref={setRef('aadhaarNo')} type="text" value={formData.aadhaarNo} onChange={handleChange('aadhaarNo')} onKeyDown={handleKeyDown('aadhaarNo')} className={inputClass('aadhaarNo')} placeholder="XXXXXXXXXXXX" maxLength="12" />
                  <ErrorMsg field="aadhaarNo" />
                </div>

                <SectionTitle icon={MapPin} title="Contact Information" color="text-avirat-green" />

                {/* Address */}
                <div>
                  <label className={labelClass}>Residential Address{requiredStar}</label>
                  <input ref={setRef('residentialAddress')} type="text" value={formData.residentialAddress} onChange={handleChange('residentialAddress')} onKeyDown={handleKeyDown('residentialAddress')} className={inputClass('residentialAddress')} placeholder="Full residential address" />
                  <ErrorMsg field="residentialAddress" />
                </div>

                {/* Mobile */}
                <div>
                  <label className={labelClass}>Student Mobile{requiredStar}</label>
                  <input ref={setRef('mobileNumber')} type="tel" value={formData.mobileNumber} onChange={handleChange('mobileNumber')} onKeyDown={handleKeyDown('mobileNumber')} className={inputClass('mobileNumber')} placeholder="10-digit mobile number" maxLength="10" />
                  <ErrorMsg field="mobileNumber" />
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>Student Email{requiredStar}</label>
                  <input ref={setRef('studentEmail')} type="email" value={formData.studentEmail} onChange={handleChange('studentEmail')} onKeyDown={handleKeyDown('studentEmail')} className={inputClass('studentEmail')} placeholder="student@email.com" />
                  <ErrorMsg field="studentEmail" />
                </div>

                {/* Parent Address */}
                <div>
                  <label className={labelClass}>Guardian/Parent Address</label>
                  <input ref={setRef('parentAddress')} type="text" value={formData.parentAddress} onChange={handleChange('parentAddress')} onKeyDown={handleKeyDown('parentAddress')} className={inputClass('parentAddress')} placeholder="Parent/Guardian address" />
                </div>

                {/* Parent Mobile */}
                <div>
                  <label className={labelClass}>Parent Mobile Number{requiredStar}</label>
                  <input ref={setRef('parentMobileNumber')} type="tel" value={formData.parentMobileNumber} onChange={handleChange('parentMobileNumber')} onKeyDown={handleKeyDown('parentMobileNumber')} className={inputClass('parentMobileNumber')} placeholder="10-digit mobile number" maxLength="10" />
                  <ErrorMsg field="parentMobileNumber" />
                </div>

                {/* Guardian Mobile */}
                <div>
                  <label className={labelClass}>Guardian Mobile Number</label>
                  <input ref={setRef('guardianMobileNumber')} type="tel" value={formData.guardianMobileNumber} onChange={handleChange('guardianMobileNumber')} onKeyDown={handleKeyDown('guardianMobileNumber')} className={inputClass('guardianMobileNumber')} placeholder="10-digit mobile number" maxLength="10" />
                  <ErrorMsg field="guardianMobileNumber" />
                </div>

                {/* Parent Email */}
                <div>
                  <label className={labelClass}>Parent Email{requiredStar}</label>
                  <input ref={setRef('parentEmail')} type="email" value={formData.parentEmail} onChange={handleChange('parentEmail')} onKeyDown={handleKeyDown('parentEmail')} className={inputClass('parentEmail')} placeholder="parent@email.com" />
                  <ErrorMsg field="parentEmail" />
                </div>
              </div>

              {/* Divider */}
              <div className="w-px bg-avirat-gold/20 my-4 hidden lg:block" />

              {/* Right Column */}
              <div className="flex-1 flex flex-col gap-3">
                <SectionTitle icon={GraduationCap} title="Academic Information" />

                {/* Standard & Course */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className={labelClass}>Standard</label>
                    <select ref={setRef('standard')} value={formData.standard} onChange={handleChange('standard')} onKeyDown={handleKeyDown('standard')} className={selectClass('standard')}>
                      <option value="">Select...</option>
                      {standardOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>Course Enroll{requiredStar}</label>
                    <select ref={setRef('courseEnroll')} value={formData.courseEnroll} onChange={handleChange('courseEnroll')} onKeyDown={handleKeyDown('courseEnroll')} className={selectClass('courseEnroll')}>
                      <option value="">Select...</option>
                      {catalogData.length > 0
                        ? catalogData.map(c => <option key={c.catlogId} value={c.catlogId}>{c.courseName}</option>)
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
                </div>

                {/* Duration & Year */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className={labelClass}>Course Duration</label>
                    <input ref={setRef('courseDuration')} type="text" value={formData.courseDuration} readOnly className={`${inputClass('courseDuration')} bg-gray-50 cursor-not-allowed`} placeholder="Auto-filled from course" />
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>Academic Year</label>
                    <select ref={setRef('academicYear')} value={formData.academicYear} onChange={handleChange('academicYear')} onKeyDown={handleKeyDown('academicYear')} className={selectClass('academicYear')}>
                      <option value="">Select...</option>
                      <option>2024-2025</option>
                      <option>2025-2026</option>
                      <option>2026-2027</option>
                    </select>
                  </div>
                </div>

                {/* Academic Group — only for 11th/12th */}
                {['11th', '12th'].includes(formData.standard) && (
                  <div>
                    <label className={labelClass}>Academic Group</label>
                    <select ref={setRef('academicGroup')} value={formData.academicGroup} onChange={handleChange('academicGroup')} onKeyDown={handleKeyDown('academicGroup')} className={selectClass('academicGroup')}>
                      <option value="">Select...</option>
                      <option>Science</option>
                      <option>Commerce</option>
                      <option>Arts</option>
                    </select>
                  </div>
                )}

                {/* Branch/Stream — only for UG/PG/Diploma */}
                {(formData.standard.startsWith('UG') || formData.standard.startsWith('PG') || formData.standard === 'Diploma') && (
                  <div>
                    <label className={labelClass}>Branch / Stream</label>
                    <input ref={setRef('academicGroup')} type="text" value={formData.academicGroup} onChange={handleChange('academicGroup')} onKeyDown={handleKeyDown('academicGroup')} className={inputClass('academicGroup')} placeholder="e.g. Computer Science, Mechanical" />
                  </div>
                )}

                <SectionTitle icon={BookOpen} title="Admission Details" color="text-avirat-green" />

                {/* Date of Admission */}
                <div>
                  <label className={labelClass}>Date of Admission{requiredStar}</label>
                  <input ref={setRef('dateOfAdmission')} type="date" value={formData.dateOfAdmission} onChange={handleChange('dateOfAdmission')} onKeyDown={handleKeyDown('dateOfAdmission')} className={inputClass('dateOfAdmission')} />
                  <ErrorMsg field="dateOfAdmission" />
                </div>

                {/* School/College */}
                <div>
                  <label className={labelClass}>School/College Name{requiredStar}</label>
                  <input ref={setRef('schoolCollegeName')} type="text" value={formData.schoolCollegeName} onChange={handleChange('schoolCollegeName')} onKeyDown={handleKeyDown('schoolCollegeName')} className={inputClass('schoolCollegeName')} placeholder="School or college name" />
                  <ErrorMsg field="schoolCollegeName" />
                </div>

                {/* Total Fees */}
                <div>
                  <label className={labelClass}>Total Fees (₹){requiredStar}</label>
                  <input ref={setRef('totalFees')} type="number" value={formData.totalFees} readOnly={!!formData.courseEnroll && catalogData.some(c => c.courseName === formData.courseEnroll)} onChange={handleChange('totalFees')} onKeyDown={handleKeyDown('totalFees')} className={`${inputClass('totalFees')} ${formData.courseEnroll && catalogData.some(c => c.courseName === formData.courseEnroll) ? 'bg-gray-50 cursor-not-allowed' : ''}`} placeholder="Auto-filled from course" min="0" step="0.01" />
                  <ErrorMsg field="totalFees" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-avirat-gold/20">
              <motion.button
                onClick={handleClear}
                className="btn-orange flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={saving}
              >
                <Eraser size={16} />
                CLEAR
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="btn-green flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={saving}
              >
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setSuccessModal(null)
              navigate(`/fees?regId=${successModal.regId}`)
            }}
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
              <h2 className="text-2xl font-bold text-avirat-slate mb-2">Registration Successful!</h2>
              <p className="text-avirat-muted text-sm mb-4">
                <span className="font-semibold text-avirat-slate">{successModal.name}</span> has been enrolled.
              </p>
              <div className="bg-avirat-blue/5 rounded-xl py-4 px-6 mb-6">
                <p className="text-xs text-avirat-muted uppercase tracking-wider mb-1">Registration ID</p>
                <p className="text-3xl font-extrabold text-avirat-blue tracking-wide">{successModal.regId}</p>
              </div>
              <p className="text-xs text-avirat-muted mb-5">Redirecting to Fees page to record the initial payment...</p>
              <motion.button
                onClick={() => {
                  setSuccessModal(null)
                  navigate(`/fees?regId=${successModal.regId}`)
                }}
                className="btn-green w-full flex items-center justify-center gap-2 text-base py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PartyPopper size={18} />
                Go to Fees Page
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Registration
