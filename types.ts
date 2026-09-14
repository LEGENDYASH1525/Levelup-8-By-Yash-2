export type SubjectType = 
  | 'Mathematics' 
  | 'General Science' 
  | 'History & Civics' 
  | 'Geography' 
  | 'English'
  | 'Math' 
  | 'Science' 
  | 'Social Science';

export interface ConceptSlide {
  title: string;
  subtitle: string;
  content: string;
  highlightFact?: string;
  formulaOrRule?: string;
  points: string[];
  mnemonic?: string;
}

export interface InteractivePractice {
  type: 'balancer' | 'matcher' | 'step_order' | 'quick_choice';
  prompt: string;
  instruction: string;
  // Matcher items
  pairs?: { left: string; right: string; id: string }[];
  // Balancer items (e.g. Math linear eq or force)
  balancerData?: {
    leftTerm: string;
    rightTerm: string;
    targetVariable: string;
    options: string[];
    correctOption: string;
    hint: string;
  };
  // Step order items
  stepsToArrange?: { id: string; text: string; correctOrder: number }[];
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeOrFormula?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  chapterNumber: number;
  subject: SubjectType;
  title: string;
  shortDesc: string;
  difficulty: 'Easy' | 'Medium' | 'Challenge';
  estimatedMin: number;
  xpReward: number;
  iconName: string;
  colorTheme: string; // e.g. 'blue', 'cyan', 'amber', 'emerald', 'purple'
  step1_concept: {
    overview: string;
    slides: ConceptSlide[];
  };
  step2_practice: InteractivePractice;
  step3_quiz: QuizQuestion[];
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  schoolClass: string;
  xp: number;
  streakDays: number;
  topBadge: string;
  isCurrentUser?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'progress' | 'mastery' | 'streak';
}

export interface UserProgress {
  studentName: string;
  avatar: string;
  xp: number;
  level: number;
  streakDays: number;
  lastStudyDate: string;
  completedLessonIds: string[];
  lessonProgress: Record<string, { step1: boolean; step2: boolean; step3: boolean; quizScore?: number }>;
  unlockedBadgeIds: string[];
  hasOnboarded: boolean;
  dailyGoalMin: number;
  minutesSpentToday: number;
  favoriteSubject: SubjectType;
}
