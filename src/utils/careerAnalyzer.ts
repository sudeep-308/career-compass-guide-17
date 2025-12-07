import { Answer, CareerResult, CareerPath, Roadmap, RoadmapItem } from "@/types/career";

// Career path definitions based on common answer patterns
const careerPaths: Record<string, CareerPath> = {
  software_engineer: {
    title: "Software Engineer",
    description: "Build innovative software solutions and shape the future of technology. Perfect for problem-solvers who love coding.",
    matchScore: 0,
    reasons: [
      "Your analytical thinking aligns with programming logic",
      "You enjoy building and creating functional solutions",
      "Technology interests match this career path",
      "Problem-solving is at the core of software engineering"
    ],
    icon: "💻"
  },
  data_scientist: {
    title: "Data Scientist",
    description: "Uncover insights from data to drive business decisions. Ideal for those who love numbers and patterns.",
    matchScore: 0,
    reasons: [
      "Your interest in patterns and analysis is a perfect fit",
      "Math and science background provides strong foundation",
      "Research skills translate well to data exploration",
      "You can make data-driven impact on organizations"
    ],
    icon: "📊"
  },
  ux_designer: {
    title: "UX/UI Designer",
    description: "Create beautiful, user-friendly digital experiences. Great for creative minds who care about people.",
    matchScore: 0,
    reasons: [
      "Your creative abilities shine in design work",
      "Empathy for users drives better experiences",
      "Visual thinking helps in interface design",
      "Technology skills enhance design execution"
    ],
    icon: "🎨"
  },
  product_manager: {
    title: "Product Manager",
    description: "Lead product strategy and bring ideas to life. Perfect for natural leaders with diverse skills.",
    matchScore: 0,
    reasons: [
      "Leadership qualities essential for this role",
      "Communication skills help coordinate teams",
      "Strategic thinking drives product success",
      "Business acumen supports decision-making"
    ],
    icon: "🚀"
  },
  marketing_specialist: {
    title: "Digital Marketing Specialist",
    description: "Drive brand growth through creative campaigns. Ideal for communicators who understand people.",
    matchScore: 0,
    reasons: [
      "Strong communication skills are essential",
      "Creativity fuels effective campaigns",
      "Understanding of people improves targeting",
      "Analytical skills measure campaign success"
    ],
    icon: "📱"
  },
  entrepreneur: {
    title: "Entrepreneur / Startup Founder",
    description: "Build your own business and create impact. Perfect for independent thinkers with big dreams.",
    matchScore: 0,
    reasons: [
      "Your drive for independence suits entrepreneurship",
      "Leadership skills help build and manage teams",
      "Risk-taking ability essential for startups",
      "Vision and goal orientation drive success"
    ],
    icon: "💡"
  },
  consultant: {
    title: "Business Consultant",
    description: "Solve complex business problems for top organizations. Great for analytical minds with people skills.",
    matchScore: 0,
    reasons: [
      "Problem-solving abilities are highly valued",
      "Communication skills facilitate client relationships",
      "Analytical thinking drives strategic recommendations",
      "Diverse interests help across industries"
    ],
    icon: "📋"
  },
  educator: {
    title: "Educator / Trainer",
    description: "Shape minds and inspire the next generation. Perfect for patient communicators who love sharing knowledge.",
    matchScore: 0,
    reasons: [
      "Patience and empathy essential for teaching",
      "Communication skills make concepts accessible",
      "Desire to help others drives this career",
      "Subject expertise forms the foundation"
    ],
    icon: "📚"
  }
};

// Scoring rules based on answer patterns
const scoringRules: Record<string, Record<string, number>> = {
  software_engineer: {
    "Solving puzzles and logical problems": 3,
    "Mathematics and Sciences": 2,
    "Technology and Computers": 3,
    "Problem-solving abilities": 3,
    "Technical skills": 3,
    "Programming and technical skills": 3,
    "Building apps or websites": 3,
    "Hands-on practice and projects": 2,
    "Break them down into smaller tasks": 2,
    "Working on cutting-edge technology": 3
  },
  data_scientist: {
    "Solving puzzles and logical problems": 3,
    "Analyzing data and patterns": 3,
    "Mathematics and Sciences": 3,
    "Technology and Computers": 2,
    "Problem-solving abilities": 2,
    "Technical skills": 2,
    "Analytical and research skills": 3,
    "Scientific research and experiments": 3,
    "Research lab or quiet space": 2,
    "Take time to think and plan": 2
  },
  ux_designer: {
    "Creating art, writing, or designing": 3,
    "Arts and Literature": 2,
    "Creativity and imagination": 3,
    "Creative studio or workshop": 3,
    "Design and creative skills": 3,
    "Creating content and media": 2,
    "Watching video tutorials": 2,
    "Jump in and figure it out": 1,
    "Work-life balance and flexibility": 2
  },
  product_manager: {
    "Leading teams and organizing events": 3,
    "Business and Economics": 2,
    "Leadership qualities": 3,
    "Communication skills": 2,
    "Dynamic startup environment": 2,
    "Leadership and management": 3,
    "Group discussions and workshops": 2,
    "Stay calm and adapt quickly": 2,
    "Senior position at a top company": 3
  },
  marketing_specialist: {
    "Creating art, writing, or designing": 2,
    "Languages and Communication": 3,
    "Communication skills": 3,
    "Creativity and imagination": 2,
    "Marketing and sales": 3,
    "Creating content and media": 3,
    "Traditional office with a team": 1,
    "Recognition and leadership position": 2,
    "Constantly traveling and exploring": 1
  },
  entrepreneur: {
    "Leading teams and organizing events": 2,
    "Business and Economics": 3,
    "Leadership qualities": 2,
    "Dynamic startup environment": 3,
    "Building my own business": 3,
    "Starting a business venture": 3,
    "Jump in and figure it out": 2,
    "Running my own successful business": 3,
    "High salary and financial security": 1
  },
  consultant: {
    "Solving puzzles and logical problems": 2,
    "Business and Economics": 3,
    "Social Sciences and Psychology": 2,
    "Problem-solving abilities": 3,
    "Communication skills": 2,
    "Analytical and research skills": 2,
    "Learning from mentors": 2,
    "Take time to think and plan": 2,
    "Senior position at a top company": 2
  },
  educator: {
    "Helping and mentoring others": 3,
    "Social Sciences and Psychology": 2,
    "Patience and empathy": 3,
    "Communication skills": 2,
    "Communication and presentation": 2,
    "Teaching or training others": 3,
    "Organizing community events": 2,
    "Making a positive impact on society": 3,
    "Group discussions and workshops": 2
  }
};

export function analyzeCareerPath(answers: Answer[]): CareerResult {
  // Calculate scores for each career path
  const scores: Record<string, number> = {};
  Object.keys(careerPaths).forEach(path => scores[path] = 0);

  // Process each answer
  answers.forEach(answer => {
    const answerValues = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
    
    answerValues.forEach(value => {
      Object.entries(scoringRules).forEach(([career, rules]) => {
        if (rules[value]) {
          scores[career] += rules[value];
        }
      });
    });
  });

  // Normalize scores to percentages and sort
  const maxPossibleScore = 30; // Approximate max score
  const rankedCareers = Object.entries(scores)
    .map(([key, score]) => ({
      ...careerPaths[key],
      matchScore: Math.min(95, Math.max(60, Math.round((score / maxPossibleScore) * 100)))
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  // Generate roadmap based on top career
  const roadmap = generateRoadmap(rankedCareers[0].title);

  // Generate motivation and mistakes
  const motivation = generateMotivation();
  const mistakes = generateMistakes();

  return {
    careers: rankedCareers,
    roadmap,
    motivation,
    mistakes
  };
}

function generateRoadmap(career: string): Roadmap {
  // Generic roadmap that adapts slightly based on career
  const istech = career.includes("Software") || career.includes("Data") || career.includes("UX");
  const isBusiness = career.includes("Product") || career.includes("Marketing") || career.includes("Entrepreneur") || career.includes("Consultant");

  const year1: RoadmapItem[] = [
    {
      title: istech ? "Learn Programming Fundamentals" : "Master Core Business Skills",
      description: istech 
        ? "Start with Python or JavaScript. Build a strong foundation in logic and problem-solving."
        : "Develop essential skills in communication, presentation, and business analysis.",
      type: 'skill',
      priority: 'high',
      timeline: "Months 1-3",
      resources: istech ? ["freeCodeCamp", "Codecademy", "CS50"] : ["LinkedIn Learning", "Coursera", "HubSpot Academy"],
      isFree: true
    },
    {
      title: "Complete Foundation Course",
      description: `Take a comprehensive ${istech ? "tech" : "business"} course to build systematic knowledge.`,
      type: 'course',
      priority: 'high',
      timeline: "Months 2-4",
      resources: istech ? ["The Odin Project", "Full Stack Open"] : ["Google Digital Garage", "Meta Business Suite"],
      isFree: true
    },
    {
      title: "Build Your First Project",
      description: "Apply your learning by building something real. Start small but finish it.",
      type: 'project',
      priority: 'high',
      timeline: "Months 4-6",
      resources: ["Portfolio Project", "Personal Website", "Case Study"]
    },
    {
      title: "Read Industry Books",
      description: "Expand your knowledge with books recommended by professionals in the field.",
      type: 'book',
      priority: 'medium',
      timeline: "Throughout Year 1",
      resources: istech 
        ? ["Clean Code", "The Pragmatic Programmer", "Designing Data-Intensive Applications"]
        : ["Zero to One", "The Lean Startup", "Atomic Habits"]
    },
    {
      title: "Get Your First Internship",
      description: "Apply for internships to gain real-world experience. Start early, apply often.",
      type: 'internship',
      priority: 'high',
      timeline: "Months 6-12",
      resources: ["LinkedIn Jobs", "AngelList", "Company Career Pages"]
    },
    {
      title: "Build Online Presence",
      description: "Create profiles on professional platforms and start networking.",
      type: 'opportunity',
      priority: 'medium',
      timeline: "Months 3-6",
      resources: ["LinkedIn", "Twitter/X", "GitHub/Behance"]
    }
  ];

  const year3: RoadmapItem[] = [
    {
      title: "Specialize in a Niche",
      description: "Choose an area to focus deeply on. Become known for something specific.",
      type: 'skill',
      priority: 'high',
      timeline: "Year 2",
      resources: ["Advanced Courses", "Certifications", "Bootcamps"]
    },
    {
      title: "Professional Certification",
      description: "Get certified in your specialization to stand out from the crowd.",
      type: 'course',
      priority: 'high',
      timeline: "Year 2",
      resources: istech 
        ? ["AWS Certification", "Google Cloud", "Meta Developer"] 
        : ["PMP", "Google Analytics", "HubSpot Inbound"],
      isFree: false
    },
    {
      title: "Lead a Significant Project",
      description: "Take ownership of a major project. Demonstrate leadership and execution.",
      type: 'project',
      priority: 'high',
      timeline: "Year 2-3"
    },
    {
      title: "Mentor Others",
      description: "Start giving back by mentoring juniors. Teaching deepens your own understanding.",
      type: 'opportunity',
      priority: 'medium',
      timeline: "Year 3"
    },
    {
      title: "Secure Mid-Level Position",
      description: "Transition to a more senior role with increased responsibilities.",
      type: 'internship',
      priority: 'high',
      timeline: "Year 2-3",
      resources: ["Networking", "Referrals", "Job Boards"]
    },
    {
      title: "Expand Reading List",
      description: "Continue learning through advanced books and research papers.",
      type: 'book',
      priority: 'medium',
      timeline: "Ongoing",
      resources: ["Domain-specific books", "Research papers", "Industry reports"]
    }
  ];

  const year5: RoadmapItem[] = [
    {
      title: "Become a Subject Matter Expert",
      description: "Establish yourself as a go-to person in your specialization.",
      type: 'skill',
      priority: 'high',
      timeline: "Year 4-5"
    },
    {
      title: "Speak at Events",
      description: "Share your knowledge at conferences, meetups, or online events.",
      type: 'opportunity',
      priority: 'medium',
      timeline: "Year 4-5",
      resources: ["Local Meetups", "Conferences", "Podcasts"]
    },
    {
      title: "Consider Management or Expert Track",
      description: "Decide whether to pursue leadership or deep technical/domain expertise.",
      type: 'opportunity',
      priority: 'high',
      timeline: "Year 4"
    },
    {
      title: "Build a Side Project or Startup",
      description: "Use your expertise to create something of your own.",
      type: 'project',
      priority: 'medium',
      timeline: "Year 4-5"
    },
    {
      title: "Achieve Senior Position",
      description: "Reach a senior role with strategic influence and higher compensation.",
      type: 'internship',
      priority: 'high',
      timeline: "Year 5",
      resources: ["Executive Recruiters", "Strategic Networking"]
    },
    {
      title: "Executive Education",
      description: "Consider advanced programs like MBA or executive courses if pursuing leadership.",
      type: 'course',
      priority: 'low',
      timeline: "Year 4-5",
      resources: ["MBA Programs", "Executive Education", "Leadership Courses"],
      isFree: false
    }
  ];

  return { year1, year3, year5 };
}

function generateMotivation(): string[] {
  return [
    "Remember: Every expert was once a beginner. Your journey starts with a single step.",
    "Consistency beats intensity. Small daily progress leads to remarkable results over time.",
    "Embrace failures as learning opportunities. Each setback teaches you something valuable.",
    "Surround yourself with people who inspire you. Your network is your net worth.",
    "Celebrate small wins along the way. Progress, not perfection, is the goal.",
    "Your unique combination of skills and experiences makes you irreplaceable."
  ];
}

function generateMistakes(): string[] {
  return [
    "Don't compare your beginning to someone else's middle. Everyone's journey is different.",
    "Avoid trying to learn everything at once. Master fundamentals before moving on.",
    "Never skip the networking. Relationships often matter more than pure skills.",
    "Don't wait for the 'perfect' moment. Start now and improve along the way.",
    "Avoid tunnel vision. Stay curious about adjacent fields and technologies.",
    "Don't neglect soft skills. Communication and collaboration are essential."
  ];
}
