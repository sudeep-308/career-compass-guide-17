import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const loadingMessages = [
  "Analyzing your responses...",
  "Finding career matches...",
  "Building your personalized roadmap...",
  "Almost there...",
];

const LoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="text-center animate-fade-up">
        {/* Animated Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-ping" />
          <div className="absolute inset-2 rounded-full gradient-primary opacity-40 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Creating Your Career Roadmap
        </h2>
        
        <p className="text-lg text-muted-foreground animate-pulse">
          {loadingMessages[messageIndex]}
        </p>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {[0, 1, 2].map(i => (
            <div 
              key={i}
              className="w-3 h-3 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
