import { useState, useEffect } from 'react'
import { adminLogin, getAdminStats, getAdminInquiries, updateInquiryStatus, deleteInquiry } from '../api/client'
import styles from './Admin.module.css'

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('cc_admin_token'))
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [stats, setStats] = useState(null)
  const [inquiries, setInquiries] = useState([])
  const [tab, setTab] = useState('inquiries')

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const r = await adminLogin(loginForm)
      localStorage.setItem('cc_admin_token', r.data.token)
      setToken(r.data.token)
      setLoginError('')
    } catch {
      setLoginError('Invalid username or password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('cc_admin_token')
    setToken(null)
  }

  useEffect(() => {
    if (!token) return
    getAdminStats().then(r => setStats(r.data))
    getAdminInquiries().then(r => setInquiries(r.data))
  }, [token])

  const handleStatus = async (id, status) => {
    await updateInquiryStatus(id, status)
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i))
  }

  const handleDelete = async id => {
    if (!confirm('Delete this inquiry?')) return
    await deleteInquiry(id)
    setInquiries(prev => prev.filter(i => i.id !== id))
  }

  if (!token) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <div className={styles.loginLogo}>CC</div>
          <h2 className={styles.loginTitle}>Admin Login</h2>
          <p className={styles.loginSub}>Crown Ceramics Management</p>
          {loginError && <div className={styles.error}>{loginError}</div>}
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              placeholder="Username"
              value={loginForm.username}
              onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
              required
            />
            <button type="submit" className="btn-primary">Login</button>
          </form>
          <p className={styles.hint}>Default: admin / admin123</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className={styles.headerTitle}>Admin Dashboard</div>
          <div className={styles.headerSub}>Crown Ceramics Management Panel</div>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      {stats && (
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{stats.total_inquiries}</div>
            <div className={styles.statLabel}>Total Inquiries</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum} style={{ color: '#E24B4A' }}>{stats.new_inquiries}</div>
            <div className={styles.statLabel}>New (Unread)</div>
          </div>
          <div className={styles.statCard}>
            <div className={stats.total_products ? styles.statNum : styles.statNum} style={{ color: 'var(--gold)' }}>
               {stats.total_products}
            </div>
            <div className={styles.statLabel}>Products Listed</div>
          </div>
        </div>
      )}

      <div className={styles.tabs}>
        <button className={tab === 'inquiries' ? styles.activeTab : ''} onClick={() => setTab('inquiries')}>
          Inquiries ({inquiries.length})
        </button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Product</th>
              <th style={{ width: '250px' }}>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(inq => (
              <tr key={inq.id} className={inq.status === 'new' ? styles.newRow : ''}>
                <td>
                  <div className={styles.nameCell}>{inq.name}</div>
                  {inq.phone && <div className={styles.phone}>{inq.phone}</div>}
                </td>
                <td><a href={`mailto:${inq.email}`}>{inq.email}</a></td>
                <td>{inq.company || '—'}</td>
                <td>{inq.product_interest || '—'}</td>
                
                {/* Displaying the actual message content */}
                <td>
                  <div className={styles.messageScroll}>
                    {inq.message || <span style={{color: '#ccc'}}>No message provided</span>}
                  </div>
                </td>

                <td>{new Date(inq.created_at).toLocaleDateString('en-IN')}</td>
                <td>
                  <select
                    value={inq.status}
                    onChange={e => handleStatus(inq.id, e.target.value)}
                    className={`${styles.statusSelect} ${styles['s_' + inq.status]}`}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(inq.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr><td colSpan={8} className={styles.empty}>No inquiries yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}