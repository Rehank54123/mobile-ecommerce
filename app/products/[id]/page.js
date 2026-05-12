"use client";
import { useEffect, useState, use } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useCart } from '../../../lib/CartContext';

export default function ProductDetails({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}><h3>Caricamento...</h3></div>;
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h3>Prodotto non trovato</h3>
        <Link href="/products" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>Torna al Catalogo</Link>
      </div>
    );
  }

  return (
    <main className="page-main container animate-fade-in">
      <Link href="/products" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
        &larr; Torna al Catalogo
      </Link>
      
      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', padding: '3rem' }}>
        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #f1f3f5' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#111', lineHeight: 1.2 }}>{product.name}</h1>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--accent-color)' }}>€{Number(product.price).toFixed(2)}</p>
          
          <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '2rem 0', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Descrizione Prodotto</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              {product.description}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => addToCart(product)} className="btn-primary" style={{ flex: 1, textAlign: 'center', padding: '1.2rem', fontSize: '1.1rem', cursor: 'pointer', border: 'none' }}>
              Aggiungi al Carrello
            </button>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>✓</span> Disponibilità Immediata
          </p>
        </div>
      </div>
    </main>
  );
}
