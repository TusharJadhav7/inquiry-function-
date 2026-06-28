import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Eraser, Banknote, CreditCard, Receipt, Send, Mail, Phone, ArrowLeft, Plus, Loader2,
  CheckCircle2, AlertCircle, IndianRupee, Download, Printer, ChevronLeft, ChevronRight, Eye
} from 'lucide-react'
import { useSidebar } from '../components/Sidebar'
import { CloseButton } from '../components/Button'
import AnimatedPage from '../components/AnimatedPage'
import Modal from '../components/Modal'
import studentAvatar from '../assets/studentAvatar.png'
import { searchFeesStudents, getStudentById, getInstallmentDetails, addTransaction,getTransactions,getReceipt } from '../api'

const Fees = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const regIdFromUrl = searchParams.get('regId') || ''
  const { isOpen } = useSidebar()

  const [filters, setFilters] = useState({ regId: regIdFromUrl, firstName: '', lastName: '', academicYear: '' })
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const [selectedSummary, setSelectedSummary] = useState(null)
  const [installmentData, setInstallmentData] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)

  // Payment — now per-installment
  const [payInstallment, setPayInstallment] = useState(null)
  const [showPayModal, setShowPayModal] = useState(false)
  const [payForm, setPayForm] = useState({ amount: '', verifyBy: '' })
  const [payLoading, setPayLoading] = useState(false)
  const [payError, setPayError] = useState('')								  

  const [invoiceType, setInvoiceType] = useState('email')
  const [invoiceValue, setInvoiceValue] = useState('')
  const [toast, setToast] = useState(null)

  useEffect(() => { if (regIdFromUrl) handleSearch() }, []) // eslint-disable-line

  const handleSearch = async (pg = 0) => {
    setLoading(true); setHasSearched(true)
    try {
      const d = await searchFeesStudents({ ...filters, pageNumber: pg, pageSize: 8 })
      setResults(d.content || []); setTotalPages(d.totalPages || 0); setTotalElements(d.totalElements || 0); setPage(pg)
    } catch { setResults([]); fire('error', 'Search failed') }
    finally { setLoading(false) }
  }

  const handleClear = () => { setFilters({ regId: '', firstName: '', lastName: '', academicYear: '' }); setResults([]); setHasSearched(false) }

  const handleViewPay = async (s) => {
    setSelectedSummary(s); setInstallmentData(null); setProfileLoading(true); setShowProfile(true)
    try {
      console.log("s1 "+s.feesDto.feesId);
      console.log("s2 "+s.regId);
      console.log("s3 Object "+s);
      
      if (s.feesDto.feesId) {
        console.log("fees id "+s.feesDto.feesId);
        const data = await getInstallmentDetails(s.feesDto.feesId);
        setInstallmentData(data)
        try { const full = await getStudentById(s.regId); if (full.email) setInvoiceValue(full.email) } catch {}
      }
    } catch { fire('error', 'Could not load installment details') }
    finally { setProfileLoading(false) }
  }

  const openPayForInstallment = (inst) => {
    setPayInstallment(inst); setPayForm({ amount: '', verifyBy: '' }); setPayError(''); setShowPayModal(true)
  }

  const handleSavePayment = async () => {
    const amt = parseFloat(payForm.amount)
	setPayError('')
    if (!payInstallment || !amt || amt <= 0 || !payForm.verifyBy.trim()) {
      setPayError('Please fill amount and verified-by fields')
      return
    }
    // Frontend guard: check against installment remaining
    const remaining = payInstallment.intlmtPending ?? payInstallment.pending ?? (payInstallment.installmentAmount - (payInstallment.paidAmount || 0))
    if (amt > remaining) {
      setPayError(`Amount ₹${amt.toLocaleString()} exceeds remaining ₹${remaining.toLocaleString()}`)
      return
    }
    setPayLoading(true)
    try {
      await addTransaction(payInstallment.installmentId, {
        trnsDate: new Date().toISOString().split('T')[0],
        amountPaid: amt,
        verifyBy: payForm.verifyBy.trim()
      })
      fire('success', `₹${amt.toLocaleString()} paid for Installment ${payInstallment.installNumber}`)
      setShowPayModal(false)
      // Auto-refresh installment data (Fix E)
      const feesId = selectedSummary?.feesDto?.feesId || selectedSummary?.feesId
      if (feesId) {
        const refreshed = await getInstallmentDetails(feesId)
        setInstallmentData(refreshed)
        setSelectedSummary(p => ({
          ...p,
          paidFees: refreshed.paidFees,
          remainingFees: refreshed.pendingFees,
          totalFees: refreshed.totalFees,
          feesDto: { ...p?.feesDto, feesId }
        }))
      }
      handleSearch(page)
    }  catch (e) {
      setPayError(e.message || 'Payment failed')
    } 
    finally { setPayLoading(false) }
  }

  const fire = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 4500) }
  const ic = "input-field text-sm"

  return (
    <div className="min-h-screen bg-avirat-yellow flex">
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-[88px]' : 'ml-0'} p-4 sm:p-6 relative`}>
        <CloseButton onClick={() => navigate('/home')} />
        <AnimatePresence>{toast && (
          <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium ${toast.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}{toast.msg}
          </motion.div>
        )}</AnimatePresence>

        <AnimatedPage>
          <motion.div className="flex items-center gap-3 mb-6" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="w-10 h-10 rounded-xl bg-avirat-green/10 flex items-center justify-center"><Banknote size={22} className="text-avirat-green" /></div>
            <div><h1 className="text-2xl font-bold text-avirat-slate">Fee Management</h1><p className="text-xs text-avirat-muted">Search students and manage fee installments</p></div>
          </motion.div>

          {/* Search */}
          <motion.div className="card-glass p-5 mb-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <div className="flex items-end gap-4 flex-wrap">
              <div className="w-40"><label className="form-label">Reg ID</label>
                <div className="search-wrapper"><Search size={14} className="search-icon" />
                  <input type="text" value={filters.regId} onChange={e => setFilters(p => ({ ...p, regId: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handleSearch()} className="search-input text-sm" placeholder="   Reg-1" />
                </div></div>
              <div className="flex-1 min-w-[140px]"><label className="form-label">First Name</label>
                <input type="text" value={filters.firstName} onChange={e => setFilters(p => ({ ...p, firstName: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handleSearch()} className={ic} placeholder="First name" /></div>
              <div className="flex-1 min-w-[140px]"><label className="form-label">Last Name</label>
                <input type="text" value={filters.lastName} onChange={e => setFilters(p => ({ ...p, lastName: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handleSearch()} className={ic} placeholder="Last name" /></div>
              <div className="w-40"><label className="form-label">Academic Year</label>
                <select value={filters.academicYear} onChange={e => setFilters(p => ({ ...p, academicYear: e.target.value }))} className="form-select text-sm">
                  <option value="">All Years</option><option>2024-2025</option><option>2025-2026</option><option>2026-2027</option>
                </select></div>
              <div className="flex gap-2">
                <motion.button onClick={handleClear} className="btn-outline flex items-center gap-1.5 text-sm px-4" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><Eraser size={14} /> Clear</motion.button>
                <motion.button onClick={() => handleSearch(0)} className="btn-primary flex items-center gap-1.5 text-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled={loading}>
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}{loading ? 'Searching...' : 'Search'}</motion.button>
              </div>
            </div>
          </motion.div>

          {/* Results — Fix A: Status column instead of per-installment status, View & Pay button */}
          <motion.div className="card-glass p-0 overflow-hidden" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="px-5 py-3 border-b border-avirat-gold/10 flex items-center justify-between">
              <span className="text-sm font-semibold text-avirat-slate flex items-center gap-2"><Receipt size={16} className="text-avirat-green" /> Fee Records</span>
              {hasSearched && totalElements > 0 && <span className="badge badge-green">{totalElements} found</span>}
            </div>
            <div className="overflow-x-auto" style={{ minHeight: '300px' }}>
              <table className="table-premium"><thead><tr>
                <th>Reg ID</th><th>Name</th><th>Course</th><th>Total Fees</th><th>Paid</th><th>Remaining</th><th>Status</th><th>Action</th>
              </tr></thead><tbody>
                {loading ? (
                  <tr><td colSpan="8" className="text-center py-16"><Loader2 size={32} className="animate-spin text-avirat-blue mx-auto mb-2" /><p className="text-avirat-muted text-sm">Searching...</p></td></tr>
                ) : !hasSearched ? (
                  <tr><td colSpan="8" className="text-center py-16"><Search size={28} className="text-avirat-muted mx-auto mb-2" /><p className="text-avirat-muted text-sm">Search for a student</p></td></tr>
                ) : results.length === 0 ? (
                  <tr><td colSpan="8" className="text-center py-16"><AlertCircle size={28} className="text-avirat-muted mx-auto mb-2" /><p className="text-avirat-muted text-sm">No students found</p></td></tr>
                ) : results.map((s, i) => {
                  const tf = s.totalFees || 0, pf = s.feesDto.paidFees || 0, rem = s.remainingFees ?? (tf - pf), paid = rem <= 0
                  return (
                    <motion.tr key={s.regId} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      <td><span className="font-semibold text-avirat-blue">{s.regId}</span></td>
                      <td className="font-medium">{s.studentName}</td>
                      <td><span className="badge badge-blue">{s.courseEnroll}</span></td>
                      <td className="font-semibold">₹{tf.toLocaleString()}</td>
                      <td className={`font-semibold ${paid ? 'text-avirat-green' : ''}`}>₹{pf.toLocaleString()}</td>
                      <td className={`font-semibold ${rem > 0 ? 'text-avirat-red' : 'text-avirat-green'}`}>₹{rem.toLocaleString()}</td>
                      <td>{paid ? <span className="badge badge-green flex items-center gap-1 w-fit"><CheckCircle2 size={12} /> Paid</span>
                        : <span className="badge badge-red flex items-center gap-1 w-fit"><AlertCircle size={12} /> Pending</span>}</td>
                      <td><motion.button onClick={() => handleViewPay(s)} className="btn-orange text-xs px-3 py-1.5 flex items-center gap-1"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Eye size={13} /> View & Pay</motion.button></td>
                    </motion.tr>
                  )
                })}
              </tbody></table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-avirat-gold/10">
                <span className="text-xs text-avirat-muted">Page {page + 1} of {totalPages}</span>
                <div className="flex gap-1">
                  <button onClick={() => handleSearch(Math.max(0, page - 1))} disabled={page === 0} className="pagination-btn"><ChevronLeft size={16} /></button>
                  {[...Array(totalPages)].map((_, i) => <button key={i} onClick={() => handleSearch(i)} className={`pagination-btn ${page === i ? 'active' : ''}`}>{i + 1}</button>)}
                  <button onClick={() => handleSearch(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="pagination-btn"><ChevronRight size={16} /></button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatedPage>
      </div>

      {/* ===== PROFILE + INSTALLMENT DETAIL MODAL ===== */}
      <Modal isOpen={showProfile} onClose={() => setShowProfile(false)} title="Fee Details" size="xl">
        {profileLoading ? (
          <div className="flex flex-col items-center py-16 gap-3"><Loader2 size={32} className="animate-spin text-avirat-blue" /><p className="text-avirat-muted text-sm">Loading...</p></div>
        ) : (installmentData || selectedSummary) && (() => {
          const tf = installmentData?.totalFees || selectedSummary?.totalFees || 0
          const pf = installmentData?.paidFees || selectedSummary?.paidFees || 0
          const rem = installmentData?.pendingFees ?? selectedSummary?.remainingFees ?? (tf - pf)
          return (
            <div className="space-y-5">
              {/* Student header */}
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-avirat-warm shadow-md mb-2"><img src={studentAvatar} alt="Student" className="w-full h-full object-cover" /></div>
                  <span className="badge badge-blue text-xs">{installmentData?.regId || selectedSummary?.regId}</span>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3 text-sm">
                  <div className="info-row"><span className="info-label">Name:</span><span className="info-value">{installmentData?.stdFullName || selectedSummary?.studentName}</span></div>
                  <div className="info-row"><span className="info-label">Course:</span><span className="info-value">{installmentData?.courseName || selectedSummary?.courseEnroll}</span></div>
                  <div className="info-row"><span className="info-label">Standard:</span><span className="info-value">{installmentData?.standard || '—'}</span></div>
                  <div className="info-row"><span className="info-label">Ac. Year:</span><span className="info-value">{installmentData?.academicYear || selectedSummary?.academicYear || '—'}</span></div>
                </div>
              </div>

              {/* Installment Table — Fix A: no per-installment status column, Pay button per row */}
              <div className="border border-avirat-gold/20 rounded-xl overflow-hidden">
                <table className="table-premium"><thead><tr>
                  <th>SR.</th><th>Installment</th><th>Total</th><th>Paid</th><th>Remaining</th><th>Action</th>
                </tr></thead><tbody>
                  {installmentData?.installmentDTOS?.length > 0 ? installmentData.installmentDTOS.map((inst, i) => {
                    const instPaid = (inst.intlmtPending || 0) <= 0
                    return (
                      <tr key={inst.installmentId || i}>
                        <td className="font-medium">{inst.installNumber}</td>
                        <td className="font-medium">Installment {inst.installNumber}</td>
                        <td>₹{(inst.intlmtTotalFees || 0).toLocaleString()}</td>
                        <td className={instPaid ? 'text-avirat-green font-semibold' : 'font-semibold'}>₹{(inst.intlmtPaidFees || 0).toLocaleString()}</td>
                        <td className={`font-semibold ${(inst.intlmtPending || 0) > 0 ? 'text-avirat-red' : 'text-avirat-green'}`}>₹{(inst.intlmtPending || 0).toLocaleString()}</td>
                        <td>{instPaid
                          ? <span className="badge badge-green text-xs"><CheckCircle2 size={12} /> Paid</span>
                          : <button onClick={() => openPayForInstallment(inst)} className="btn-orange text-xs px-2.5 py-1 flex items-center gap-1"><Plus size={12} /> Pay</button>
                        }</td>
                      </tr>
                    )
                  }) : (
                    <tr><td colSpan="6" className="text-center py-8"><AlertCircle size={20} className="text-avirat-muted mx-auto mb-1" /><p className="text-avirat-muted text-sm">No installments generated</p></td></tr>
                  )}
                </tbody></table>
              </div>

              {/* Fee overview */}
              <div className="flex justify-between items-center pt-3 border-t border-avirat-gold/20">
                <div className="text-base"><span className="font-semibold text-avirat-slate">Total Paid: </span><span className="text-avirat-green font-bold">₹{pf.toLocaleString()}</span><span className="text-avirat-muted"> / ₹{tf.toLocaleString()}</span></div>
                <div className="text-base"><span className="font-semibold text-avirat-slate">Remaining: </span><span className={rem > 0 ? 'text-avirat-red font-bold' : 'text-avirat-green font-bold'}>₹{rem.toLocaleString()}</span></div>
              </div>

              {/* Invoice */}
              <div className="pt-4 border-t border-avirat-gold/20">
                <div className="flex items-end gap-4">
                  <div><label className="form-label">Send Invoice via</label>
                    <select value={invoiceType} onChange={e => setInvoiceType(e.target.value)} className="form-select text-sm w-32"><option value="email">Email</option><option value="mobile">Mobile</option></select></div>
                  <div className="flex-1"><label className="form-label">{invoiceType === 'email' ? 'Email ID' : 'Mobile No.'}</label>
                    <input className={ic} value={invoiceValue} onChange={e => setInvoiceValue(e.target.value)} placeholder={invoiceType === 'email' ? 'Enter email' : 'Enter mobile'} /></div>
                  <motion.button className="btn-orange flex items-center gap-1.5 text-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => invoiceValue && fire('success', `Invoice sent to ${invoiceValue}`)}><Send size={14} /> Send</motion.button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex gap-2">
                  <motion.button className="btn-green flex items-center gap-1.5 text-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => getReceipt(selectedSummary.feesDto.feesId)}><Download size={14} /> Download</motion.button>
                  <motion.button className="btn-outline flex items-center gap-1.5 text-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => window.print()}><Printer size={14} /> Print</motion.button>
                </div>
                <motion.button onClick={() => setShowProfile(false)} className="btn-primary flex items-center gap-1.5" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><ArrowLeft size={16} /> Go Back</motion.button>
              </div>
            </div>
          )
        })()}
      </Modal>

      {/* ===== PAYMENT MODAL — Fix B: verifyBy field, Fix F: uses POST /transaction/gen/{installmentId} ===== */}
      <Modal isOpen={showPayModal} onClose={() => setShowPayModal(false)} title="Record Payment" size="sm">
        {payInstallment && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-avirat-warm/50">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-avirat-muted">Reg ID: </span><span className="font-semibold text-avirat-blue">{selectedSummary?.regId}</span></div>
                <div><span className="text-avirat-muted">Name: </span><span className="font-semibold">{installmentData?.stdFullName || selectedSummary?.studentName}</span></div>
                <div><span className="text-avirat-muted">Installment: </span><span className="font-semibold">#{payInstallment.installNumber}</span></div>
                <div><span className="text-avirat-muted">Inst. Total: </span><span className="font-semibold">₹{(payInstallment.intlmtTotalFees || 0).toLocaleString()}</span></div>
              </div>
              <div className="mt-2 pt-2 border-t border-avirat-gold/20">
                <span className="text-avirat-muted text-sm">Inst. Remaining: </span>
                <span className="font-bold text-avirat-red text-lg">₹{(payInstallment.intlmtPending || 0).toLocaleString()}</span>
              </div>
            </div>
			{/* Inline error inside modal */}
            {payError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5 font-medium flex items-center gap-2">
                <span className="text-red-500 text-base">⚠</span> {payError}
              </div>
            )}
            <div><label className="form-label flex items-center gap-1.5"><IndianRupee size={14} className="text-avirat-blue" /> Payment Amount (₹)</label>
              <input type="number" className={ic} placeholder="Enter amount" value={payForm.amount} min="1" step="0.01"
                max={payInstallment.intlmtPending || 0} onChange={e => setPayForm(p => ({ ...p, amount: e.target.value }))} /></div>
            <div><label className="form-label flex items-center gap-1.5">👤 Verified By <span className="text-red-500">*</span></label>
              <input type="text" className={ic} placeholder="Person collecting fees (e.g. Receptionist name)"
                value={payForm.verifyBy} onChange={e => setPayForm(p => ({ ...p, verifyBy: e.target.value }))} /></div>
            <div className="flex justify-end gap-3 pt-3 border-t border-avirat-gold/20">
              <motion.button onClick={() => setShowPayModal(false)} className="btn-outline flex items-center gap-1.5 text-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>Cancel</motion.button>
              <motion.button onClick={handleSavePayment} className="btn-green flex items-center gap-1.5 text-sm"
                disabled={payLoading || !payForm.amount || parseFloat(payForm.amount) <= 0 || !payForm.verifyBy.trim()}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                {payLoading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                {payLoading ? 'Processing...' : 'Save Payment'}
              </motion.button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Fees
