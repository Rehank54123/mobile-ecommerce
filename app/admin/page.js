export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e293b' }}>Dashboard Overview</h1>
        <div style={{ background: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem' }}>
          Oggi: {new Date().toLocaleDateString('it-IT')}
        </div>
      </div>
      
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
        <p style={{ color: 'var(--text-secondary)' }}>L'integrazione con Supabase permetterà di visualizzare le transazioni reali qui.</p>
      </div>
    </div>
  );
}
