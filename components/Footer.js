"use client";
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer style={{ background: 'var(--bg-white)', padding: '3rem 2rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
        <div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Ingrosmart</h3>
          <p>Il tuo partner B2B per la telefonia.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p>&copy; {new Date().getFullYear()} Ingrosmart. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
