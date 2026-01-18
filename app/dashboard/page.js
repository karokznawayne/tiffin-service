'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/preferences')
        .then(res => res.json())
        .then(data => {
            setPreferences(data);
            setLoading(false);
        });
  }, []);

  const savePreference = async (type) => {
      await fetch('/api/user/preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dietType: type })
      });
      setPreferences({ dietType: type });
      alert(`Welcome aboard! We've customized your menu to ${type}.`);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your kitchen...</div>;

  // Onboarding Screen if no preference set
  if (!preferences?.dietType) {
      return (
        <div style={{ minHeight: '100vh', padding: '2rem', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Welcome! 👋</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>To get started, tell us what you love to eat.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button onClick={() => savePreference('VEG')} style={{ padding: '1.5rem', textAlign: 'left', border: '1px solid #ddd', borderRadius: '1rem', background: '#f9f9f9', cursor: 'pointer', transition: '0.2s', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <div style={{ fontSize: '2rem' }}>🥦</div>
                   <div>
                       <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Pure Veg</div>
                       <div style={{ fontSize: '0.875rem', color: '#666' }}>Homestyle veggies, dal, and roti.</div>
                   </div>
                </button>

                <button onClick={() => savePreference('NON_VEG')} style={{ padding: '1.5rem', textAlign: 'left', border: '1px solid #ddd', borderRadius: '1rem', background: '#f9f9f9', cursor: 'pointer', transition: '0.2s', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <div style={{ fontSize: '2rem' }}>🍗</div>
                   <div>
                       <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Non-Veg</div>
                       <div style={{ fontSize: '0.875rem', color: '#666' }}>Chicken & Egg specials + Veg meals.</div>
                   </div>
                </button>

                <button onClick={() => savePreference('BOTH')} style={{ padding: '1.5rem', textAlign: 'left', border: '1px solid #ddd', borderRadius: '1rem', background: '#f9f9f9', cursor: 'pointer', transition: '0.2s', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <div style={{ fontSize: '2rem' }}>🥘</div>
                   <div>
                       <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Both (Combo)</div>
                       <div style={{ fontSize: '0.875rem', color: '#666' }}>Veg on weekdays, Non-Veg on weekends.</div>
                   </div>
                </button>
            </div>
        </div>
      );
  }

  return (
    <div>
      <header className="page-header">
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>{currentDate}</p>
        <h1 className="page-title">Good Morning</h1>
        <span className="text-xs px-2 py-1 bg-white/20 rounded-full">{preferences.dietType.replace('_', ' ')} MENU</span>
      </header>

      <div style={{ padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Status Card */}
        <div className="card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Today's Delivery</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></div>
            <p style={{ color: 'var(--text-secondary)' }}>Preparing your lunch ({preferences.dietType})</p>
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
        <Link href="/dashboard/feedback" className="card" style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
           <span style={{ fontSize: '1.5rem' }}>⭐</span>
           <div>
              <strong>Rate Yesterday's Meal</strong>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Help us improve &rarr;</p>
           </div>
        </Link>

        {/* Action Banner */}
        <div className="card" style={{ background: 'linear-gradient(to right, #0f766e, #0d9488)', color: 'white', border: 'none' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Subscription Active</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '1rem' }}>Your monthly plan expires in 12 days.</p>
          <button onClick={() => router.push('/dashboard/subscription')} style={{ background: 'white', color: 'var(--primary-color)', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer' }}>Manage Plan</button>
        </div>

      </div>
    </div>
  );
}
