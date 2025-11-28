'use client';

import React, { useState, useCallback } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'Arabic' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
];

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

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);

    if (triggerGoogleTranslation(lang)) return;

    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(() => {
      attempts++;
      if (triggerGoogleTranslation(lang) || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 200);
  };

  return (
    <div className="w-[876px] h-[488px] bg-[#EFF2F880] shadow-sm rounded-2xl p-[32px_44px_48px] flex flex-col justify-between">
      
      {/* Inner container */}
      <div className="w-[788px] mx-auto flex flex-col gap-8">

        {/* Title */}
        <div className="flex justify-between items-center w-full h-[30px]">
          <h2 className="text-[24px] font-medium text-[#191919]">Language Preference</h2>
        </div>

        {/* Radio Group */}
        <div className="flex flex-col gap-4 w-full">
          {languages.map((lang) => (
            <div key={lang.code} className="flex items-center gap-3 h-6">

              {/* Custom Radio */}
              <div
                className="w-6 h-6 relative cursor-pointer"
                onClick={() => handleLanguageChange(lang.code)}
              >
                {/* Outer circle */}
                <div
                  className={`absolute inset-0 rounded-full 
                    ${selectedLang === lang.code 
                      ? 'border-[1.5px] border-[#FAA523]' 
                      : 'border-[1.5px] border-[#C4CAD4]'
                    }
                  `}
                />
                {/* Inner circle */}
                {selectedLang === lang.code && (
                  <div className="absolute inset-[25%] rounded-full bg-[#FAA523]" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[16px] font-${selectedLang === lang.code ? 'medium' : 'normal'} 
                  ${selectedLang === lang.code ? 'text-[#191919]' : 'text-[#747D8F]'}
                `}
              >
                {lang.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        className="w-[788px] mx-auto flex justify-center items-center bg-[#EE2552] text-white text-[14px] py-3 rounded-lg"
      >
        Save changes
      </button>
    </div>
  );
};

export default LanguageSelector;
