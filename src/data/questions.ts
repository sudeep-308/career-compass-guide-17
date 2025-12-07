import { Question } from "@/types/career";

export const questions: Question[] = [
  {
    id: 1,
    question: "What activities make you lose track of time?",
    options: [
      "Solving puzzles and logical problems",
      "Creating art, writing, or designing",
      "Helping and mentoring others",
      "Building or fixing things",
      "Analyzing data and patterns",
      "Leading teams and organizing events"
    ],
    type: 'single',
    category: 'interests'
  },
  {
    id: 2,
    question: "Which subjects have you always enjoyed?",
    options: [
      "Mathematics and Sciences",
      "Arts and Literature",
      "Social Sciences and Psychology",
      "Technology and Computers",
      "Business and Economics",
      "Languages and Communication"
    ],
    type: 'multiple',
    category: 'interests'
  },
  {
    id: 3,
    question: "What do people often compliment you on?",
    options: [
      "Problem-solving abilities",
      "Creativity and imagination",
      "Communication skills",
      "Technical skills",
      "Leadership qualities",
      "Patience and empathy"
    ],
    type: 'single',
    category: 'strengths'
  },
  {
    id: 4,
    question: "What kind of work environment do you prefer?",
    options: [
      "Remote/flexible work from anywhere",
      "Traditional office with a team",
      "Outdoor or field-based work",
      "Creative studio or workshop",
      "Research lab or quiet space",
      "Dynamic startup environment"
    ],
    type: 'single',
    category: 'personality'
  },
  {
    id: 5,
    question: "What's your primary career goal?",
    options: [
      "High salary and financial security",
      "Making a positive impact on society",
      "Work-life balance and flexibility",
      "Continuous learning and growth",
      "Building my own business",
      "Recognition and leadership position"
    ],
    type: 'single',
    category: 'goals'
  },
  {
    id: 6,
    question: "Which skills do you want to develop?",
    options: [
      "Programming and technical skills",
      "Design and creative skills",
      "Communication and presentation",
      "Leadership and management",
      "Analytical and research skills",
      "Marketing and sales"
    ],
    type: 'multiple',
    category: 'skills'
  },
  {
    id: 7,
    question: "How do you prefer to learn new things?",
    options: [
      "Watching video tutorials",
      "Reading books and articles",
      "Hands-on practice and projects",
      "Taking structured courses",
      "Learning from mentors",
      "Group discussions and workshops"
    ],
    type: 'single',
    category: 'learning'
  },
  {
    id: 8,
    question: "How do you handle challenges and stress?",
    options: [
      "Break them down into smaller tasks",
      "Seek help from others",
      "Take time to think and plan",
      "Jump in and figure it out",
      "Avoid and procrastinate",
      "Stay calm and adapt quickly"
    ],
    type: 'single',
    category: 'personality'
  },
  {
    id: 9,
    question: "What kind of projects excite you most?",
    options: [
      "Building apps or websites",
      "Creating content and media",
      "Organizing community events",
      "Scientific research and experiments",
      "Starting a business venture",
      "Teaching or training others"
    ],
    type: 'multiple',
    category: 'interests'
  },
  {
    id: 10,
    question: "Where do you see yourself in 5 years?",
    options: [
      "Senior position at a top company",
      "Running my own successful business",
      "Making an impact in my community",
      "Working on cutting-edge technology",
      "Living a balanced, peaceful life",
      "Constantly traveling and exploring"
    ],
    type: 'single',
    category: 'goals'
  }
];
