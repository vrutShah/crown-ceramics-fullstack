export default function Contact() {
  return (
    <div style={{ minHeight: '100vh', padding: '5rem 2.5rem' }}>
      <div className="section-label">Find Us</div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '40px', marginBottom: '2.5rem' }}>Contact Us</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', maxWidth: '860px' }}>
        <div>
           {[
            { label: 'Owner', value: 'Anand Parekh' },
            { label: 'Phone', value: '(+91) 99746 66341', href: 'tel:+919974666341' },
            { label: 'General Manager', value: 'Vishal Shah' },
            { label: 'Phone', value: '(+91) 98252 58303', href: 'tel:+919825258303' },
            { label: 'Email', value: 'info@crownceramics.in', href: 'mailto:info@crownceramics.in' },
            { label: 'Hours', value: 'Mon–Sat: 9:00am – 6:00pm' },
            { label: 'Address', value: '8/A National Highway, Near Hasanpar Railway Crossing, Wankaner – 363 622, Dist: Rajkot, Gujarat, India' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '11px', color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
                {item.label}
              </div>
              {item.href
                ? <a href={item.href} style={{ fontSize: '15px', color: '#555', textDecoration: 'none' }}>{item.value}</a>
                : <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>{item.value}</p>
              }
            </div>
          ))}
        </div>
       <div style={{ background: 'var(--charcoal)', borderRadius: '12px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', lineHeight: '1.7' }}>
    📍 Wankaner, Gujarat<br />
    <br />
    {/* Updated with your specific Crown Ceramics location link */}
    <a 
      href="https://maps.google.com/?cid=18302770675126684403"
      target="_blank" 
      rel="noreferrer"
      style={{ color: 'var(--gold)', fontSize: '13px', textDecoration: 'none' }}
    >
      View on Google Maps →
    </a>
  </p>
</div>
      </div>
    </div>
  )
}
