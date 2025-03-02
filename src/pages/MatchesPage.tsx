import React from 'react';
import { useApp } from '../context/AppContext';
import MatchCard from '../components/MatchCard';
import { Zap, History } from 'lucide-react';

const MatchesPage: React.FC = () => {
  const { activeMatches, completedMatches, quizzes } = useApp();

  // Get active matches with quiz details
  const activeMatchesWithQuizzes = activeMatches
    .filter(match => match.status !== 'completed')
    .map(match => ({
      match,
      quiz: quizzes.find(quiz => quiz.id === match.quizId) || quizzes[0]
    }));

  // Get completed matches with quiz details
  const completedMatchesWithQuizzes = completedMatches
    .map(match => ({
      match,
      quiz: quizzes.find(quiz => quiz.id === match.quizId) || quizzes[0]
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Matches</h1>

      {/* Active Matches */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
          <Zap className="w-6 h-6 mr-2 text-indigo-600" />
          Active Matches
        </h2>
        {activeMatchesWithQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeMatchesWithQuizzes.map(({ match, quiz }) => (
              <MatchCard key={match.id} match={match} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">No active matches at the moment.</p>
            <p className="text-gray-600">
              Start a new match by selecting a quiz and clicking "Find Match".
            </p>
          </div>
        )}
      </div>

      {/* Completed Matches */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
          <History className="w-6 h-6 mr-2 text-indigo-600" />
          Match History
        </h2>
        {completedMatchesWithQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedMatchesWithQuizzes.map(({ match, quiz }) => (
              <MatchCard key={match.id} match={match} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">No completed matches yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;