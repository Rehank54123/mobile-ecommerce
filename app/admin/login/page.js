"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@ingrosmart.it');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@ingrosmart.it' && password === 'password123') {
      localStorage.setItem('isAdminAuth', 'true');
      router.push('/admin');
    } else {
      setError('Credenziali non valide.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f3f5' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--accent-color)', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>INGROSMART</h1>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>Accesso Area Riservata</h2>
        
        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', padding: '0.5rem', background: '#ffe6e6', borderRadius: '4px' }}>{error}</div>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
            <input 
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem' }}>
            Accedi
          </button>
        </form>
        <div style={{ marginTop: '2rem' }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'underline', fontSize: '0.9rem' }}>
            &larr; Torna al Negozio
          </Link>
        </div>
      </div>
    </div>
  );
}
