import React from 'react';
import { Question } from './types';
import { 
  Square, 
  Circle, 
  Triangle, 
  Hexagon, 
  Box, 
  Layers, 
  Hash,
  ArrowRight,
  HelpCircle,
  Disc
} from 'lucide-react';

export const QUESTIONS: Question[] = [
  {
    id: 'q1_sequence',
    title: 'Числовая последовательность',
    subtitle: 'Продолжите ряд: 1, 1, 2, 3, 5, 8, ...',
    options: [
      { id: '11', label: '11', isCorrect: false, icon: <Hash className="w-6 h-6 text-gray-500" /> },
      { id: '12', label: '12', isCorrect: false, icon: <Hash className="w-6 h-6 text-gray-500" /> },
      { id: '13', label: '13', isCorrect: true, description: 'Сумма двух предыдущих (Фибоначчи)', icon: <Hash className="w-6 h-6 text-gray-500" /> },
      { id: '15', label: '15', isCorrect: false, icon: <Hash className="w-6 h-6 text-gray-500" /> },
    ]
  },
  {
    id: 'q2_analogy',
    title: 'Аналогия',
    subtitle: 'Квадрат относится к Кубу, как Круг относится к ...',
    options: [
      { id: 'oval', label: 'Овалу', isCorrect: false, icon: <Circle className="w-6 h-6 text-gray-500 scale-y-75" /> },
      { id: 'sphere', label: 'Сфере', isCorrect: true, description: '3D эквивалент круга', icon: <Circle className="w-6 h-6 text-gray-500" /> },
      { id: 'cylinder', label: 'Цилиндру', isCorrect: false, icon: <Layers className="w-6 h-6 text-gray-500" /> },
      { id: 'triangle', label: 'Треугольнику', isCorrect: false, icon: <Triangle className="w-6 h-6 text-gray-500" /> },
    ]
  },
  {
    id: 'q3_logic',
    title: 'Логический вывод',
    subtitle: 'Если все Блупы — это Разии, а все Разии — это Лазии, то...',
    options: [
      { id: 'opt1', label: 'Все Блупы — Лазии', isCorrect: true, icon: <ArrowRight className="w-6 h-6 text-gray-500" /> },
      { id: 'opt2', label: 'Некоторые Лазии — Блупы', isCorrect: false, icon: <ArrowRight className="w-6 h-6 text-gray-500" /> },
      { id: 'opt3', label: 'Нет связи', isCorrect: false, icon: <HelpCircle className="w-6 h-6 text-gray-500" /> },
      { id: 'opt4', label: 'Все Лазии — Блупы', isCorrect: false, icon: <ArrowRight className="w-6 h-6 text-gray-500" /> },
    ]
  },
  {
    id: 'q4_odd_one_out',
    title: 'Лишнее слово',
    subtitle: 'Какое слово не подходит по смыслу?',
    options: [
      { id: 'carrot', label: 'Морковь', isCorrect: false, icon: <Disc className="w-6 h-6 text-gray-400" /> },
      { id: 'potato', label: 'Картофель', isCorrect: false, icon: <Disc className="w-6 h-6 text-gray-400" /> },
      { id: 'onion', label: 'Лук', isCorrect: false, icon: <Disc className="w-6 h-6 text-gray-400" /> },
      { id: 'apple', label: 'Яблоко', isCorrect: true, description: 'Это фрукт, остальные овощи', icon: <Disc className="w-6 h-6 text-gray-400" /> },
    ]
  },
  {
    id: 'q5_math_pattern',
    title: 'Сложный ряд',
    subtitle: 'Какое число следует дальше: 7, 10, 8, 11, 9, 12, ...',
    options: [
      { id: '10', label: '10', isCorrect: true, description: 'Закономерность: +3, -2', icon: <Hash className="w-6 h-6 text-gray-500" /> },
      { id: '13', label: '13', isCorrect: false, icon: <Hash className="w-6 h-6 text-gray-500" /> },
      { id: '7', label: '7', isCorrect: false, icon: <Hash className="w-6 h-6 text-gray-500" /> },
      { id: '14', label: '14', isCorrect: false, icon: <Hash className="w-6 h-6 text-gray-500" /> },
    ]
  },
  {
    id: 'q6_spatial',
    title: 'Пространственное мышление',
    subtitle: 'Сколько углов у гексагона?',
    options: [
      { id: '4', label: 'Четыре', isCorrect: false, icon: <Square className="w-6 h-6 text-gray-500" /> },
      { id: '5', label: 'Пять', isCorrect: false, icon: <Triangle className="w-6 h-6 text-gray-500" /> },
      { id: '6', label: 'Шесть', isCorrect: true, icon: <Hexagon className="w-6 h-6 text-gray-500" /> },
      { id: '8', label: 'Восемь', isCorrect: false, icon: <Box className="w-6 h-6 text-gray-500" /> },
    ]
  }
];