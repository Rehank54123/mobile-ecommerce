"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo prodotto?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) console.error("Error deleting:", error);
      else fetchProducts();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (currentProduct.id) {
      const { id, ...updateData } = currentProduct;
      const { error } = await supabase.from('products').update(updateData).eq('id', id);
      if (error) console.error("Error updating:", error);
    } else {
      const { id, created_at, ...insertData } = currentProduct;
      const { error } = await supabase.from('products').insert([insertData]);
      if (error) console.error("Error inserting:", error);
    }
    setIsEditing(false);
    setCurrentProduct(null);
    fetchProducts();
  };

  const handleAdd = () => {
    setCurrentProduct({ name: '', category: 'telefonia', price: 0, description: '', image: '' });
    setIsEditing(true);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e293b' }}>Gestione Catalogo</h1>
        <button onClick={handleAdd} className="btn-primary" style={{ padding: '0.8rem 1.5rem', background: '#0284c7' }}>+ Aggiungi Prodotto</button>
      </div>

      {isEditing && (
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>{currentProduct.id ? 'Modifica Prodotto' : 'Nuovo Prodotto'}</h2>
          <form onSubmit={handleSave} style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Nome Prodotto</label>
              <input required className="input-field" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Categoria</label>
                <select className="input-field" value={currentProduct.category} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}>
                  <option value="telefonia">Telefonia</option>
                  <option value="ricambi">Ricambi</option>
                  <option value="accessori">Accessori</option>
                  <option value="memorie">Memorie</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Prezzo (€)</label>
                <input type="number" step="0.01" required className="input-field" value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Descrizione</label>
              <textarea className="input-field" rows="3" value={currentProduct.description || ''} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}></textarea>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>URL Immagine</label>
              <input className="input-field" value={currentProduct.image || ''} onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" style={{ background: '#10b981' }}>Salva Prodotto</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">Annulla</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Caricamento prodotti...</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#f1f5f9' }}>
              <tr>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Prodotto</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Categoria</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Prezzo</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'right' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background 0.2s' }}>
                  <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                    <span style={{ fontWeight: '500', color: '#1e293b' }}>{product.name}</span>
                  </td>
                  <td style={{ padding: '1rem', textTransform: 'capitalize', color: '#64748b' }}>{product.category}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#0f172a' }}>€{Number(product.price).toFixed(2)}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(product)} style={{ color: '#0284c7', marginRight: '1rem', fontWeight: 'bold', cursor: 'pointer', background: 'transparent', border: 'none' }}>Modifica</button>
                    <button onClick={() => handleDelete(product.id)} style={{ color: '#f43f5e', fontWeight: 'bold', cursor: 'pointer', background: 'transparent', border: 'none' }}>Elimina</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
