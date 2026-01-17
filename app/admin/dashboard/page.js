'use client';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Master Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">...</p>
        </div>
        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p className="stat-value text-orange-500">Check Users Tab</p>
        </div>
        <div className="stat-card">
          <h3>Active Orders</h3>
          <p className="stat-value">...</p>
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
