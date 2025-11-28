// src/components/profile/LanguageSelector.tsx
'use client';

import React, { useState, useCallback } from 'react';

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState('en');

  const triggerGoogleTranslation = useCallback((langCode: string): boolean => {
    const combo = document.querySelector('select.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
      return true;
    }
    return false;
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setSelectedLang(newLang);

    // Try immediately
    if (triggerGoogleTranslation(newLang)) return;

    // Retry until Google Translate is ready
    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(() => {
      attempts++;
      if (triggerGoogleTranslation(newLang) || attempts >= maxAttempts) {
        clearInterval(interval);
        if (attempts >= maxAttempts)
          console.warn('Google Translate element not found after several attempts.');
      }
    }, 200);
  };

  return (
    <div className="bg-[#EFF2F880] p-6 w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🌍 Language</h2>
      <select
        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        value={selectedLang}
        onChange={handleLanguageChange}
      >
        <option value="en">English (Default)</option>
        <option value="ar">Arabic</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
