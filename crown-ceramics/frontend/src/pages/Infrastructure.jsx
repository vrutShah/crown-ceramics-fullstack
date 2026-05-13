export default function Infrastructure() {
  const items = [
    { title: 'Manufacturing Plant', desc: 'State-of-the-art refractory manufacturing facility in Wankaner, Gujarat with modern kilns and mixing equipment.' },
    { title: 'Testing Laboratory', desc: 'In-house quality testing lab equipped to test against ASTM, BSI, and BIS standards before dispatch.' },
    { title: 'Storage & Dispatch', desc: 'Large warehousing capacity ensuring ready stock for quick dispatch to domestic and export customers.' },
    { title: 'R&D Division', desc: 'Dedicated research team developing new formulations and improving existing product lines for evolving industry needs.' },
  ]

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: 'var(--dark)', padding: '5rem 2.5rem 4rem' }}>
        <div className="section-label">Our Facilities</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: '44px', marginTop: '8px' }}>Infrastructure</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', padding: '4rem 2.5rem' }}>
        {items.map(item => (
          <div key={item.title} style={{
            background: '#fff', border: '0.5px solid #E0DDD5', borderRadius: '12px', padding: '2rem'
          }}>
            <div style={{ width: '40px', height: '3px', background: 'var(--gold)', borderRadius: '2px', marginBottom: '1.25rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '10px' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
