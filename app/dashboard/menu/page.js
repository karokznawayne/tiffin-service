export default function MenuPage() {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      date: d.getDate(),
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      meal: i % 2 === 0 ? 'Rajma Chawal' : 'Aloo Gobi',
      type: 'Lunch'
    };
  });

  return (
    <div>
      <div className="page-header" style={{ paddingBottom: '1rem' }}>
        <h1 className="page-title">Weekly Menu</h1>
        <p style={{ opacity: 0.8, fontSize: '0.875rem' }}>See what's cooking this week</p>
      </div>

      <div style={{ padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {days.map((item, index) => (
          <div key={index} className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: index === 0 ? 'var(--primary-color)' : '#f1f5f9',
              color: index === 0 ? 'white' : 'var(--text-primary)',
              borderRadius: '0.75rem',
              width: '3.5rem',
              height: '3.5rem',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{item.day}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{item.date}</span>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>{item.meal}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.type}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Includes Roti, Rice, Salad...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
