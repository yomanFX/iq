import React from 'react';
import { ArrowRight, Brain } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 animate-fade-in-up">
      <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 border border-gray-100">
        <Brain className="w-12 h-12 text-apple-blue" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-apple-dark mb-4 tracking-tight">
        Тест на IQ
      </h1>
      
      <p className="text-lg md:text-xl text-gray-500 max-w-xl mb-12 leading-relaxed">
        Пройдите этот профессиональный тест из 6 вопросов, чтобы узнать свой приблизительный коэффициент интеллекта. Учитывается точность ответов и время реакции.
      </p>
      
      <button 
        onClick={onStart}
        className="group relative flex items-center justify-center gap-3 bg-apple-blue text-white px-10 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:bg-blue-600"
      >
        Начать Тест
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>

      <div className="mt-16 text-sm text-gray-400">
        Включает таймер &bull; Логика и анализ
      </div>
    </div>
  );
};

export default Welcome;
