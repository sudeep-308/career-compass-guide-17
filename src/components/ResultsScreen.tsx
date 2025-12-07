import { useState } from "react";
import { CareerResult, RoadmapItem } from "@/types/career";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Target, 
  BookOpen, 
  Code, 
  Briefcase, 
  TrendingUp,
  AlertTriangle,
  Heart,
  RotateCcw,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsScreenProps {
  result: CareerResult;
  onRestart: () => void;
}

const ResultsScreen = ({ result, onRestart }: ResultsScreenProps) => {
  const [activeTab, setActiveTab] = useState("1year");

  const getItemIcon = (type: RoadmapItem['type']) => {
    switch (type) {
      case 'skill': return <Target className="w-5 h-5" />;
      case 'course': return <BookOpen className="w-5 h-5" />;
      case 'project': return <Code className="w-5 h-5" />;
      case 'internship': return <Briefcase className="w-5 h-5" />;
      case 'book': return <BookOpen className="w-5 h-5" />;
      case 'opportunity': return <TrendingUp className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: RoadmapItem['priority']) => {
    switch (priority) {
      case 'high': return 'bg-accent/10 text-accent border-accent/20';
      case 'medium': return 'bg-primary/10 text-primary border-primary/20';
      case 'low': return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen gradient-hero pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Your Career Roadmap</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onRestart}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Career Matches Section */}
        <section className="mb-12 animate-fade-up">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Your Top Career Matches
          </h2>
          <p className="text-muted-foreground mb-6">
            Based on your unique combination of interests, strengths, and goals
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {result.careers.map((career, index) => (
              <div 
                key={index}
                className={cn(
                  "p-6 rounded-2xl bg-card shadow-card border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow",
                  index === 0 && "md:col-span-3 md:flex md:items-start md:gap-6"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 md:mb-0",
                  index === 0 ? "gradient-primary" : "bg-secondary"
                )}>
                  {career.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-foreground">{career.title}</h3>
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {career.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{career.description}</p>
                  <div className="space-y-2">
                    {career.reasons.slice(0, index === 0 ? 4 : 2).map((reason, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="mb-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Your Step-by-Step Roadmap
          </h2>
          <p className="text-muted-foreground mb-6">
            A practical plan to achieve your career goals
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50">
              <TabsTrigger value="1year" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                Year 1
              </TabsTrigger>
              <TabsTrigger value="3year" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                Year 3
              </TabsTrigger>
              <TabsTrigger value="5year" className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                Year 5
              </TabsTrigger>
            </TabsList>

            <TabsContent value="1year" className="space-y-4">
              <RoadmapTimeline items={result.roadmap.year1} getIcon={getItemIcon} getPriorityColor={getPriorityColor} />
            </TabsContent>

            <TabsContent value="3year" className="space-y-4">
              <RoadmapTimeline items={result.roadmap.year3} getIcon={getItemIcon} getPriorityColor={getPriorityColor} />
            </TabsContent>

            <TabsContent value="5year" className="space-y-4">
              <RoadmapTimeline items={result.roadmap.year5} getIcon={getItemIcon} getPriorityColor={getPriorityColor} />
            </TabsContent>
          </Tabs>
        </section>

        {/* Motivation & Mistakes Grid */}
        <div className="grid md:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {/* Motivation Section */}
          <section className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Stay Motivated</h3>
            </div>
            <ul className="space-y-3">
              {result.motivation.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Common Mistakes Section */}
          <section className="p-6 rounded-2xl bg-card shadow-card border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Avoid These Mistakes</h3>
            </div>
            <ul className="space-y-3">
              {result.mistakes.map((mistake, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{mistake}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-muted-foreground mb-4">
            Not satisfied with the results? Try answering differently!
          </p>
          <Button variant="hero" size="lg" onClick={onRestart}>
            <RotateCcw className="w-5 h-5 mr-2" />
            Retake Assessment
          </Button>
        </div>
      </main>
    </div>
  );
};

const RoadmapTimeline = ({ 
  items, 
  getIcon, 
  getPriorityColor 
}: { 
  items: RoadmapItem[]; 
  getIcon: (type: RoadmapItem['type']) => React.ReactNode;
  getPriorityColor: (priority: RoadmapItem['priority']) => string;
}) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <div 
        key={index}
        className="relative pl-8 pb-6 border-l-2 border-border last:pb-0 last:border-transparent"
      >
        {/* Timeline Dot */}
        <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full gradient-primary" />
        
        {/* Card */}
        <div className="p-5 rounded-xl bg-card shadow-soft border border-border/50 hover:shadow-card transition-all duration-300">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
                {getIcon(item.type)}
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium border",
                    getPriorityColor(item.priority)
                  )}>
                    {item.priority} priority
                  </span>
                  {item.isFree !== undefined && (
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      item.isFree ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                    )}>
                      {item.isFree ? 'Free' : 'Paid'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              {item.timeline}
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
          {item.resources && item.resources.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.resources.map((resource, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
                >
                  {resource}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ResultsScreen;
