import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, downloadBrochure } from '../api/client'
import styles from './Home.module.css'

const ICONS = {
  'Bricks': '🧱',
  'Castables': '⚗️',
  'Cement Binders': '🔩',
  'Insulation': '🌡️',
  'Steel Plant': '🏭',
}

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(r => setProducts(r.data.slice(0, 8)))
  }, [])

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.badge}>Refractory Manufacturer · Est. 1979</span>
          <h1 className={styles.heroTitle}>
            Built for the<br /><em>Harshest</em><br />Environments
          </h1>
          <p className={styles.heroDesc}>
            Western India's leading manufacturer of high-performance refractory
            materials — trusted across Middle East, Africa, Europe and South America.
          </p>
          <div className={styles.heroBtns}>
            <Link to="/products" className="btn-primary">Explore Products</Link>
            <button className="btn-outline" onClick={downloadBrochure}>Download Brochure</button>
          </div>
        </div>
        <div className={styles.heroStats}>
          {[
            { num: '45+', label: 'Years in operation' },
            { num: '12+', label: 'Product categories' },
            { num: '30+', label: 'Countries served' },
          ].map(s => (
            <div key={s.num} className={styles.statCard}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CERT STRIP */}
      <div className={styles.strip}>
        {['BIS / Indian Standards', 'ASTM Certified', 'BSI Compliant', 'ISO Quality', 'Export Ready'].map(c => (
          <div key={c} className={styles.certItem}>
            <div className={styles.dot} />
            <span>{c}</span>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <div className="section-label">Our Range</div>
            <div className="section-title">Product Categories</div>
          </div>
          <Link to="/products" className={styles.seeAll}>View All →</Link>
        </div>
        <div className={styles.grid}>
          {products.map(p => (
            <Link to="/products" key={p.id} className={styles.card}>
              <div className={styles.cardImg}>
                <span className={styles.cardIcon}>{ICONS[p.category] || '🔥'}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardName}>{p.name}</div>
                <div className={styles.cardTag}>{p.tag}</div>
                <div className={styles.cardArrow}>→</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT BAND */}
      <div className={styles.aboutBand}>
        <div className={styles.aboutContent}>
          <div className="section-label">Our Story</div>
          <h2 className={styles.aboutTitle}>Decades of <em>Precision</em> Manufacturing</h2>
          <p className={styles.aboutText}>
            Crown Ceramics is one of Western India's largest refractory manufacturers.
            Since 1979, we have supplied high-quality materials to domestic and international
            markets, maintaining the highest standards of quality control.
          </p>
          <ul className={styles.aboutList}>
            {[
              'Exporting to Middle-East, Africa, Gulf, Europe & South America',
              'ASTM & BSI compliant testing and production',
              'Custom formulations for specialized industry requirements',
              'Based in Wankaner, Rajkot — Gujarat, India',
            ].map(item => <li key={item}>{item}</li>)}
          </ul>
          <Link to="/about" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
            Read Our Story
          </Link>
        </div>
        <div className={styles.aboutVisual}>
          <div className={styles.emblem}>
            <div className={styles.emblemYear}>1979</div>
            <div className={styles.emblemSince}>Since</div>
          </div>
        </div>
      </div>

      {/* CONTACT BAR */}
      <div className={styles.contactBar}>
        <div className={styles.contactText}>Ready to place an inquiry?</div>
        <div className={styles.contactDetails}>
          <div className={styles.contactItem}>
            <span>📞</span>
            <div>
              <div className={styles.contactInfo}>(+91) 997 4666 341</div>
              <div className={styles.contactInfo}>(+91) 982 5258 303</div>
              <div className={styles.contactSub}>Mon–Sat, 9am–6pm</div>
            </div>
          </div>
          <div className={styles.contactItem}>
            <span>✉️</span>
            <div>
              <div className={styles.contactInfo}>info@crownceramics.in</div>
              <div className={styles.contactSub}>Response within 24 hours</div>
            </div>
          </div>
        </div>
        <Link to="/inquiry" className="btn-dark">Send Inquiry</Link>
      </div>
    </div>
  )
}
