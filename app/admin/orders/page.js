'use client';
import { useState, useEffect } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      if (res.ok) {
        fetchOrders(); // Refresh table
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      alert('Error updating order');
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center p-8 text-gray-500">No orders found.</td>
                </tr>
            )}
            {orders.map(order => (
              <tr key={order.id}>
                <td className="text-sm text-gray-500">#{order.id.substring(0, 8)}</td>
                <td>
                    <div className="font-bold">{order.user?.name || 'Unknown'}</div>
                    <div className="text-xs text-gray-500">{order.user?.address}</div>
                </td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status.replace(/_/g, ' ')}
                    </span>
                </td>
                <td>
                    <select 
                        className="status-select"
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                        <option value="PREPARING">Preparing</option>
                        <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          overflow-x: auto;
        }
        .orders-table {
          width: 100%;
          border-collapse: collapse;
        }
        .orders-table th {
          text-align: left;
          padding: 16px;
          border-bottom: 2px solid #f0f0f0;
          color: #666;
          font-size: 0.9rem;
        }
        .orders-table td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        .status-badge {
            font-size: 0.75rem;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: bold;
        }
        .status-badge.delivered { background: #dcfce7; color: #166534; }
        .status-badge.out_for_delivery { background: #fee2e2; color: #991b1b; }
        .status-badge.preparing { background: #fef9c3; color: #854d0e; }
        .status-badge.cancelled { background: #f1f5f9; color: #64748b; }
        
        .status-select {
            padding: 6px;
            border-radius: 6px;
            border: 1px solid #ddd;
            font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
