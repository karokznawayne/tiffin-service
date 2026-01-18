'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me').then(res => {
        if (res.ok) return res.json();
        return null;
    }).then(data => {
        if (data) setUser(data);
    });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
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
            {user?.name?.[0] || 'U'}
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{user?.name || 'Loading...'}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{user?.phone || ''}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>{user?.role !== 'USER' ? user?.role.replace('_', ' ') : ''}</p>
          </div>
        </div>

        {/* Admin / Delivery Controls */}
        {['ADMIN', 'MASTER_ADMIN', 'DELIVERY'].includes(user?.role) && (
            <section>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Work & Ops</h3>
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {['ADMIN', 'MASTER_ADMIN'].includes(user?.role) && (
                        <Link href="/admin/dashboard" style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit' }}>
                            <span>Admin Dashboard</span>
                            <span>🔐</span>
                        </Link>
                    )}
                    {(user?.role === 'DELIVERY' || ['ADMIN', 'MASTER_ADMIN'].includes(user?.role)) && (
                        <Link href="/delivery" style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit' }}>
                            <span>Delivery App</span>
                            <span>🚚</span>
                        </Link>
                    )}
                </div>
            </section>
        )}

        <section>
          <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Account</h3>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
             <Link href="/dashboard/profile/referral" style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit' }}>
               <span>Refer & Earn</span>
               <span style={{ color: 'green', fontWeight: 'bold' }}>₹{user?.walletBalance || 0} Off</span>
             </Link>
             <Link href="/dashboard/profile/vacation" style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit' }}>
               <span>Vacation Mode</span>
               <span style={{ color: 'var(--primary-color)' }}>Active</span>
             </Link>
          </div>
        </section>

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
