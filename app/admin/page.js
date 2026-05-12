"use client";
import { useState, useEffect } from 'react';
import { initializeDatabase, getProducts } from '../actions';

export default function AdminDashboard() {
  const [dbStatus, setDbStatus] = useState('checking');
  const [isInitializing, setIsInitializing] = useState(false);
  const [initMessage, setInitMessage] = useState('');

  useEffect(() => {
    async function checkDb() {
      const { error } = await getProducts();
      if (error && (error.includes('relation "products" does not exist') || error.includes('does not exist'))) {
        setDbStatus('missing');
      } else if (error) {
        setDbStatus('error');
      } else {
        setDbStatus('ok');
      }
    }
    checkDb();
  }, []);

  const handleInit = async () => {
    setIsInitializing(true);
    setInitMessage('');
    const { success, error } = await initializeDatabase();
    if (success) {
      setDbStatus('ok');
      setInitMessage('Database inizializzato con successo!');
    } else {
      setInitMessage('Errore: ' + error);
    }
    setIsInitializing(false);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e293b' }}>Dashboard Overview</h1>
        <div style={{ background: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem' }}>
          Oggi: {new Date().toLocaleDateString('it-IT')}
        </div>
      </div>
      
      {dbStatus === 'missing' && (
        <div style={{ background: '#fffbeb', border: '1px solid #f59e0b', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2 style={{ color: '#d97706', marginBottom: '1rem' }}>⚠️ Database Non Configurato</h2>
          <p style={{ marginBottom: '1.5rem', color: '#92400e' }}>
            Sembra che le tabelle del database non siano ancora state create nel tuo Vercel Postgres. 
            Clicca il bottone qui sotto per creare automaticamente le tabelle e inserire i dati demo.
          </p>
          <button 
            onClick={handleInit} 
            disabled={isInitializing}
            className="btn-primary" 
            style={{ background: '#d97706', border: 'none', padding: '1rem 2rem' }}
          >
            {isInitializing ? 'Inizializzazione in corso...' : 'Configura Database Automaticamente'}
          </button>
          {initMessage && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{initMessage}</p>}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #38bdf8' }}>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>Fatturato Odierno</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0f172a' }}>€1.245,00</p>
        </div>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #10b981' }}>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>Ordini Attivi</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0f172a' }}>12</p>
        </div>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #f43f5e' }}>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1rem', textTransform: 'uppercase' }}>Scorte in Esaurimento</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f43f5e' }}>3</p>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1e293b' }}>Attività Recenti</h2>
        <p style={{ color: 'var(--text-secondary)' }}>L'integrazione con il database Postgres è attiva. {dbStatus === 'ok' ? 'Le tabelle sono pronte all\'uso.' : ''}</p>
      </div>
    </div>
  );
}
