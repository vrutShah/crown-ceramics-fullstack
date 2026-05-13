import { useEffect, useState } from 'react'
import { getProducts } from '../api/client'
import styles from './Products.module.css'

export default function Products() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  const categories = ['All', ...new Set(products.map(p => p.category))]

  useEffect(() => {
    getProducts().then(r => {
      setProducts(r.data)
      setLoading(false)
    })
  }, [])

  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter)

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="section-label">Our Range</div>
        <h1 className={styles.title}>Refractory Products</h1>
        <p className={styles.subtitle}>
          High-performance materials manufactured to international standards for industrial applications worldwide.
        </p>
      </div>

      <div className={styles.filters}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loading}>Loading products…</div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(p => (
            <div key={p.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cat}>{p.category}</span>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.desc}>{p.description}</p>
              </div>
              <div className={styles.cardBottom}>
                <span className={styles.tag}>{p.tag}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
