import React, { useEffect, useState } from 'react';
import { UserSelections } from '../types';
import { Share2, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { QUESTIONS } from '../constants';
import * as d3 from 'd3';

interface ResultScreenProps {
  selections: UserSelections;
  totalTime: number; // in seconds
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ selections, totalTime, onRestart }) => {
  const [displayedIQ, setDisplayedIQ] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate Score
  let correctCount = 0;
  Object.values(selections).forEach(option => {
    if (option.isCorrect) correctCount++;
  });

  // Strict IQ Logic
  let calculatedIQ = 0;
  if (correctCount < 3) {
    calculatedIQ = 70 + (correctCount * 5); 
  } else {
    const baseIQ = 90 + ((correctCount - 3) * 10);
    const timeDelta = 45 - totalTime;
    calculatedIQ = baseIQ + timeDelta;
  }

  // Clamping
  if (calculatedIQ > 148) calculatedIQ = 148;
  if (calculatedIQ < 70) calculatedIQ = 70;

  useEffect(() => {
    const duration = 2500;
    const iqInterpolator = d3.interpolateNumber(70, calculatedIQ);

    const timer = d3.timer((elapsed) => {
      const t = Math.min(1, elapsed / duration);
      const easeT = d3.easeCubicOut(t);
      setDisplayedIQ(Math.round(iqInterpolator(easeT)));

      if (t >= 1) {
        timer.stop();
        setTimeout(() => setShowDetails(true), 500);
      }
    });

    return () => timer.stop();
  }, [calculatedIQ]);

  const getWittyComment = (iq: number) => {
    if (iq >= 140) return "Вы, случайно, не переписываете код Вселенной по выходным?";
    if (iq >= 130) return "Ваш мозг — суперкомпьютер. Осторожно, не перегрейтесь.";
    if (iq >= 120) return "Острее бритвы Оккама. Вы видите решения, которые другие не замечают.";
    if (iq >= 110) return "Отличный результат! Вы тот самый друг, который объясняет правила настолок.";
    if (iq >= 100) return "Золотая середина. Соль земли и двигатель прогресса.";
    if (iq >= 90) return "Нормально. Главное не победа, а участие (и здравый смысл).";
    if (iq >= 80) return "Вы не любите усложнять. Простые решения — самые надежные.";
    return "Эйнштейн тоже плохо учился в школе (это миф, но вам будет приятно).";
  };

  const getLabel = (iq: number) => {
    if (iq >= 135) return { text: "Гениальность", color: "text-purple-600", bg: "bg-purple-50" };
    if (iq >= 120) return { text: "Высокий интеллект", color: "text-blue-600", bg: "bg-blue-50" };
    if (iq >= 100) return { text: "Средний уровень", color: "text-green-600", bg: "bg-green-50" };
    if (iq >= 85) return { text: "Ниже среднего", color: "text-orange-600", bg: "bg-orange-50" };
    return { text: "Низкий результат", color: "text-red-600", bg: "bg-red-50" };
  };

  const label = getLabel(calculatedIQ);
  const wittyComment = getWittyComment(calculatedIQ);

  // Distribution Chart Calculation
  const minIQ = 55;
  const maxIQ = 165;
  const percentilePosition = Math.min(100, Math.max(0, ((displayedIQ - minIQ) / (maxIQ - minIQ)) * 100));

  const handleShare = async () => {
    const shareData = {
      title: 'Мой IQ результат',
      text: `Я прошел тест и мой IQ равен ${Math.round(calculatedIQ)}! ${wittyComment}`,
      url: window.location.href.startsWith('http') ? window.location.href : undefined
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Fallback
      alert(`Ваш результат: ${calculatedIQ}. Скриншот приветствуется!`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-20 animate-fade-in pt-8">
      
      {/* Main Result Card */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden mb-8 border border-gray-100">
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          
          <div className={`mb-8 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${label.bg} ${label.color}`}>
            {label.text}
          </div>

          <h2 className="text-gray-400 text-lg font-medium mb-2 uppercase tracking-widest text-xs">
            Ваш результат
          </h2>
          
          <div className="relative mb-6">
             <h1 className="text-9xl font-bold text-apple-dark tracking-tighter leading-none">
              {displayedIQ}
            </h1>
          </div>

          <p className="text-lg font-medium text-apple-dark max-w-lg mx-auto mb-10 italic">
            "{wittyComment}"
          </p>

          {/* Visualization Graph */}
          <div className="w-full max-w-md mb-12">
             <div className="flex justify-between text-xs font-bold text-gray-300 uppercase mb-2">
               <span>Низкий</span>
               <span>Средний</span>
               <span>Высокий</span>
             </div>
             <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden">
               {/* Gradient Background representing distribution */}
               <div className="absolute inset-0 bg-gradient-to-r from-red-300 via-green-300 to-purple-400 opacity-50"></div>
               {/* Vertical markers */}
               <div className="absolute top-0 bottom-0 w-0.5 bg-white left-[25%]"></div>
               <div className="absolute top-0 bottom-0 w-0.5 bg-white left-[50%]"></div>
               <div className="absolute top-0 bottom-0 w-0.5 bg-white left-[75%]"></div>
             </div>
             
             {/* Pointer */}
             <div className="relative h-6 w-full mt-1">
               <div 
                  className="absolute top-0 transform -translate-x-1/2 transition-all duration-300 flex flex-col items-center"
                  style={{ left: `${percentilePosition}%` }}
               >
                 <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-apple-dark"></div>
                 <div className="text-[10px] font-bold text-apple-dark mt-1 bg-white px-1.5 py-0.5 rounded shadow-sm border border-gray-100">
                   ВЫ
                 </div>
               </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-10">
             <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Точность</div>
                <div className="text-3xl font-bold text-apple-dark">{correctCount} / 6</div>
             </div>
             <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Время</div>
                <div className="text-3xl font-bold text-apple-dark">{totalTime}с</div>
             </div>
          </div>

          <div className="w-full h-px bg-gray-100 mb-8"></div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <button 
              onClick={handleShare}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-apple-dark border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all active:scale-95"
            >
              <Share2 className="w-5 h-5" /> Поделиться
            </button>
            <button 
              onClick={onRestart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-apple-dark text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <RefreshCw className="w-5 h-5" /> Пройти снова
            </button>
          </div>
        </div>
      </div>

      {/* Breakdown Section */}
      <div className={`transition-all duration-1000 transform ${showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h3 className="text-center text-gray-400 mb-6 font-medium text-sm uppercase tracking-widest">Детализация ответов</h3>

        <div className="space-y-4">
          {Object.entries(selections).map(([questionId, option]) => {
            const question = QUESTIONS.find(q => q.id === questionId);
            return (
              <div key={questionId} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${option.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {option.isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{question?.title}</div>
                    <div className="text-base font-semibold text-apple-dark leading-tight">{option.label}</div>
                  </div>
                </div>
                {option.description && (
                  <div className="hidden sm:block text-sm text-gray-400 max-w-[200px] text-right leading-tight">
                    {option.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;