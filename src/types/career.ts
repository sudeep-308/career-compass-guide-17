export interface Question {
  id: number;
  question: string;
  options: string[];
  type: 'single' | 'multiple';
  category: 'interests' | 'strengths' | 'goals' | 'skills' | 'learning' | 'personality';
}

export interface Answer {
  questionId: number;
  answer: string | string[];
}

export interface CareerPath {
  title: string;
  description: string;
  matchScore: number;
  reasons: string[];
  icon: string;
}

export interface RoadmapItem {
  title: string;
  description: string;
  type: 'skill' | 'course' | 'project' | 'internship' | 'book' | 'opportunity';
  priority: 'high' | 'medium' | 'low';
  timeline: string;
  resources?: string[];
  isFree?: boolean;
}

export interface Roadmap {
  year1: RoadmapItem[];
  year3: RoadmapItem[];
  year5: RoadmapItem[];
}

export interface CareerResult {
  careers: CareerPath[];
  roadmap: Roadmap;
  motivation: string[];
  mistakes: string[];
}
