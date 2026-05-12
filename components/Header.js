"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useCart } from '../lib/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, isMounted } = useCart();

  // Hide header in admin routes
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header style={{ background: 'var(--header-bg)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
      <div className="container" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-color)', letterSpacing: '-0.5px' }}>
          INGROSMART
        </Link>
        
        <div style={{ flex: 1, maxWidth: '500px', margin: '0 2rem' }}>
          <input 
            type="text" 
            placeholder="Cerca prodotti..." 
            className="input-field" 
            style={{ borderRadius: '20px', padding: '0.6rem 1.2rem', backgroundColor: '#f1f3f5', border: 'none' }}
          />
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontWeight: '500' }}>
          <Link href="/products" style={{ color: 'var(--text-primary)' }}>Catalogo</Link>
          <Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            🛒 
            {isMounted && cartCount > 0 && (
              <span style={{ background: 'var(--danger-color)', color: 'white', borderRadius: '50%', padding: '0.1rem 0.5rem', fontSize: '0.8rem' }}>
                {cartCount}
              </span>
            )}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
