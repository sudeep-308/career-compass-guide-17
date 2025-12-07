import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import { Answer } from "@/types/career";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionnaireScreenProps {
  onComplete: (answers: Answer[]) => void;
  onBack: () => void;
}

const QuestionnaireScreen = ({ onComplete, onBack }: QuestionnaireScreenProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleOptionSelect = (option: string) => {
    if (question.type === 'single') {
      setSelectedOptions([option]);
    } else {
      setSelectedOptions(prev => 
        prev.includes(option) 
          ? prev.filter(o => o !== option)
          : [...prev, option]
      );
    }
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    const newAnswer: Answer = {
      questionId: question.id,
      answer: question.type === 'single' ? selectedOptions[0] : selectedOptions
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      onComplete(updatedAnswers);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOptions([]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) {
      onBack();
    } else {
      setCurrentQuestion(prev => prev - 1);
      const prevAnswer = answers[currentQuestion - 1];
      if (prevAnswer) {
        setSelectedOptions(Array.isArray(prevAnswer.answer) ? prevAnswer.answer : [prevAnswer.answer]);
        setAnswers(prev => prev.slice(0, -1));
      }
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header with Progress */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button 
              onClick={handlePrevious}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      {/* Question Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full animate-fade-up" key={currentQuestion}>
          {/* Category Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 capitalize">
            {question.category}
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {question.question}
          </h2>
          
          {question.type === 'multiple' && (
            <p className="text-muted-foreground mb-8">
              Select all that apply
            </p>
          )}

          {/* Options */}
          <div className="grid gap-3 mt-8">
            {question.options.map((option, index) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all duration-300 border-2",
                    "hover:shadow-soft hover:-translate-y-0.5",
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-glow" 
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                      isSelected 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : "border-muted-foreground/30"
                    )}>
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className={cn(
                      "font-medium",
                      isSelected ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <div className="mt-10 flex justify-end">
            <Button 
              variant="hero" 
              size="lg"
              onClick={handleNext}
              disabled={selectedOptions.length === 0}
              className="group"
            >
              {isLastQuestion ? 'See My Results' : 'Continue'}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionnaireScreen;
