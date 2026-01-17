'use client';
import { useState, useEffect } from 'react';

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // In real app, fetch only today's orders with status 'OUT_FOR_DELIVERY' or 'PREPARING'
    // For demo, we mock or fetch all.
    // We need an API for this: /api/delivery/orders
    const res = await fetch('/api/delivery/orders');
    if (res.ok) {
        setOrders(await res.json());
    }
    setLoading(false);
  };

  const markDelivered = async (orderId) => {
    if (!confirm('Confirm delivery?')) return;
    
    const res = await fetch('/api/delivery/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: 'DELIVERED' })
    });

    if (res.ok) {
        fetchOrders(); // Refresh list
    }
  };

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-gray-700">Today's Route</h2>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{orders.length} Active</span>
      </div>

      <div className="space-y-4">
        {orders.length === 0 && <p className="text-gray-400 text-center py-8">No active deliveries assigned.</p>}
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold">{order.user?.name || 'Customer'}</h3>
                    <p className="text-sm text-gray-500">{order.user?.address || 'No Address Provided'}</p>
                    <a href={`tel:${order.user?.phone}`} className="text-blue-500 text-xs mt-1 block">
                        📞 {order.user?.phone}
                    </a>
                </div>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status.replace(/_/g, ' ')}
                </span>
            </div>
            
            {order.status !== 'DELIVERED' && (
                <button 
                    onClick={() => markDelivered(order.id)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-bold mt-2 active:bg-green-700 transition"
                >
                    Mark Delivered
                </button>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .status-badge {
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: bold;
        }
        .status-badge.delivered { background: #dcfce7; color: #166534; }
        .status-badge.out_for_delivery { background: #fee2e2; color: #991b1b; }
        .status-badge.preparing { background: #fef9c3; color: #854d0e; }
      `}</style>
    </div>
  );
}
