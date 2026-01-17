'use client';
export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div>
      <header className="page-header">
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>{currentDate}</p>
        <h1 className="page-title">Good Morning, Guest</h1>
      </header>

      <div style={{ padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Status Card */}
        <div className="card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Today's Delivery</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></div>
            <p style={{ color: 'var(--text-secondary)' }}>Preparing your lunch</p>
          </div>
        </div>

        {/* Meal Preview */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>On the Menu</h2>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ height: '150px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              Meal Image
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontWeight: '600' }}>Paneer Butter Masala</h3>
                <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}>Veg</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>With Jeera Rice, Dal Fry, and 3 Roti.</p>
            </div>
          </div>
        </div>

        {/* Nutri-Track Widget */}
        <div className="card" style={{ background: 'white' }}>
           <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>💪 Nutri-Track</h3>
           <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>540</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Kcal</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>22g</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Protein</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>60g</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Carbs</span>
              </div>
           </div>
           <p style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '0.5rem', color: '#64748b' }}>Based on today's menu</p>
        </div>

        {/* Feedback Link */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => alert('Feedback modal to be implemented')}>
           <span style={{ fontSize: '1.5rem' }}>⭐</span>
           <div>
              <strong>Rate Yesterday's Meal</strong>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Help us improve &rarr;</p>
           </div>
        </div>

        {/* Action Banner */}
        <div className="card" style={{ background: 'linear-gradient(to right, #0f766e, #0d9488)', color: 'white', border: 'none' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Subscription Active</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '1rem' }}>Your monthly plan expires in 12 days.</p>
          <button style={{ background: 'white', color: 'var(--primary-color)', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer' }}>Manage Plan</button>
        </div>

      </div>
    </div>
  );
}
