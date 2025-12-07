import { useState, useEffect } from "react";
import { Answer, CareerResult } from "@/types/career";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionnaireScreen from "@/components/QuestionnaireScreen";
import LoadingScreen from "@/components/LoadingScreen";
import ResultsScreen from "@/components/ResultsScreen";
import { analyzeCareerPath } from "@/utils/careerAnalyzer";

type AppState = 'welcome' | 'questionnaire' | 'loading' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<CareerResult | null>(null);

  const handleStart = () => {
    setAppState('questionnaire');
  };

  const handleQuestionnaireComplete = (completedAnswers: Answer[]) => {
    setAnswers(completedAnswers);
    setAppState('loading');
  };

  const handleBack = () => {
    setAppState('welcome');
  };

  const handleRestart = () => {
    setAnswers([]);
    setResult(null);
    setAppState('welcome');
  };

  // Process answers when in loading state
  useEffect(() => {
    if (appState === 'loading' && answers.length > 0) {
      // Simulate AI processing time
      const timer = setTimeout(() => {
        const analysisResult = analyzeCareerPath(answers);
        setResult(analysisResult);
        setAppState('results');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [appState, answers]);

  return (
    <>
      {appState === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      {appState === 'questionnaire' && (
        <QuestionnaireScreen 
          onComplete={handleQuestionnaireComplete} 
          onBack={handleBack}
        />
      )}
      {appState === 'loading' && (
        <LoadingScreen />
      )}
      {appState === 'results' && result && (
        <ResultsScreen result={result} onRestart={handleRestart} />
      )}
    </>
  );
};

export default Index;
