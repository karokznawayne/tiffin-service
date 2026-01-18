'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, pendingApprovals: 0, activeOrders: 0 });

  useEffect(() => {
    fetch('/api/admin/stats').then(res => res.json()).then(data => setStats(data));
  }, []);

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: '1.5rem' }}>Master Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p className="stat-value" style={{ color: '#f97316' }}>{stats.pendingApprovals}</p>
        </div>
        <div className="stat-card">
          <h3>Active Orders</h3>
          <p className="stat-value">{stats.activeOrders}</p>
        </div>
      </div>

      <style jsx>{`
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .stat-card h3 {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 10px;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
        }
        .text-orange-500 { color: #f97316; }
      `}</style>
    </div>
  );
}
