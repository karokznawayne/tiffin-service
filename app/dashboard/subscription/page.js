'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('MONTHLY');

  const plans = [
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

  const handleSubscribe = (planId) => {
    // In real app, redirect to payment gateway
    alert(`Starting ${selectedPlan} subscription for ${planId}. Redirecting to Payment...`);
    setTimeout(() => router.push('/dashboard'), 2000);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-gray-500 mb-6">Fresh, home-cooked food delivered to your door.</p>

        {/* Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button 
                className={`flex-1 py-2 rounded-lg font-bold text-sm transition ${selectedPlan === 'WEEKLY' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                onClick={() => setSelectedPlan('WEEKLY')}
            >
                Weekly
            </button>
            <button 
                className={`flex-1 py-2 rounded-lg font-bold text-sm transition ${selectedPlan === 'MONTHLY' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                onClick={() => setSelectedPlan('MONTHLY')}
            >
                Monthly
            </button>
        </div>

        <div className="space-y-4">
            {plans.map(plan => (
                <div key={plan.id} className={`p-6 rounded-2xl border ${plan.color} relative overflow-hidden`}>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{plan.title}</h3>
                            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                ₹{plan.price[selectedPlan]}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 pr-10">{plan.desc}</p>
                        <button 
                            onClick={() => handleSubscribe(plan.id)}
                            className="w-full bg-black text-white py-3 rounded-xl font-bold active:scale-95 transition"
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
