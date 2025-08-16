
import React from 'react';
import { useLanguage } from '../LanguageContext';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md" role="alert">
      <p className="font-bold">{t('error.title')}</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
