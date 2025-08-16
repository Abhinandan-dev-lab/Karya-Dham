import React, { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

interface DiveDeeperModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  content: string;
  isLoading: boolean;
}

const ModalLoadingSpinner: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-8 h-8 border-2 border-brandBlue border-dashed rounded-full animate-spin border-t-transparent"></div>
      <p className="ml-3 text-gray-600 font-poppins">{t('modal.loading')}</p>
    </div>
  );
};

const DiveDeeperModal: React.FC<DiveDeeperModalProps> = ({ isOpen, onClose, topic, content, isLoading }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in-fast"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full md:w-2/3 max-w-3xl flex flex-col max-h-[90vh] transform transition-transform duration-300 ease-out scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="modal-title" className="text-lg font-bold font-poppins text-brandBlue">
            {t('modal.titlePrefix')}: <span className="font-extrabold">{topic}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brandBlue"
            aria-label={t('modal.close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="p-6 overflow-y-auto">
          {isLoading && <ModalLoadingSpinner />}
          {!isLoading && (
            <div className="prose max-w-none text-brandText" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}>
            </div>
          )}
        </main>
      </div>
      <style>{`
        .prose > p { margin-bottom: 1em; }
        .prose > ul { list-style-position: inside; }
        .prose > ul > li { margin-left: 1.5em; }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { transform: scale(0.95); } to { transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default DiveDeeperModal;
