import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { downloadBrochure } from '../api/client'
import styles from './Navbar.module.css'

// 1. Import your logo here
import logoImg from '../assets/logo.png' 

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/infrastructure', label: 'Infrastructure' },
  { to: '/inquiry', label: 'Inquiry' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>
        {/* 2. Replace the 'CC' div with an img tag */}
        <div className={styles.logo}>
          <img src={logoImg} alt="Crown Ceramics Logo" style={{ height: '40px', width: 'auto' }} />
        </div>
        <span className={styles.name}>Crown <span>Ceramics</span></span>
      </Link>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l.to}>
            <Link
              to={l.to}
              className={pathname === l.to ? styles.active : ''}
              onClick={() => setMenuOpen(false)}
            >{l.label}</Link>
          </li>
        ))}
      </ul>

      <button className="btn-primary" onClick={downloadBrochure}>
        Download Brochure
      </button>

      <button className={styles.hamburger} onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}