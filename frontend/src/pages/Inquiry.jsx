import { useState } from 'react'
import { submitInquiry, getProducts } from '../api/client'
import { useEffect } from 'react'
import styles from './Inquiry.module.css'

export default function Inquiry() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', product_interest:'', message:'' })
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  useEffect(() => {
    getProducts().then(r => setProducts(r.data))
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitInquiry(form)
      setStatus('success')
      setForm({ name:'', email:'', phone:'', company:'', product_interest:'', message:'' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="section-label">Get in Touch</div>
        <h1 className={styles.title}>Send an Inquiry</h1>
        <p className={styles.subtitle}>Fill in the form below and our team will respond within 24 hours.</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.info}>
          <h3>Contact Details</h3>
          
          <div className={styles.infoItem}>
            <strong>Phone</strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span>
                <small style={{ color: 'var(--gold)', fontSize: '10px', display: 'block', textTransform: 'uppercase' }}>Anand Parekh</small>
                <a href="tel:+919974666341">(+91) 997 4666 341</a>
              </span>
              <span style={{ marginTop: '8px' }}>
                <small style={{ color: 'var(--gold)', fontSize: '10px', display: 'block', textTransform: 'uppercase' }}>Vishal Shah</small>
                <a href="tel:+919825258303">(+91) 982 5258 303</a>
              </span>
            </div>
          </div>

          <div className={styles.infoItem}>
            <strong>Email</strong>
            <a href="mailto:info@crownceramics.in">info@crownceramics.in</a>
          </div>
          
          <div className={styles.infoItem}>
            <strong>Hours</strong>
            <span>Mon–Sat: 9:00am – 6:00pm</span>
          </div>
          
          <div className={styles.infoItem}>
            <strong>Address</strong>
            <span>8/A National Highway, Near Hasanpar Railway Crossing,<br />Wankaner – 363 622, Dist: Rajkot, Gujarat, India</span>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {status === 'success' && (
            <div className={styles.success}>
              ✓ Inquiry submitted successfully! We'll contact you within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div className={styles.error}>
              Something went wrong. Please try again or email us directly.
            </div>
          )}

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" />
            </div>
            <div className={styles.field}>
              <label>Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className={styles.field}>
              <label>Company Name</label>
              <input name="company" value={form.company} onChange={handleChange} placeholder="Your company" />
            </div>
          </div>
          <div className={styles.field}>
            <label>Product of Interest</label>
            <select name="product_interest" value={form.product_interest} onChange={handleChange}>
              <option value="">Select a product (optional)</option>
              {products.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Message *</label>
            <textarea name="message" value={form.message} onChange={handleChange} required
              rows={5} placeholder="Describe your requirement, quantity, specifications…" />
          </div>
          <button type="submit" className="btn-primary" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting…' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}