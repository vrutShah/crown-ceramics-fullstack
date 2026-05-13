import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// Attach JWT token for admin routes
api.interceptors.request.use(config => {
  const token = localStorage.getItem('cc_admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getProducts = () => api.get('/products/')
export const getProductBySlug = (slug) => api.get(`/products/${slug}`)
export const getCategories = () => api.get('/products/categories')

export const submitInquiry = (data) => api.post('/inquiry/', data)

export const adminLogin = (data) => api.post('/admin/login', data)
export const getAdminStats = () => api.get('/admin/stats')
export const getAdminInquiries = () => api.get('/admin/inquiries')
export const updateInquiryStatus = (id, status) => api.patch(`/admin/inquiries/${id}/status?status=${status}`)
export const deleteInquiry = (id) => api.delete(`/admin/inquiries/${id}`)
export const getAdminProducts = () => api.get('/admin/products')
export const updateProduct = (id, data) => api.put(`/admin/products/${id}`, data)

export const downloadBrochure = () => window.open('/api/brochure/download', '_blank')

export default api
