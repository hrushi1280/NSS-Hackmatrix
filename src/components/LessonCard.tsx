import React from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '../types';
import { Clock, BookOpen } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted?: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, isCompleted = false }) => {
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-40">
        <img
          src={lesson.imageUrl}
          alt={lesson.title}
          className="w-full h-full object-cover"
        />
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Completed
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{lesson.title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{lesson.duration} min</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor[lesson.difficulty]}`}>
            {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default LessonCard;