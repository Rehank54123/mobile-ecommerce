"use client";
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState('it');

  useEffect(() => {
    // Check if google translate is already active by checking cookies
    if (document.cookie.indexOf('googtrans=/it/en') !== -1) {
      setLang('en');
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'it' ? 'en' : 'it';
    setLang(newLang);
    
    // Trigger Google Translate hidden combo box
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = newLang;
      combo.dispatchEvent(new Event('change'));
    } else {
      // Fallback if widget hasn't fully loaded, try redirecting with hash
      window.location.hash = '#googtrans(it|' + newLang + ')';
      window.location.reload();
    }
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
