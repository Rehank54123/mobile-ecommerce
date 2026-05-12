"use client";
import { useState } from 'react';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState('it');

  const toggleLanguage = () => {
    setLang(prev => prev === 'it' ? 'en' : 'it');
  };

  return (
    <button 
      onClick={toggleLanguage}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem 0.8rem',
        borderRadius: '4px',
        background: '#f8f9fa',
        border: '1px solid var(--border-color)',
        color: 'var(--text-primary)',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      title="Cambia Lingua"
    >
      <span style={{ fontSize: '1.1rem' }}>{lang === 'it' ? '🇮🇹' : '🇬🇧'}</span>
      <span>{lang === 'it' ? 'IT' : 'EN'}</span>
    </button>
  );
}
