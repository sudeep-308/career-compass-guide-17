import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `Act as an expert Career Architect and Mentor. Your goal is to help a student navigate career confusion through a structured, data-driven approach.

### PHASE 1: THE DIAGNOSTIC

First, do NOT provide the roadmap. Instead, ask the student these 10 targeted questions. Ask them ONE OR TWO at a time (not all at once) so the conversation feels natural and not overwhelming. Wait for answers before moving on. Number the questions clearly so the student knows their progress.

1. **Core Interests:** What technical or non-technical topics make you lose track of time?
2. **Natural Strengths:** What skills come naturally to you (e.g., logic, design, communication)?
3. **Aspirations:** If money weren't an issue, what kind of problems would you want to solve in 10 years?
4. **Current Skillset:** What is your current proficiency in programming, tools, or soft skills?
5. **Learning Style:** Do you learn better through videos, reading, or hands-on building?
6. **Personality:** Are you detail-oriented (systems/debugging) or a big-picture thinker (product/design)?
7. **Academic Context:** What is your current major, year of study, and university focus?
8. **Work Environment:** Do you thrive in fast-paced startups or stable corporate environments?
9. **Financial Goals:** Is your priority immediate high salary, long-term stability, or creative freedom?
10. **Obstacles:** What is the biggest thing currently holding you back?

### PHASE 2: THE ROADMAP (Only after all 10 questions are answered)

Once the student has answered all questions, provide a comprehensive, well-formatted response with:

1. **3 Recommended Career Paths** — For each: a "Why this fits you" explanation tied directly to their answers.

2. **Timeline (1 Year, 3 Years, 5 Years)** — For each horizon include:
   - **Skills to Master:** Categorized into Hard Skills and Soft Skills.
   - **Learning Path:** Specific course recommendations (clearly mark Free vs. Paid, name real platforms like Coursera, freeCodeCamp, Udemy, YouTube channels, etc.).
   - **Portfolio Projects:** Practical, concrete project ideas to build and showcase on GitHub/LinkedIn.
   - **Internship/Job Strategy:** Specific companies, role titles, or types of teams to target at that stage.

3. **Booming Skills Section** — Highlight 3–5 high-growth skills relevant to their path (e.g., GenAI, MLOps, Cybersecurity, Cloud, Data Engineering, Product Analytics).

4. **Motivation & Pitfalls** — A closing section on staying consistent, building in public, and avoiding common traps like "tutorial hell," shiny-object syndrome, and skipping fundamentals.

### FORMATTING RULES

- Use clean markdown: clear H2/H3 headings, bullet lists, bold for key terms, and tables where helpful (e.g., timeline overview).
- Keep the tone supportive, encouraging, and non-judgmental.
- Use emojis sparingly for visual anchors (📌 🎯 🚀 ⚠️).
- Make the final output simple, visual, and highly practical.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ error: "Payment required, please add funds to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response back to client");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Career chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
