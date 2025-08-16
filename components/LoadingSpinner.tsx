import React from 'react';
import { useLanguage } from '../LanguageContext';

const LoadingSpinner: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="w-16 h-16 border-4 border-brandBlue border-dashed rounded-full animate-spin border-t-transparent"></div>
      <p className="mt-4 text-lg text-brandText font-semibold font-poppins">{t('loader.title')}</p>
      <p className="text-sm text-gray-600">{t('loader.subtitle')}</p>
    </div>
  );
};

export default LoadingSpinner;
