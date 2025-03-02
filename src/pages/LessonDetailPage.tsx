import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Clock, BookOpen, ArrowLeft, CheckCircle, Award } from 'lucide-react';

const LessonDetailPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { lessons, user, completeLesson } = useApp();
  const navigate = useNavigate();
  const [isCompleting, setIsCompleting] = useState(false);

  const lesson = lessons.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson not found</h1>
        <button
          onClick={() => navigate('/lessons')}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Lessons
        </button>
      </div>
    );
  }

  const isLessonCompleted = user.completedLessons.includes(lessonId || '');

  const handleCompleteLesson = () => {
    if (!isLessonCompleted && lessonId) {
      setIsCompleting(true);
      setTimeout(() => {
        completeLesson(lessonId);
        setIsCompleting(false);
      }, 1000);
    }
  };

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/lessons')}
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Lessons
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative h-64">
          <img
            src={lesson.imageUrl}
            alt={lesson.title}
            className="w-full h-full object-cover"
          />
          {isLessonCompleted && (
            <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Completed
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mr-4">{lesson.title}</h1>
            <div className="flex items-center mt-2 sm:mt-0">
              <span className={`text-sm px-3 py-1 rounded-full ${difficultyColor[lesson.difficulty]} mr-3`}>
                {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
              </span>
              <span className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {lesson.duration} min
              </span>
            </div>
          </div>
          <div className="flex items-center text-gray-600 text-sm mb-6">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{lesson.category}</span>
          </div>
          <p className="text-gray-700 mb-6">{lesson.description}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </div>

      <div className="flex justify-between items-center">
        {!isLessonCompleted ? (
          <button
            onClick={handleCompleteLesson}
            disabled={isCompleting}
            className={`flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors ${
              isCompleting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isCompleting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Completing...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Mark as Completed
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            You've completed this lesson
          </div>
        )}

        <button
          onClick={() => navigate('/quizzes')}
          className="flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
        >
          <Award className="w-5 h-5 mr-2" />
          Take a Quiz
        </button>
      </div>
    </div>
  );
};

export default LessonDetailPage;