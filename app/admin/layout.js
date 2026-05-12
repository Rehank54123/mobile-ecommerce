"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AdminGuard from '../../components/AdminGuard';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // If we are on the login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <AdminGuard>{children}</AdminGuard>;
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    router.push('/admin/login');
  };

  return (
    <AdminGuard>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
        <aside style={{ width: '260px', backgroundColor: '#1e293b', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8' }}>INGROSMART</h2>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px' }}>Admin Dashboard</span>
          </div>
          
          <nav style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <Link href="/admin" style={{ padding: '0.8rem 1rem', borderRadius: '6px', background: pathname === '/admin' ? '#334155' : 'transparent', color: pathname === '/admin' ? '#fff' : '#cbd5e1' }}>Dashboard</Link>
            <Link href="/admin/inventory" style={{ padding: '0.8rem 1rem', borderRadius: '6px', background: pathname === '/admin/inventory' ? '#334155' : 'transparent', color: pathname === '/admin/inventory' ? '#fff' : '#cbd5e1' }}>Gestione Catalogo</Link>
            <Link href="/admin/offers" style={{ padding: '0.8rem 1rem', borderRadius: '6px', background: pathname === '/admin/offers' ? '#334155' : 'transparent', color: pathname === '/admin/offers' ? '#fff' : '#cbd5e1' }}>Offerte Speciali</Link>
          </nav>

          <div style={{ padding: '1rem', borderTop: '1px solid #334155' }}>
            <button onClick={handleLogout} style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid #475569', borderRadius: '6px', color: '#cbd5e1', cursor: 'pointer' }}>
              Esci
            </button>
            <Link href="/" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              Vai al Negozio
            </Link>
          </div>
        </aside>
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
