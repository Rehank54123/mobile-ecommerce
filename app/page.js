"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getActiveOffers } from './actions';

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchOffers() {
      const { data, error } = await getActiveOffers();
      if (!error && data) {
        setOffers(data);
      }
    }
    fetchOffers();
  }, []);

  useEffect(() => {
    if (offers.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [offers.length]);

  const offer = offers[currentSlide] || {
    title: 'Ingrosso Telefonia,<br/>Ricambi e Accessori.',
    subtitle: 'B2B & B2C',
    description: 'Scopri il nostro catalogo dedicato a professionisti e privati. Prezzi competitivi, spedizioni rapide e qualità garantita.',
    button_text: 'Esplora Catalogo',
    button_link: '/products',
    image_url: 'https://placehold.co/400x400/e9ecef/6c757d?text=Hero+Image'
  };

  return (
    <main className="page-main container animate-fade-in">
      <section style={{ 
        backgroundColor: 'var(--bg-white)', 
        borderRadius: '12px', 
        padding: '5rem 3rem', 
        marginBottom: '4rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid var(--border-color)',
        minHeight: '400px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '600px', zIndex: 2 }}>
          <span style={{ color: 'var(--accent-color)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
            {offer.subtitle}
          </span>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1, color: '#111' }} dangerouslySetInnerHTML={{ __html: offer.title }}>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
            {offer.description}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href={offer.button_link} className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
              {offer.button_text}
            </Link>
            {currentSlide === 0 && (
              <Link href="/admin/login" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                Area Rivenditori
              </Link>
            )}
          </div>
        </div>
        <div style={{ width: '400px', height: '400px', backgroundColor: 'transparent', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <img src={offer.image_url} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
        </div>
        
        {offers.length > 1 && (
          <div style={{ position: 'absolute', bottom: '1rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '0.5rem', zIndex: 3 }}>
            {offers.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{ 
                  width: '12px', height: '12px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                  backgroundColor: currentSlide === idx ? 'var(--accent-color)' : '#cbd5e1',
                  transition: 'background-color 0.3s'
                }}
              />
            ))}
          </div>
        )}
      </section>

      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Le Nostre Categorie</h2>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <Link href="/products?category=telefonia" className="card" style={{ padding: '2rem', textAlign: 'center', display: 'block' }}>
          <div style={{ height: '150px', background: 'rgba(0, 86, 179, 0.05)', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>📱</div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Telefonia</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Smartphone, Rigenerati, Cellulari</p>
        </Link>
        <Link href="/products?category=ricambi" className="card" style={{ padding: '2rem', textAlign: 'center', display: 'block' }}>
          <div style={{ height: '150px', background: 'rgba(0, 86, 179, 0.05)', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>⚙️</div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Ricambi</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Display, Batterie, Connettori</p>
        </Link>
        <Link href="/products?category=accessori" className="card" style={{ padding: '2rem', textAlign: 'center', display: 'block' }}>
          <div style={{ height: '150px', background: 'rgba(0, 86, 179, 0.05)', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🎧</div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Accessori</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Cover, Vetri, Caricabatterie</p>
        </Link>
        <Link href="/products?category=memorie" className="card" style={{ padding: '2rem', textAlign: 'center', display: 'block' }}>
          <div style={{ height: '150px', background: 'rgba(0, 86, 179, 0.05)', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>💾</div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Memorie</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Micro SD, Pendrive, Hard Disk</p>
        </Link>
      </section>
    </main>
  );
}
