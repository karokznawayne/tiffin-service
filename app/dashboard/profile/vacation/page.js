'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VacationModePage() {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [pausedHistory, setPausedHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await fetch('/api/subscription/pause');
    if (res.ok) {
        setPausedHistory(await res.json());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/subscription/pause', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate })
      });

      if (res.ok) {
        alert('Vacation Mode Activated! Your subscription has been paused.');
        fetchHistory();
        setStartDate('');
        setEndDate('');
      } else {
        alert('Failed to pause subscription.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Vacation Mode</h1>
      <p className="text-sm text-gray-600 mb-6">
        Going away? Pause your meal plan to avoid wastage. Your subscription days will be carried forward.
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input 
            type="date" 
            required
            className="w-full p-2 border rounded-lg"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input 
            type="date" 
            required
            className="w-full p-2 border rounded-lg"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold active:scale-95 transition"
        >
          {loading ? 'Processing...' : 'Pause Subscription'}
        </button>
      </form>

      <h3 className="font-bold mb-4">Pause History</h3>
      <div className="space-y-3">
        {pausedHistory.length === 0 && <p className="text-gray-400 text-sm">No vacation history.</p>}
        {pausedHistory.map((req) => (
            <div key={req.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <div>
                    <div className="text-sm font-bold">
                        {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                        Requested on {new Date(req.createdAt).toLocaleDateString()}
                    </div>
                </div>
                <span className="text-green-600 text-xs font-bold px-2 py-1 bg-green-100 rounded-full">
                    {req.status}
                </span>
            </div>
        ))}
      </div>
    </div>
  );
}
