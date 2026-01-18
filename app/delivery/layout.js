'use client';
import '../globals.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DeliveryLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/login');
  };

  return (
    <div className="delivery-container">
      <header className="delivery-header">
        <h1 className="text-lg font-bold">Delivery Partner</h1>
        <button onClick={handleLogout} className="text-sm text-red-200">Logout</button>
      </header>
      <main className="delivery-content">
        {children}
      </main>
      <style jsx global>{`
        .delivery-container {
          min-height: 100vh;
          background: #f8fafc;
        }
        .delivery-header {
          background: #0f172a;
          color: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .delivery-content {
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
