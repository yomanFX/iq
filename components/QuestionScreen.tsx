import React, { useEffect, useState, useMemo } from 'react';
import { Question, Option } from '../types';
import { ChevronRight, Clock } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  onSelect: (option: Option) => void;
  currentStep: number;
  totalSteps: number;
}

// Fisher-Yates shuffle
function shuffleOptions(array: Option[]): Option[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ question, onSelect, currentStep, totalSteps }) => {
  const [seconds, setSeconds] = useState(0);

  // Memoize shuffled options so they don't reshuffle on timer tick
  const shuffledOptions = useMemo(() => {
    return shuffleOptions(question.options);
  }, [question]);

  useEffect(() => {
    setSeconds(0);
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [question]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-8 animate-fade-in-up">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm font-medium text-gray-400">
          Вопрос {currentStep} из {totalSteps}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-apple-blue bg-blue-50 px-3 py-1 rounded-full">
          <Clock className="w-4 h-4" />
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
        </div>
      </div>

      <div className="w-full h-1.5 bg-gray-200 rounded-full mb-12 overflow-hidden">
        <div 
          className="h-full bg-apple-blue rounded-full transition-all duration-700 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Question Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-apple-dark mb-3 tracking-tight">
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="text-lg text-gray-500">
            {question.subtitle}
          </p>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shuffledOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className="group flex flex-col items-start p-6 bg-white rounded-2xl border-2 border-transparent hover:border-apple-blue shadow-sm hover:shadow-md transition-all duration-200 text-left"
          >
            <div className="mb-4 p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
              {option.icon}
            </div>
            <div className="font-semibold text-lg text-apple-dark mb-1">
              {option.label}
            </div>
            
            <div className="mt-auto pt-4 flex items-center text-apple-blue opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
              Выбрать <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionScreen;