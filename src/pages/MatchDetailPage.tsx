import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Clock, Award, ArrowLeft, CheckCircle, Users, Trophy } from 'lucide-react';

const MatchDetailPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { activeMatches, completedMatches, quizzes } = useApp();
  const navigate = useNavigate();
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  // Find the match from active or completed matches
  const match = [...activeMatches, ...completedMatches].find(m => m.id === matchId);
  
  // Find the associated quiz
  const quiz = match ? quizzes.find(q => q.id === match.quizId) : null;
  
  useEffect(() => {
    if (match && match.status === 'waiting') {
      const startTime = new Date(match.startTime).getTime();
      const now = new Date().getTime();
      const timeRemaining = Math.max(0, Math.floor((startTime - now) / 1000));
      
      setTimeLeft(timeRemaining);
      
      if (timeRemaining > 0) {
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev === null || prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      }
    }
  }, [match]);
  
  if (!match || !quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Match not found</h1>
        <button
          onClick={() => navigate('/matches')}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Matches
        </button>
      </div>
    );
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getWinner = () => {
    if (match.status !== 'completed') return null;
    
    const sortedParticipants = [...match.participants].sort((a, b) => b.score - a.score);
    return sortedParticipants[0];
  };
  
  const winner = getWinner();
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/matches')}
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Matches
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mr-4">
              {match.status === 'waiting' ? 'Upcoming Match' : 
               match.status === 'in-progress' ? 'Match in Progress' : 
               'Match Results'}
            </h1>
            <div className="flex items-center mt-2 sm:mt-0">
              {match.status === 'waiting' && timeLeft !== null && (
                <span className="flex items-center text-indigo-600 font-medium">
                  <Clock className="w-5 h-5 mr-1" />
                  Starts in {formatTime(timeLeft)}
                </span>
              )}
              {match.status === 'in-progress' && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  In Progress
                </span>
              )}
              {match.status === 'completed' && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Completed
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm mb-6">
            <Award className="w-4 h-4 mr-1" />
            <span>{quiz.title} - {quiz.category}</span>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Participants</h2>
            <div className="space-y-4">
              {match.participants.map((participant) => (
                <div 
                  key={participant.userId} 
                  className={`p-4 border rounded-lg ${
                    winner && winner.userId === participant.userId ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={participant.avatar} 
                        alt={participant.name} 
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium">{participant.name}</div>
                        {winner && winner.userId === participant.userId && (
                          <div className="text-yellow-600 text-sm flex items-center mt-1">
                            <Trophy className="w-4 h-4 mr-1" />
                            Winner
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xl font-bold">
                      {participant.score} pts
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {match.status === 'waiting' && (
            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-indigo-800 mb-2">Match Details</h3>
              <p className="text-indigo-700 mb-2">
                You'll be competing against {match.participants.length - 1} other student(s) on the "{quiz.title}" quiz.
              </p>
              <p className="text-indigo-700">
                The match will start {timeLeft && timeLeft > 0 ? `in ${formatTime(timeLeft)}` : 'soon'}. Be ready!
              </p>
            </div>
          )}
          
          {match.status === 'in-progress' && (
            <div className="text-center">
              <button
                onClick={() => navigate(`/quizzes/${quiz.id}`)}
                className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
              >
                <Award className="w-5 h-5 mr-2" />
                Continue Quiz
              </button>
            </div>
          )}
          
          {match.status === 'completed' && (
            <div className="text-center">
              <button
                onClick={() => navigate(`/quizzes/${quiz.id}`)}
                className="inline-flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
              >
                <Award className="w-5 h-5 mr-2" />
                Take Quiz Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;