import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.brand}>
          <div className={styles.logo}>CC</div>
          <div>
            <p className={styles.name}>Crown Ceramics</p>
            <p className={styles.tagline}>Manufacturing excellence since 1979</p>
          </div>
        </div>
        <p className={styles.address}>
          8/A National Highway, Near Hasanpar Railway Crossing,<br />
          Wankaner – 363 622, Dist: Rajkot, Gujarat, India
        </p>
      </div>

      <div className={styles.cols}>
        <div>
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/infrastructure">Infrastructure</Link></li>
            <li><Link to="/inquiry">Inquiry</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Products</h4>
          <ul>
            <li><Link to="/products">High Alumina Bricks</Link></li>
            <li><Link to="/products">Acid Proof Bricks</Link></li>
            <li><Link to="/products">Castables</Link></li>
            <li><Link to="/products">Insulation Bricks</Link></li>
            <li><Link to="/products">Ceramic Fiber Blankets</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+919974666341">(+91) 997 4666 341</a></li>
            <li><a href="tel:+919825258303">(+91) 982 5258 303</a></li>
            <li><a href="mailto:info@crownceramics.in">info@crownceramics.in</a></li>
            <li>Mon–Sat: 9:00am – 6:00pm</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>Developed By <strong><a href="https://github.com/vrutShah" target="_blank">Vrut Shah</a></strong></span>
        <span>© {new Date().getFullYear()} Crown Ceramics. All rights reserved.</span>
        <Link to="/admin" className={styles.adminLink}>Admin</Link>
      </div>
    </footer>
  )
}
