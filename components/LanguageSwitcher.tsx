import React from 'react';
import { useLanguage } from '../LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
            language === 'en'
              ? 'bg-brandBlue text-white shadow'
              : 'text-brandText hover:bg-gray-100'
          }`}
          aria-pressed={language === 'en'}
        >
          {t('lang.english')}
        </button>
        <button
          onClick={() => handleLanguageChange('hi')}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
            language === 'hi'
              ? 'bg-brandBlue text-white shadow'
              : 'text-brandText hover:bg-gray-100'
          }`}
          aria-pressed={language === 'hi'}
        >
          {t('lang.hindi')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
