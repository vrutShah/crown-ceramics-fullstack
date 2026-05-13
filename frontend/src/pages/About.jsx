import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="section-label">Our Story</div>
        <h1 className={styles.title}>About Crown Ceramics</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.intro}>
          <p>
            Crown Ceramics is one of the biggest refractory manufacturers of Western India.
            Established in 1979, we have been serving the domestic market and exporting to
            countries across the Middle East, Africa, Gulf Countries, Emirates, South America,
            and Europe.
          </p>
          <p>
            We not only follow the Indian Standards of production and testing but also comply
            with ASTM (American Testing Standard) and BSI (British Standards Institution)
            ensuring 100% customer satisfaction.
          </p>
        </div>
        <div className={styles.timeline}>
          {[
            { year: '1979', event: 'Crown Ceramics founded in Wankaner, Gujarat' },
            { year: '1990', event: 'Expanded to international exports — Middle East & Africa' },
            { year: '2000', event: 'ASTM and BSI certification achieved' },
            { year: '2010', event: 'Launched Ceramic Fiber and Insulation product lines' },
            { year: '2020', event: 'Expanded to South America and European markets' },
            { year: '2024', event: 'Serving 30+ countries with 12 product categories' },
          ].map(t => (
            <div key={t.year} className={styles.timelineItem}>
              <div className={styles.timelineYear}>{t.year}</div>
              <div className={styles.timelineDot} />
              <div className={styles.timelineEvent}>{t.event}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
