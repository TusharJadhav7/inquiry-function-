// ============================================================
// Centralized API utility — Avirat Academy
// Backend: Spring Boot on localhost:8090
// ============================================================

const API_BASE = 'http://localhost:8091';
import axios from "axios";

// --------------- helpers ---------------

async function request(method, path, body = null) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);

  // DELETE / POST that returns plain text
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Request failed (${res.status})`);
  }
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

// ============================================================
//  REGISTRATION  /registration
// ============================================================

/** POST /registration — register a new student */
export const registerStudent = (data) =>
  request('POST', '/registration', data);

/** GET /registration — all students */
export const getAllStudents = () =>
  request('GET', '/registration/search');

/** GET /registration/{regId} — single student */
export const getStudentById = (regId) =>
  request('GET', `/registration/${encodeURIComponent(regId)}`);

/** GET /registration/search — paginated multi-param search */
export const searchStudents = (params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.append(k, v);
  });
  return request('GET', `/registration/search?${qs.toString()}`);
};

/** PATCH /registration/update-student/{regId} — partial update */
export const updateStudent = (regId, data) =>
  request('PATCH', `/registration/update-student/${encodeURIComponent(regId)}`, data);

/** DELETE /registration/delete-student/{regId} */
export const deleteStudent = (regId) =>
  request('DELETE', `/registration/delete-student/${encodeURIComponent(regId)}`);

// ============================================================
//  FEES (Legacy — replaced by /transaction endpoints)
// ============================================================

// export const payFees = (regId, paidAmount) =>
//   request('PUT', `/registration/${encodeURIComponent(regId)}/fees`, { paidAmount });
// export const resetFees = (regId) =>
//   request('DELETE', `/registration/${encodeURIComponent(regId)}/fees/reset`);

/** GET /fees/search — paginated fees search by name, regId, academicYear */
export const searchFeesStudents = (params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.append(k, v);
  });
  return request('GET', `/fees/search?${qs.toString()}`);
};

/** GET /installment/search/{feesId} — get installment breakdown for a student */
export const getInstallmentDetails = (feesId) =>
  request('GET', `/installment/search/${feesId}`);

/** POST /transaction/gen/{installmentId} — record a fee payment against an installment */
export const addTransaction = (installmentId, data) =>
  request('POST', `/transaction/gen/${installmentId}`, data);

/** GET /transaction/{installmentId} — get transaction history for an installment */
export const getTransactions = (installmentId) =>
  request('GET', `/transaction/${installmentId}`);

// ============================================================
//  CATALOG  /catalog
// ============================================================

/** POST /catalog — add a new course */
export const addCourse = (data) =>
  request('POST', '/catalog', data);

/** PUT /catalog/{catalogId} — update existing course */
export const updateCourse = (catalogId, data) =>
  request('PUT', `/catalog/${encodeURIComponent(catalogId)}`, data);

/** GET /catalog/all — all courses (unpaginated) */
export const getAllCourses = () =>
  request('GET', '/catalog/all');

/** GET /catalog — paginated courses */
export const getCoursesPaginated = (pageNumber = 0, pageSize = 10) =>
  request('GET', `/catalog?pageNumber=${pageNumber}&pageSize=${pageSize}`);

/** GET /catalog/names — just course name strings */
export const getCourseNames = () =>
  request('GET', '/catalog/names');

/** DELETE /catalog/delete-course/{catalogId} */
export const deleteCourse = (catalogId) =>
  request('DELETE', `/catalog/delete-course/${encodeURIComponent(catalogId)}`);

// ============================================================
//  INQUIEY  / inquiry
// ============================================================
/** POST /Inquiry — inquiry a new student */
export const saveInquiry = (data) =>
  request('POST', '/inquiry', data);

/** GET /registration — all students */
export const getAllInquiry = () =>
  request('GET', '/inquiry');

/** GET /registration/{regId} — single student */
export const getStudentByinquiryId = (inquiryId) =>
  request('GET', `/inquiry/${encodeURIComponent(inquiryId)}`);

/** GET /inquiry/search — paginated multi-param search */
export const searchStudentInquiry = (params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.append(k, v);
  });
  return request('GET', `/inquiry/search?${qs.toString()}`);
};

/** DELETE /inquiry/{inquiryId} — delete an inquiry record */
export const deleteInquiry = (inquiryId) =>
  request('DELETE', `/inquiry/delete-inquiry/${encodeURIComponent(inquiryId)}`);

/////// Receipt
/** GET /receipt/pdf/{feesId} — get receipt for a student */
// export const getReceipt = (feesId) =>
//   request('GET', `/receipt/pdf/${feesId}`);


/////////////////
// api.js mein


export const getReceipt = async (feesId) => {
  try {
    const response = await axios.get(
      `http://localhost:8091/receipt/pdf/${feesId}`, // ← apna actual endpoint daalo
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `receipt-${feesId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error downloading receipt:", error);
  }
};