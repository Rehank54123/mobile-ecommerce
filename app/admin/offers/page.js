"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('special_offers').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching offers:', error);
    } else {
      setOffers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleEdit = (offer) => {
    setCurrentOffer(offer);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa offerta?")) {
      const { error } = await supabase.from('special_offers').delete().eq('id', id);
      if (error) console.error("Error deleting:", error);
      else fetchOffers();
    }
  };

  const handleToggleActive = async (offer) => {
    const { error } = await supabase.from('special_offers').update({ active: !offer.active }).eq('id', offer.id);
    if (error) console.error("Error toggling active:", error);
    else fetchOffers();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (currentOffer.id) {
      const { id, ...updateData } = currentOffer;
      const { error } = await supabase.from('special_offers').update(updateData).eq('id', id);
      if (error) console.error("Error updating:", error);
    } else {
      const { id, created_at, ...insertData } = currentOffer;
      const { error } = await supabase.from('special_offers').insert([insertData]);
      if (error) console.error("Error inserting:", error);
    }
    setIsEditing(false);
    setCurrentOffer(null);
    fetchOffers();
  };

  const handleAdd = () => {
    setCurrentOffer({ title: '', subtitle: '', description: '', button_text: '', button_link: '', image_url: '', active: true });
    setIsEditing(true);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e293b' }}>Gestione Offerte Speciali</h1>
        <button onClick={handleAdd} className="btn-primary" style={{ padding: '0.8rem 1.5rem', background: '#0284c7' }}>+ Aggiungi Offerta</button>
      </div>

      {isEditing && (
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>{currentOffer.id ? 'Modifica Offerta' : 'Nuova Offerta'}</h2>
          <form onSubmit={handleSave} style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Titolo</label>
                <input required className="input-field" value={currentOffer.title || ''} onChange={e => setCurrentOffer({...currentOffer, title: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Sottotitolo</label>
                <input required className="input-field" value={currentOffer.subtitle || ''} onChange={e => setCurrentOffer({...currentOffer, subtitle: e.target.value})} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Descrizione</label>
              <textarea className="input-field" rows="3" required value={currentOffer.description || ''} onChange={e => setCurrentOffer({...currentOffer, description: e.target.value})}></textarea>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Testo Bottone</label>
                <input required className="input-field" value={currentOffer.button_text || ''} onChange={e => setCurrentOffer({...currentOffer, button_text: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Link Bottone</label>
                <input required className="input-field" value={currentOffer.button_link || ''} onChange={e => setCurrentOffer({...currentOffer, button_link: e.target.value})} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>URL Immagine</label>
              <input required className="input-field" value={currentOffer.image_url || ''} onChange={e => setCurrentOffer({...currentOffer, image_url: e.target.value})} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input type="checkbox" id="active" checked={currentOffer.active} onChange={e => setCurrentOffer({...currentOffer, active: e.target.checked})} style={{ width: '1.2rem', height: '1.2rem' }} />
              <label htmlFor="active" style={{ fontWeight: 'bold', color: '#334155', cursor: 'pointer' }}>Mostra nello slider in Homepage</label>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" style={{ background: '#10b981' }}>Salva Offerta</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">Annulla</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Caricamento offerte...</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#f1f5f9' }}>
              <tr>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Immagine</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Titolo</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Stato</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#475569', textAlign: 'right' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {offers.map(offer => (
                <tr key={offer.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background 0.2s', opacity: offer.active ? 1 : 0.6 }}>
                  <td style={{ padding: '1rem' }}>
                    <img src={offer.image_url} alt={offer.title} style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{offer.title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{offer.subtitle}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button onClick={() => handleToggleActive(offer)} style={{ padding: '0.4rem 0.8rem', borderRadius: '4px', border: 'none', background: offer.active ? '#dcfce7' : '#f1f5f9', color: offer.active ? '#166534' : '#64748b', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>
                      {offer.active ? 'Attivo' : 'Inattivo'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(offer)} style={{ color: '#0284c7', marginRight: '1rem', fontWeight: 'bold', cursor: 'pointer', background: 'transparent', border: 'none' }}>Modifica</button>
                    <button onClick={() => handleDelete(offer.id)} style={{ color: '#f43f5e', fontWeight: 'bold', cursor: 'pointer', background: 'transparent', border: 'none' }}>Elimina</button>
                  </td>
                </tr>
              ))}
              {offers.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Nessuna offerta trovata.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
