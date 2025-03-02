import React from 'react';
import { Link } from 'react-router-dom';
import { Match, Quiz } from '../types';
import { Clock, Users, Trophy } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  quiz: Quiz;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, quiz }) => {
  const statusColors = {
    waiting: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeInfo = () => {
    if (match.status === 'waiting') {
      return `Starts at ${formatTime(match.startTime)}`;
    } else if (match.status === 'in-progress') {
      return 'In progress';
    } else {
      return `Completed at ${formatTime(match.endTime || '')}`;
    }
  };

  const getWinner = () => {
    if (match.status !== 'completed') return null;
    
    const sortedParticipants = [...match.participants].sort((a, b) => b.score - a.score);
    return sortedParticipants[0];
  };

  const winner = getWinner();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{quiz.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[match.status]}`}>
            {match.status === 'in-progress' ? 'In Progress' : 
             match.status === 'waiting' ? 'Waiting' : 'Completed'}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span>{getTimeInfo()}</span>
        </div>
        
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Participants</div>
          <div className="space-y-2">
            {match.participants.map((participant) => (
              <div key={participant.userId} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={participant.avatar} 
                    alt={participant.name} 
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <span className="text-sm">{participant.name}</span>
                </div>
                <span className="font-medium">{participant.score} pts</span>
              </div>
            ))}
          </div>
        </div>
        
        {winner && (
          <div className="bg-indigo-50 p-3 rounded-md flex items-center">
            <Trophy className="w-5 h-5 text-indigo-600 mr-2" />
            <div>
              <span className="text-sm font-medium">Winner: </span>
              <span className="text-sm">{winner.name}</span>
            </div>
          </div>
        )}
        
        {match.status === 'waiting' && (
          <Link 
            to={`/matches/${match.id}`}
            className="mt-4 block w-full text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Join Match
          </Link>
        )}
        
        {match.status === 'in-progress' && (
          <Link 
            to={`/matches/${match.id}`}
            className="mt-4 block w-full text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue Match
          </Link>
        )}
        
        {match.status === 'completed' && (
          <Link 
            to={`/matches/${match.id}`}
            className="mt-4 block w-full text-center bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            View Results
          </Link>
        )}
      </div>
    </div>
  );
};

export default MatchCard;