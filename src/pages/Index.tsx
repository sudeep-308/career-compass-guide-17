import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import CareerForm from "@/components/CareerForm";

type AppState = 'welcome' | 'chat';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('welcome');

  const handleStart = () => {
    setAppState('chat');
  };

  const handleBack = () => {
    setAppState('welcome');
  };

  return (
    <>
      {appState === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      {appState === 'chat' && (
        <CareerForm onBack={handleBack} />
      )}
    </>
  );
};

export default Index;
