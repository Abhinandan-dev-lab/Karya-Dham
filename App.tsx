import React from 'react';
import { useState } from 'react';
import type { StudyPlan } from './types';
import { generateStudyPlan, explainTopic } from './services/geminiService';
import StudyPlanForm from './components/StudyPlanForm';
import StudyPlanDisplay from './components/StudyPlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Hero from './components/Hero';
import Footer from './components/Footer';
import DiveDeeperModal from './components/DiveDeeperModal';
import { useLanguage } from './LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

const App: React.FC = () => {
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [modalContent, setModalContent] = useState<string>('');
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  
  const { language, t } = useLanguage();

  const handleGeneratePlan = async (exam: string, weakSubjects: string, strongSubjects: string, duration: number) => {
    setIsLoading(true);
    setError(null);
    setStudyPlan(null);
    try {
      const plan = await generateStudyPlan(exam, weakSubjects, strongSubjects, duration, language);
      setStudyPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiveDeeper = async (topic: string) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
    setIsModalLoading(true);
    setModalContent('');
    try {
      const explanation = await explainTopic(topic, language);
      setModalContent(explanation);
    } catch (err) {
      setModalContent(err instanceof Error ? `Error: ${err.message}` : 'Could not fetch an explanation at this time.');
    } finally {
      setIsModalLoading(false);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTopic('');
    setModalContent('');
  };


  return (
    <div className="min-h-screen bg-brandBg text-brandText font-inter">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <LanguageSwitcher />
        <Hero />
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-10 border border-gray-200/80">
          <h2 className="text-2xl font-bold font-poppins text-brandBlue mb-4 text-center">{t('form.title')}</h2>
          <StudyPlanForm onGenerate={handleGeneratePlan} isLoading={isLoading} />
        </div>

        <div className="mt-12">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {studyPlan && <StudyPlanDisplay plan={studyPlan} onDiveDeeper={handleDiveDeeper} />}
        </div>
      </main>
      <Footer />

      <DiveDeeperModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        topic={selectedTopic}
        content={modalContent}
        isLoading={isModalLoading}
      />
    </div>
  );
};

export default App;
