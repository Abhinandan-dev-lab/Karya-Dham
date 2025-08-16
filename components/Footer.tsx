import React from 'react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-white mt-12 py-6 border-t border-gray-200/80">
      <div className="container mx-auto text-center text-gray-600">
        <p className="font-semibold">{t('footer.copyright')}</p>
        <p className="text-sm mt-1">{t('footer.mission')}</p>
      </div>
    </footer>
  );
};

export default Footer;
