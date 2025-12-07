import { Button } from "@/components/ui/button";
import { Compass, Target, Sparkles, ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Career Guidance</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Find Your Perfect
            <span className="block gradient-primary bg-clip-text text-transparent">
              Career Path
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Confused about your future? Let us help you discover careers that match 
            your unique strengths, interests, and goals with a personalized roadmap.
          </p>

          {/* CTA Button */}
          <Button 
            variant="hero" 
            size="xl" 
            onClick={onStart}
            className="group"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Trust Badge */}
          <p className="mt-6 text-sm text-muted-foreground">
            ✨ Takes only 5 minutes • 100% Free • Personalized Results
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <FeatureCard 
              icon={<Compass className="w-6 h-6" />}
              title="Discover Yourself"
              description="Answer thoughtful questions about your interests, strengths, and aspirations"
            />
            <FeatureCard 
              icon={<Target className="w-6 h-6" />}
              title="Get Matched"
              description="AI analyzes your responses to find careers that truly fit you"
            />
            <FeatureCard 
              icon={<Sparkles className="w-6 h-6" />}
              title="Your Roadmap"
              description="Receive a step-by-step plan for 1, 3, and 5 years ahead"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        Built with care to help students navigate their career journey
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="p-6 rounded-2xl bg-card shadow-card border border-border/50 text-left hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default WelcomeScreen;
