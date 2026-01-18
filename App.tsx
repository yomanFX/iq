import React, { useState } from 'react';
import Welcome from './components/Welcome';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { QUESTIONS } from './constants';
import { Option, UserSelections, Question } from './types';

enum AppState {
  WELCOME,
  QUESTIONS,
  CALCULATING,
  RESULT
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSelections, setUserSelections] = useState<UserSelections>({});
  
  // Timer State
  const [startTime, setStartTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  const handleStart = () => {
    // Shuffle questions when starting
    setQuestions(shuffleArray(QUESTIONS));
    setAppState(AppState.QUESTIONS);
    setCurrentQuestionIndex(0);
    setUserSelections({});
    setStartTime(Date.now());
  };

  const handleOptionSelect = (option: Option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newSelections = { ...userSelections, [currentQuestion.id]: option };
    setUserSelections(newSelections);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    } else {
      // Calculate total time
      const endTime = Date.now();
      setTotalTime(Math.round((endTime - startTime) / 1000));
      
      setAppState(AppState.CALCULATING);
      setTimeout(() => {
        setAppState(AppState.RESULT);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2500);
    }
  };

  const handleRestart = () => {
    setAppState(AppState.WELCOME);
    setUserSelections({});
    setCurrentQuestionIndex(0);
    setTotalTime(0);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-apple-blue selection:text-white pb-12">
      {/* Header / Nav */}
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <div className="text-xl font-bold tracking-tight text-apple-dark flex items-center gap-2">
          <div className="w-3 h-3 bg-apple-blue rounded-full"></div>
          IQ Test
        </div>
      </nav>

      <main className="container mx-auto max-w-4xl">
        {appState === AppState.WELCOME && (
          <Welcome onStart={handleStart} />
        )}

        {appState === AppState.QUESTIONS && questions.length > 0 && (
          <QuestionScreen 
            question={questions[currentQuestionIndex]}
            onSelect={handleOptionSelect}
            currentStep={currentQuestionIndex + 1}
            totalSteps={questions.length}
          />
        )}

        {appState === AppState.CALCULATING && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-t-4 border-apple-blue rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-t-4 border-gray-200 rounded-full opacity-30"></div>
            </div>
            <h2 className="text-3xl font-bold text-apple-dark animate-pulse mb-3">Обработка...</h2>
            <p className="text-gray-400 text-lg">Анализ паттернов и времени реакции</p>
          </div>
        )}

        {appState === AppState.RESULT && (
          <ResultScreen 
            selections={userSelections} 
            totalTime={totalTime}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

export default App;