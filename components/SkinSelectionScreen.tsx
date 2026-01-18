import React from 'react';
import { SkinTone } from '../types';
import { User, Check } from 'lucide-react';

interface SkinSelectionScreenProps {
  onSelect: (tone: SkinTone) => void;
}

const SkinSelectionScreen: React.FC<SkinSelectionScreenProps> = ({ onSelect }) => {
  const tones: { id: SkinTone; label: string; color: string; desc: string }[] = [
    { id: 'light', label: 'Светлый', color: '#F5D0C5', desc: 'Тип I-II' },
    { id: 'medium', label: 'Средний', color: '#C58C68', desc: 'Тип III-IV' },
    { id: 'dark', label: 'Темный', color: '#5E4032', desc: 'Тип V-VI' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-fade-in-up">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-blue-50 text-apple-blue rounded-3xl flex items-center justify-center mx-auto mb-6">
          <User className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-apple-dark mb-4">
          Калибровка
        </h2>
        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
          Выберите ваш фототип кожи для уточнения демографической группы. Это помогает алгоритму использовать более релевантные статистические данные.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {tones.map((tone) => (
          <button
            key={tone.id}
            onClick={() => onSelect(tone.id)}
            className="group relative flex flex-col items-center p-8 bg-white rounded-3xl border-2 border-gray-100 hover:border-apple-blue shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div 
              className="w-24 h-24 rounded-full mb-6 shadow-inner border-4 border-white"
              style={{ backgroundColor: tone.color }}
            />
            <h3 className="text-xl font-semibold text-apple-dark mb-1">
              {tone.label}
            </h3>
            <p className="text-sm text-gray-400">
              {tone.desc}
            </p>
            
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 bg-apple-blue rounded-full flex items-center justify-center text-white">
                <Check className="w-4 h-4" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkinSelectionScreen;