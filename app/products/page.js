"use client";
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import { useCart } from '../../lib/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="page-main container animate-fade-in">
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', color: '#111' }}>Catalogo Prodotti</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
        <input 
          type="text" 
          placeholder="Cerca un prodotto..." 
          className="input-field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '4px',
                background: selectedCategory === cat ? 'var(--accent-color)' : 'var(--bg-white)',
                color: selectedCategory === cat ? '#fff' : 'var(--text-primary)',
                border: `1px solid ${selectedCategory === cat ? 'var(--accent-color)' : 'var(--border-color)'}`,
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                fontWeight: selectedCategory === cat ? 'bold' : 'normal'
              }}
            >
              {cat === 'all' ? 'Tutti' : cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h3>Caricamento prodotti...</h3>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-white)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>Nessun prodotto trovato.</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {filteredProducts.map(product => (
            <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Link href={`/products/${product.id}`} style={{ display: 'block' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '250px', objectFit: 'cover', borderBottom: '1px solid #f1f3f5' }} />
              </Link>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Link href={`/products/${product.id}`} style={{ flex: 1, display: 'block' }}>
                  <p style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>{product.category}</p>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#111', lineHeight: 1.3 }}>{product.name}</h3>
                </Link>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>€{Number(product.price).toFixed(2)}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link href={`/products/${product.id}`} className="btn-secondary" style={{ flex: 1, textAlign: 'center', fontSize: '0.9rem', padding: '0.8rem' }}>
                      Dettagli
                    </Link>
                    <button onClick={() => addToCart(product)} className="btn-primary" style={{ flex: 1, fontSize: '0.9rem', padding: '0.8rem' }}>
                      Aggiungi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
