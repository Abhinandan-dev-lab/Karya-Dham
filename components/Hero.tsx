import React from 'react';
import { useLanguage } from '../LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="text-center">
       <h1 className="text-4xl md:text-6xl font-extrabold font-poppins text-brandText">
        {t('hero.title')}
        <span className="block text-3xl md:text-5xl text-brandBlue font-bold mt-2">{t('hero.subtitle')}</span>
      </h1>
      <p className="mt-4 text-lg md:text-xl font-semibold font-poppins text-brandOrange">
        {t('hero.tagline')}
      </p>
      <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-gray-700">
        {t('hero.description')}
      </p>
    </header>
  );
};

export default Hero;
