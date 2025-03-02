import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Lesson, Quiz, Match, Leaderboard } from '../types';
import { currentUser, lessons, quizzes, activeMatches, completedMatches, leaderboard } from '../data/mockData';

interface AppContextType {
  user: User;
  lessons: Lesson[];
  quizzes: Quiz[];
  activeMatches: Match[];
  completedMatches: Match[];
  leaderboard: Leaderboard;
  updateUser: (updates: Partial<User>) => void;
  joinMatch: (quizId: string) => void;
  completeLesson: (lessonId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(currentUser);
  const [lessonsList, setLessonsList] = useState<Lesson[]>(lessons);
  const [quizzesList, setQuizzesList] = useState<Quiz[]>(quizzes);
  const [activeMatchesList, setActiveMatchesList] = useState<Match[]>(activeMatches);
  const [completedMatchesList, setCompletedMatchesList] = useState<Match[]>(completedMatches);
  const [leaderboardData, setLeaderboardData] = useState<Leaderboard>(leaderboard);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const joinMatch = (quizId: string) => {
    // In a real app, this would create or join a match on the server
    // For now, we'll simulate creating a new match
    const newMatch: Match = {
      id: `match${Date.now()}`,
      quizId,
      participants: [
        {
          userId: user.id,
          name: user.name,
          avatar: user.avatar,
          score: 0
        },
        {
          userId: 'opponent',
          name: 'Random Opponent',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
          score: 0
        }
      ],
      status: 'waiting',
      startTime: new Date(Date.now() + 30000).toISOString(),
      endTime: null
    };

    setActiveMatchesList((prev) => [...prev, newMatch]);
  };

  const completeLesson = (lessonId: string) => {
    if (!user.completedLessons.includes(lessonId)) {
      const updatedCompletedLessons = [...user.completedLessons, lessonId];
      const creditsEarned = 50;
      
      setUser((prev) => ({
        ...prev,
        completedLessons: updatedCompletedLessons,
        credits: prev.credits + creditsEarned
      }));
    }
  };

  const completeQuiz = (quizId: string, score: number) => {
    if (!user.completedQuizzes.includes(quizId)) {
      const updatedCompletedQuizzes = [...user.completedQuizzes, quizId];
      const creditsEarned = score * 25;
      
      setUser((prev) => ({
        ...prev,
        completedQuizzes: updatedCompletedQuizzes,
        credits: prev.credits + creditsEarned
      }));
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        lessons: lessonsList,
        quizzes: quizzesList,
        activeMatches: activeMatchesList,
        completedMatches: completedMatchesList,
        leaderboard: leaderboardData,
        updateUser,
        joinMatch,
        completeLesson,
        completeQuiz
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};