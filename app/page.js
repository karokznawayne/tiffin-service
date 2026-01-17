import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '0 1.5rem', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary-color)' }}>
        Tiffin Box
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Delicious home-style meals delivered to your doorstep daily.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <Link href="/auth/login" className="btn btn-primary" style={{ width: '100%' }}>
          Login
        </Link>
        <Link href="/auth/signup" className="btn" style={{ width: '100%', background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
          Create Account
        </Link>
      </div>
    </main>
  );
}
