'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('MONTHLY');
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    fetch('/api/user/preferences').then(res => res.json()).then(data => setPreferences(data));
  }, []);

  const allPlans = [
    {
       id: 'VEG',
       title: 'Pure Veg Delight',
       desc: 'Home-style vegetarian meals with roti, rice, dal, and sabzi.',
       price: { WEEKLY: 800, MONTHLY: 3000 },
       color: 'bg-green-50 border-green-200'
    },
    {
       id: 'NON_VEG',
       title: 'Non-Veg Feast',
       desc: 'Includes chicken or egg dishes 3 times a week + veg meals.',
       price: { WEEKLY: 1100, MONTHLY: 4000 },
       color: 'bg-red-50 border-red-200'
    },
    {
       id: 'BOTH',
       title: 'Flexi Combo',
       desc: 'Best of both worlds. Veg on weekdays, Non-veg on weekends.',
       price: { WEEKLY: 950, MONTHLY: 3500 },
       color: 'bg-orange-50 border-orange-200'
    }
  ];

  // Filter plans based on preference
  const plans = allPlans.filter(p => {
      if (!preferences?.dietType) return true; // Show all if no pref (shouldn't happen due to onboarding)
      return p.id === preferences.dietType;
  });

  const handleSubscribe = (planId) => {
    alert(`Starting ${selectedPlan} subscription for ${planId}. Redirecting to Payment...`);
    setTimeout(() => router.push('/dashboard'), 2000);
  };

  if (!preferences) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading plans...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'white', paddingBottom: '5rem' }}>
      <div style={{ padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Choose Your Plan</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}> curated for your <strong>{preferences.dietType.replace('_', ' ')}</strong> preference.</p>

        <div style={{ display: 'flex', background: '#f3f4f6', padding: '0.25rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
            <button 
                style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem', border: 'none', cursor: 'pointer', background: selectedPlan === 'WEEKLY' ? 'white' : 'transparent', boxShadow: selectedPlan === 'WEEKLY' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none', color: selectedPlan === 'WEEKLY' ? 'black' : '#6b7280' }}
                onClick={() => setSelectedPlan('WEEKLY')}
            >
                Weekly
            </button>
            <button 
                style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem', border: 'none', cursor: 'pointer', background: selectedPlan === 'MONTHLY' ? 'white' : 'transparent', boxShadow: selectedPlan === 'MONTHLY' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none', color: selectedPlan === 'MONTHLY' ? 'black' : '#6b7280' }}
                onClick={() => setSelectedPlan('MONTHLY')}
            >
                Monthly
            </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {plans.map(plan => (
                <div key={plan.id} style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb', background: plan.id === 'VEG' ? '#f0fdf4' : plan.id === 'NON_VEG' ? '#fef2f2' : '#fff7ed', borderColor: plan.id === 'VEG' ? '#bbf7d0' : plan.id === 'NON_VEG' ? '#fecaca' : '#fed7aa' }}>
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{plan.title}</h3>
                            <span style={{ background: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                ₹{plan.price[selectedPlan]}
                            </span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem', paddingRight: '2.5rem' }}>{plan.desc}</p>
                        <button 
                            onClick={() => handleSubscribe(plan.id)}
                            style={{ width: '100%', background: 'black', color: 'white', padding: '0.75rem', borderRadius: '0.75rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'transform 0.1s' }}
                        >
                            Select Plan
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
