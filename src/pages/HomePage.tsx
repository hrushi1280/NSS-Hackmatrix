import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LessonCard from '../components/LessonCard';
import QuizCard from '../components/QuizCard';
import MatchCard from '../components/MatchCard';
import ProgressBar from '../components/ProgressBar';
import { BookOpen, Award, Users, ArrowRight, Zap, Trophy, Medal } from 'lucide-react'; // Import Trophy and Medal

const HomePage: React.FC = () => {
  const { user, lessons, quizzes, activeMatches } = useApp();

  // Get recommended lessons (not completed)
  const recommendedLessons = lessons
    .filter(lesson => !user.completedLessons.includes(lesson.id))
    .slice(0, 3);

  // Get recommended quizzes (not completed)
  const recommendedQuizzes = quizzes
    .filter(quiz => !user.completedQuizzes.includes(quiz.id))
    .slice(0, 3);

  // Get active matches with quiz details
  const matchesWithQuizzes = activeMatches
    .filter(match => match.status !== 'completed')
    .map(match => ({
      match,
      quiz: quizzes.find(quiz => quiz.id === match.quizId) || quizzes[0]
    }))
    .slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-indigo-100 mb-4">Continue your learning journey and challenge your knowledge.</p>
            <div className="flex space-x-4">
              <Link 
                to="/lessons" 
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Lessons
              </Link>
              <Link 
                to="/quizzes" 
                className="bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-400 transition-colors flex items-center"
              >
                <Award className="w-5 h-5 mr-2" />
                Take Quizzes
              </Link>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-full md:w-auto">
            <div className="flex items-center mb-4">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-16 h-16 rounded-full object-cover border-4 border-white/30"
              />
              <div className="ml-4">
                <h2 className="text-xl font-bold">Level {user.level}</h2>
                <p className="text-indigo-100">{user.credits} Credits</p>
              </div>
            </div>
            <ProgressBar 
              progress={user.completedLessons.length} 
              total={lessons.length} 
              label="Lessons Completed" 
              className="mb-3"
            />
            <ProgressBar 
              progress={user.completedQuizzes.length} 
              total={quizzes.length} 
              label="Quizzes Completed" 
            />
          </div>
        </div>
      </div>

      {/* Recommended Lessons */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
            Recommended Lessons
          </h2>
          <Link to="/lessons" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedLessons.map(lesson => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              isCompleted={user.completedLessons.includes(lesson.id)} 
            />
          ))}
          {recommendedLessons.length === 0 && (
            <div className="col-span-3 bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">You've completed all available lessons!</p>
              <Link to="/lessons" className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
                Review your completed lessons
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Quizzes */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Award className="w-6 h-6 mr-2 text-indigo-600" />
            Recommended Quizzes
          </h2>
          <Link to="/quizzes" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedQuizzes.map(quiz => (
            <QuizCard 
              key={quiz.id} 
              quiz={quiz} 
              isCompleted={user.completedQuizzes.includes(quiz.id)} 
            />
          ))}
          {recommendedQuizzes.length === 0 && (
            <div className="col-span-3 bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">You've completed all available quizzes!</p>
              <Link to="/quizzes" className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
                Review your completed quizzes
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Active Matches */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-indigo-600" />
            Active Matches
          </h2>
          <Link to="/matches" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matchesWithQuizzes.map(({ match, quiz }) => (
            <MatchCard key={match.id} match={match} quiz={quiz} />
          ))}
          {matchesWithQuizzes.length === 0 && (
            <div className="col-span-2 bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">No active matches at the moment.</p>
              <Link to="/quizzes" className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
                Find a quiz to start a match
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Users className="w-6 h-6 mr-2 text-indigo-600" />
            Leaderboard
          </h2>
          <Link to="/leaderboard" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
            View Full Leaderboard <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-indigo-600 text-white">
            <h3 className="text-lg font-semibold">Top Students This Week</h3>
          </div>
          <div className="p-4">
            {useApp().leaderboard.weekly.slice(0, 3).map((entry, index) => (
              <div key={entry.userId} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center font-bold text-indigo-600">
                    {index === 0 ? (
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    ) : index === 1 ? (
                      <Award className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Medal className="w-5 h-5 text-amber-700" />
                    )}
                  </div>
                  <img 
                    src={entry.avatar} 
                    alt={entry.name} 
                    className="w-8 h-8 rounded-full object-cover mx-2"
                  />
                  <span className="font-medium">{entry.name}</span>
                </div>
                <span className="font-semibold">{entry.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;