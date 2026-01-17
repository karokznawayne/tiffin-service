'use client';
import '../globals.css';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <nav className="admin-sidebar">
        <div className="admin-logo">Admin Panel</div>
        <ul className="admin-nav-links">
          <li><Link href="/admin/dashboard">Dashboard</Link></li>
          <li><Link href="/admin/users">User Management</Link></li>
          <li><Link href="/admin/orders">Orders</Link></li>
          <li><Link href="/dashboard">Back to App</Link></li>
        </ul>
      </nav>
      <main className="admin-content">
        {children}
      </main>
      <style jsx global>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #f4f6f8;
        }
        .admin-sidebar {
          width: 250px;
          background: #1a1a2e;
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .admin-logo {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 40px;
          color: #e94560;
        }
        .admin-nav-links {
          list-style: none;
          padding: 0;
        }
        .admin-nav-links li {
          margin-bottom: 15px;
        }
        .admin-nav-links a {
          color: #a0a0ce;
          text-decoration: none;
          font-size: 1.1rem;
          display: block;
          padding: 10px;
          border-radius: 8px;
          transition: 0.3s;
        }
        .admin-nav-links a:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .admin-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            display: none; /* simple mobile hide for now */
          }
        }
      `}</style>
    </div>
  );
}
