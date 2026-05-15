import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-chat`;

interface CareerFormProps {
  onBack: () => void;
}

const QUESTIONS: { id: keyof Answers; label: string; placeholder: string }[] = [
  { id: "interests", label: "1. Core Interests", placeholder: "What topics make you lose track of time? (e.g. coding, design, psychology)" },
  { id: "strengths", label: "2. Natural Strengths", placeholder: "Skills that come naturally (e.g. logic, design, communication)" },
  { id: "aspirations", label: "3. Aspirations", placeholder: "If money weren't an issue, what problems would you solve in 10 years?" },
  { id: "skillset", label: "4. Current Skillset", placeholder: "Your current proficiency in programming, tools, or soft skills" },
  { id: "learning", label: "5. Learning Style", placeholder: "Videos, reading, or hands-on building?" },
  { id: "personality", label: "6. Personality", placeholder: "Detail-oriented (systems/debugging) or big-picture (product/design)?" },
  { id: "academic", label: "7. Academic Context", placeholder: "Your major, year of study, and university focus" },
  { id: "environment", label: "8. Work Environment", placeholder: "Fast-paced startup or stable corporate?" },
  { id: "financial", label: "9. Financial Goals", placeholder: "High salary, long-term stability, or creative freedom?" },
  { id: "obstacles", label: "10. Obstacles", placeholder: "What's the biggest thing holding you back?" },
];

type Answers = {
  interests: string; strengths: string; aspirations: string; skillset: string;
  learning: string; personality: string; academic: string; environment: string;
  financial: string; obstacles: string;
};

const emptyAnswers: Answers = {
  interests: "", strengths: "", aspirations: "", skillset: "",
  learning: "", personality: "", academic: "", environment: "",
  financial: "", obstacles: "",
};

const CareerForm = ({ onBack }: CareerFormProps) => {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const update = (id: keyof Answers, val: string) =>
    setAnswers(prev => ({ ...prev, [id]: val }));

  const allFilled = Object.values(answers).every(v => v.trim().length > 0);

  const handleSubmit = async () => {
    if (!allFilled || isLoading) return;
    setIsLoading(true);
    setResult("");

    const userContent = QUESTIONS.map(q => `**${q.label}:** ${answers[q.id]}`).join("\n\n");
    const messages = [
      { role: "user", content: `Here are my answers to all 10 diagnostic questions. Please skip the diagnostic phase and go directly to PHASE 2: THE ROADMAP with all sections (3 career paths, 1/3/5 year timeline, booming skills, motivation & pitfalls).\n\n${userContent}` }
    ];

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages }),
      });

      if (resp.status === 429) { toast.error("Rate limit exceeded. Try again shortly."); return; }
      if (resp.status === 402) { toast.error("Service temporarily unavailable."); return; }
      if (!resp.ok || !resp.body) throw new Error("Failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let content = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, idx);
          textBuffer = textBuffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              content += delta;
              setResult(content);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold mt-6 mb-2 text-foreground">{line.slice(4)}</h3>;
      if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-8 mb-3 text-foreground">{line.slice(3)}</h2>;
      if (line.startsWith("# ")) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4 text-foreground">{line.slice(2)}</h1>;
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return <li key={i} className="ml-6 list-disc text-foreground/90">{renderInline(line.slice(2))}</li>;
      }
      if (/^\d+\.\s/.test(line)) {
        return <li key={i} className="ml-6 list-decimal text-foreground/90">{renderInline(line.replace(/^\d+\.\s/, ""))}</li>;
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-foreground/90 mb-2">{renderInline(line)}</p>;
    });
  };

  const renderInline = (text: string) => {
    return text.split("**").map((part, j) =>
      j % 2 === 1 ? <strong key={j} className="text-foreground font-semibold">{part}</strong> : <span key={j}>{part}</span>
    );
  };

  return (
    <div className="min-h-screen gradient-hero">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Career Diagnostic</h1>
              <p className="text-xs text-muted-foreground">Fill in your answers to get a personalized roadmap</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!result && (
          <div className="space-y-5 animate-fade-up">
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-xl font-semibold text-foreground mb-1">Tell us about yourself</h2>
              <p className="text-sm text-muted-foreground">Answer these 10 quick questions — be as honest and specific as you can.</p>
            </div>

            {QUESTIONS.map(q => (
              <div key={q.id} className="bg-card rounded-2xl p-5 border border-border/50 shadow-soft">
                <label className="block font-medium text-foreground mb-2">{q.label}</label>
                <textarea
                  value={answers[q.id]}
                  onChange={e => update(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  disabled={isLoading}
                />
              </div>
            ))}

            <Button
              variant="hero"
              size="xl"
              onClick={handleSubmit}
              disabled={!allFilled || isLoading}
              className="w-full"
            >
              {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin" /> Generating your roadmap...</>) : "Get My Career Roadmap"}
            </Button>
            {!allFilled && (
              <p className="text-center text-sm text-muted-foreground">Please fill in all 10 questions to continue.</p>
            )}
          </div>
        )}

        {result && (
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card animate-fade-up">
            <div className="prose prose-sm max-w-none">
              {renderMarkdown(result)}
            </div>
            {!isLoading && (
              <div className="mt-8 flex gap-3">
                <Button variant="outline" onClick={() => { setResult(""); setAnswers(emptyAnswers); }}>
                  Start Over
                </Button>
                <Button variant="hero" onClick={onBack}>Back to Home</Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CareerForm;
