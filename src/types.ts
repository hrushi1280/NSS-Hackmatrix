export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  level: number;
  avatar: string;
  completedLessons: string[];
  completedQuizzes: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: Question[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Match {
  id: string;
  quizId: string;
  participants: {
    userId: string;
    name: string;
    avatar: string;
    score: number;
  }[];
  status: 'waiting' | 'in-progress' | 'completed';
  startTime: string;
  endTime: string | null;
}

export interface Leaderboard {
  global: LeaderboardEntry[];
  weekly: LeaderboardEntry[];
  byCategory: Record<string, LeaderboardEntry[]>;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar: string;
  score: number;
  level: number;
}