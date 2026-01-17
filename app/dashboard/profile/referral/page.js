'use client';
import { useState, useEffect } from 'react';

export default function ReferralPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile to get code
    fetch('/api/auth/me').then(async (res) => {
        if (res.ok) {
            const data = await res.json();
            setUser(data);
        }
    }); // We need an endpoint for this, or use existing generic one if available. 
    // Actually we don't have a /me endpoint yet, we usually parse token or assume handled by Profile page.
    // Let's create a specialized partial fetch or mock it for now until we have a proper /me endpoint.
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Refer & Earn</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm text-center">
        <p className="text-gray-500 mb-2">Your unique referral code is:</p>
        <div className="text-3xl font-bold text-green-600 tracking-wider mb-4">
          {user?.referralCode || 'LOADING...'}
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Share this code with your friends. When they sign up, you both get ₹50 in your wallet!
        </p>
        <button 
          onClick={() => navigator.clipboard.writeText(user?.referralCode)}
          className="bg-gray-900 text-white px-6 py-2 rounded-full active:scale-95 transition"
        >
          Copy Code
        </button>
      </div>
      
      <div className="mt-6">
        <h3 className="font-bold mb-2">Your Wallet</h3>
        <div className="bg-green-50 p-4 rounded-lg flex justify-between items-center">
            <span>Balance</span>
            <span className="text-xl font-bold text-green-700">₹{user?.walletBalance || 0}</span>
        </div>
      </div>
    </div>
  );
}
