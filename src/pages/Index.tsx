import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatInterface from "@/components/ChatInterface";

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
        <ChatInterface onBack={handleBack} />
      )}
    </>
  );
};

export default Index;
