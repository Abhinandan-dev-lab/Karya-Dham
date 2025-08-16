import React from 'react';
import type { StudyPlan, MonthlyBreakdown, WeeklyGoal } from '../types';
import { useLanguage } from '../LanguageContext';

const GoalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-successGreen flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const TopicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-brandOrange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-5.747h18" />
    </svg>
);

const ResourceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-aquaFuture flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-9-9v18" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM5 12a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0v-1H3a1 1 0 010-2h1v-1a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 010-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

interface StudyPlanDisplayProps {
  plan: StudyPlan;
  onDiveDeeper: (topic: string) => void;
}

const WeeklyGoalCard: React.FC<{ weekData: WeeklyGoal; onDiveDeeper: (topic: string) => void; }> = ({ weekData, onDiveDeeper }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200/80 transition-all hover:shadow-md hover:border-gray-300">
            <h4 className="font-semibold font-poppins text-brandBlue">{t('plan.week')} {weekData.week}</h4>
            <div className="mt-3 space-y-3 text-gray-700 text-sm">
                <div className="flex items-start">
                    <TopicIcon/>
                    <span><strong className="text-brandText">{t('plan.topic')}:</strong> {weekData.topic}</span>
                </div>
                <div className="flex items-start">
                    <ResourceIcon/>
                     <span><strong className="text-brandText">{t('plan.resources')}:</strong> {weekData.resources.join(', ')}</span>
                </div>
                <div className="flex items-start">
                    <GoalIcon/>
                    <span><strong className="text-brandText">{t('plan.goal')}:</strong> {weekData.goal}</span>
                </div>
            </div>
            <div className="mt-4 text-right">
                <button 
                    onClick={() => onDiveDeeper(weekData.topic)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-semibold font-poppins rounded-full shadow-sm text-white bg-brandBlue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandBlue transition-colors"
                    aria-label={`Ask AI about ${weekData.topic}`}
                    >
                    <SparklesIcon />
                    {t('plan.askAI')}
                </button>
            </div>
        </div>
    );
}

const MonthlyPlanCard: React.FC<{ monthData: MonthlyBreakdown; onDiveDeeper: (topic: string) => void; }> = ({ monthData, onDiveDeeper }) => {
    const { t } = useLanguage();
    return (
     <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200/80 mb-6">
        <div className="flex items-center mb-5">
            <div className="bg-brandBlue/10 text-brandBlue rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center font-bold font-poppins text-xl mr-4">{monthData.month}</div>
            <div>
                <h3 className="text-2xl font-bold font-poppins text-brandText">{t('plan.month')} {monthData.month}</h3>
                <p className="text-md text-gray-600 italic">{monthData.focus}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {monthData.weeklyGoals.map((week, index) => (
                <WeeklyGoalCard key={index} weekData={week} onDiveDeeper={onDiveDeeper} />
            ))}
        </div>
    </div>
    );
};

const StudyPlanDisplay: React.FC<StudyPlanDisplayProps> = ({ plan, onDiveDeeper }) => {
  const { t } = useLanguage();
  return (
    <section aria-labelledby="study-plan-title" className="animate-fade-in">
        <header className="text-center mb-10">
            <h2 id="study-plan-title" className="text-3xl md:text-4xl font-extrabold font-poppins text-brandText">{plan.planTitle || t('plan.title')}</h2>
            <p className="mt-2 text-lg text-gray-600">{t('plan.subtitle')}</p>
        </header>
        <div>
            {plan.monthlyBreakdown.map((monthData, index) => (
                <MonthlyPlanCard key={index} monthData={monthData} onDiveDeeper={onDiveDeeper} />
            ))}
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fade-in 0.5s ease-out forwards;
            }
        `}</style>
    </section>
  );
};

export default StudyPlanDisplay;
