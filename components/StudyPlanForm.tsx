import React from 'react';
import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

interface StudyPlanFormProps {
  onGenerate: (exam: string, weakSubjects: string, strongSubjects: string, duration: number) => void;
  isLoading: boolean;
}

const StudyPlanForm: React.FC<StudyPlanFormProps> = ({ onGenerate, isLoading }) => {
  const { t } = useLanguage();
  const [exam, setExam] = useState('Bihar Board Class 10 Science');
  const [weakSubjects, setWeakSubjects] = useState('Physics formulas');
  const [strongSubjects, setStrongSubjects] = useState('Biology diagrams');
  const [duration, setDuration] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exam.trim() && weakSubjects.trim()) {
      onGenerate(exam, weakSubjects, strongSubjects, duration);
    }
  };

  const durationOptions = [1, 2, 3, 6, 12];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="exam" className="block text-sm font-medium text-brandText mb-1">
            {t('form.examLabel')}
          </label>
          <input
            type="text"
            id="exam"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full px-4 py-2 bg-white text-brandText border border-gray-300 rounded-lg shadow-sm focus:ring-brandBlue focus:border-brandBlue transition"
            placeholder={t('form.examPlaceholder')}
            required
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-brandText mb-1">
            {t('form.durationLabel')}
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-4 py-2 bg-white text-brandText border border-gray-300 rounded-lg shadow-sm focus:ring-brandBlue focus:border-brandBlue transition"
          >
            {durationOptions.map(d => (
              <option key={d} value={d}>{t(`months.${d}`)}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="weakSubjects" className="block text-sm font-medium text-brandText mb-1">
          {t('form.weakSubjectsLabel')}
        </label>
        <input
          type="text"
          id="weakSubjects"
          value={weakSubjects}
          onChange={(e) => setWeakSubjects(e.target.value)}
          className="w-full px-4 py-2 bg-white text-brandText border border-gray-300 rounded-lg shadow-sm focus:ring-brandBlue focus:border-brandBlue transition"
          placeholder={t('form.weakSubjectsPlaceholder')}
          required
        />
        <p className="text-xs text-gray-500 mt-1">{t('form.commaSeparated')}</p>
      </div>
       <div>
        <label htmlFor="strongSubjects" className="block text-sm font-medium text-brandText mb-1">
          {t('form.strongSubjectsLabel')}
        </label>
        <input
          type="text"
          id="strongSubjects"
          value={strongSubjects}
          onChange={(e) => setStrongSubjects(e.target.value)}
          className="w-full px-4 py-2 bg-white text-brandText border border-gray-300 rounded-lg shadow-sm focus:ring-brandBlue focus:border-brandBlue transition"
          placeholder={t('form.strongSubjectsPlaceholder')}
          required
        />
        <p className="text-xs text-gray-500 mt-1">{t('form.commaSeparated')}</p>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold font-poppins rounded-lg shadow-sm text-white bg-brandBlue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandBlue disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? t('form.generatingButton') : t('form.generateButton')}
        </button>
      </div>
    </form>
  );
};

export default StudyPlanForm;