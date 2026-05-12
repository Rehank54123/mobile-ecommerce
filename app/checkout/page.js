"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate APS Payment Gateway processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Clear cart
      localStorage.removeItem('cart');
      
      // Redirect after showing success message
      setTimeout(() => {
        window.location.href = '/'; // use window.location to force reload and clear state context
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <main className="page-main container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="card" style={{ padding: '4rem', textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontSize: '4rem', color: 'var(--success-color)', marginBottom: '1rem' }}>✓</div>
          <h2 style={{ marginBottom: '1rem' }}>Pagamento Completato!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Grazie per il tuo ordine. La transazione tramite APS è andata a buon fine. Reindirizzamento alla home...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-main container animate-fade-in">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', color: '#111' }}>Checkout Sicuro</h1>
      
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Dettagli Spedizione e Pagamento</h2>
        <form onSubmit={handleCheckout}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Nome e Cognome / Ragione Sociale</label>
              <input type="text" required className="input-field" placeholder="Mario Rossi S.r.l." />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Email</label>
              <input type="email" required className="input-field" placeholder="info@azienda.it" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Indirizzo di Spedizione</label>
              <textarea required className="input-field" rows="3" placeholder="Via Roma 1, 00100 Roma (RM)"></textarea>
            </div>
            
            <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Metodo di Pagamento</h3>
                <span style={{ background: 'var(--accent-color)', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>APS Gateway</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>I tuoi dati saranno processati in modo sicuro dal gateway APS.</p>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Numero Carta</label>
                <input type="text" required className="input-field" placeholder="0000 0000 0000 0000" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>Scadenza</label>
                  <input type="text" required className="input-field" placeholder="MM/AA" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>CVV</label>
                  <input type="text" required className="input-field" placeholder="123" />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={isProcessing} style={{ width: '100%', marginTop: '1rem', opacity: isProcessing ? 0.7 : 1, padding: '1.2rem', fontSize: '1.1rem' }}>
              {isProcessing ? 'Elaborazione APS...' : 'Paga Ora e Conferma Ordine'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
