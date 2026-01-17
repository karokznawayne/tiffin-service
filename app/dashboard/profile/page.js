'use client';

import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear cookie logic would go here (call API to clear cookie)
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.push('/auth/login');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
      </div>

      <div style={{ padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#64748b' }}>
            N
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Naveen Kumar</h2>
            <p style={{ color: 'var(--text-secondary)' }}>+91 98765 43210</p>
          </div>
        </div>

        <section>
          <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Preferences</h3>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <div style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Diet Type</span>
              <span style={{ fontWeight: '500' }}>Vegetarian</span>
            </div>
            <div style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Spice Level</span>
              <span style={{ fontWeight: '500' }}>Medium</span>
            </div>
            <div style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
              <span>Notifications</span>
              <span style={{ color: 'var(--primary-color)' }}>On</span>
            </div>
          </div>
        </section>

        <button onClick={handleLogout} className="btn" style={{ width: '100%', background: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca' }}>
          Log Out
        </button>

      </div>
    </div>
  );
}
