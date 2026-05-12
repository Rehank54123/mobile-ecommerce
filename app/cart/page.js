"use client";
import Link from 'next/link';
import { useCart } from '../../lib/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, isMounted } = useCart();

  if (!isMounted) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.22; // 22% IVA in Italy
  const total = subtotal + tax;

  return (
    <main className="page-main container animate-fade-in">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#111' }}>Il Tuo Carrello</h1>
      
      {cart.length === 0 ? (
        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Il carrello è vuoto</h2>
          <Link href="/products" className="btn-primary" style={{ marginTop: '2rem' }}>
            Continua lo Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Prodotto</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Prezzo</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Quantità</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', textAlign: 'right' }}>Totale</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1.5rem 1rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #f1f3f5' }} />
                      <div>
                        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--danger-color)', fontSize: '0.9rem', textDecoration: 'underline', border: 'none', background: 'transparent', cursor: 'pointer' }}>Rimuovi</button>
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold' }}>€{Number(item.price).toFixed(2)}</td>
                    <td style={{ padding: '1.5rem 1rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.5rem 1rem', background: '#f8f9fa', borderRight: '1px solid var(--border-color)', cursor: 'pointer', border: 'none' }}>-</button>
                        <span style={{ padding: '0.5rem 1rem', minWidth: '40px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.5rem 1rem', background: '#f8f9fa', borderLeft: '1px solid var(--border-color)', cursor: 'pointer', border: 'none' }}>+</button>
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold', color: 'var(--accent-color)', textAlign: 'right' }}>
                      €{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className="card" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
              <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Riepilogo Ordine</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Imponibile</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>IVA (22%)</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span>Totale (IVA incl.)</span>
                <span style={{ color: 'var(--accent-color)' }}>€{total.toFixed(2)}</span>
              </div>
              
              <Link href="/checkout" className="btn-primary" style={{ width: '100%', textAlign: 'center', padding: '1rem', display: 'block' }}>
                Procedi al Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
