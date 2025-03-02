import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Clock, Award, ArrowLeft, CheckCircle, Users, Zap } from 'lucide-react';

const QuizDetailPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { quizzes, user, completeQuiz, joinMatch } = useApp();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const quiz = quizzes.find(q => q.id === quizId);

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      if (timeLeft === 0) {
        handleQuizComplete();
      }
      
      return () => clearTimeout(timer);
    }
  }, [quizStarted, quizCompleted, timeLeft]);

  if (!quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz not found</h1>
        <button
          onClick={() => navigate('/quizzes')}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Quizzes
        </button>
      </div>
    );
  }

  const isQuizCompleted = user.completedQuizzes.includes(quizId || '');
  const currentQuestion = quiz.questions[currentQuestionIndex];

  const startQuiz = () => {
    setQuizStarted(true);
    setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
    setTimeLeft(quiz.duration * 60);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    
    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    
    if (quizId && !isQuizCompleted) {
      completeQuiz(quizId, finalScore);
    }
  };

  const handleJoinMatch = () => {
    if (quizId) {
      joinMatch(quizId);
      navigate('/matches');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!quizStarted ? (
        <>
          <button
            onClick={() => navigate('/quizzes')}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Quizzes
          </button>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative h-64">
              <img
                src={quiz.imageUrl}
                alt={quiz.title}
                className="w-full h-full object-cover"
              />
              {isQuizCompleted && (
                <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Completed
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mr-4">{quiz.title}</h1>
                <div className="flex items-center mt-2 sm:mt-0">
                  <span className={`text-sm px-3 py-1 rounded-full ${difficultyColor[quiz.difficulty]} mr-3`}>
                    {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                  </span>
                  <span className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {quiz.duration} min
                  </span>
                </div>
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-6">
                <Award className="w-4 h-4 mr-1" />
                <span>{quiz.category}</span>
              </div>
              <p className="text-gray-700 mb-6">{quiz.description}</p>
              <div className="flex items-center text-gray-600 mb-6">
                <span className="mr-4">
                  <strong>{quiz.questions.length}</strong> Questions
                </span>
                <span>
                  <strong>{quiz.duration}</strong> Minutes
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={startQuiz}
                  className="flex-1 flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Start Quiz
                </button>
                <button
                  onClick={handleJoinMatch}
                  className="flex-1 flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Find Match
                </button>
              </div>
            </div>
          </div>
        </>
      ) : !quizCompleted ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-500 mt-1">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showExplanation && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
              <p className="text-blue-700">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-md ${
                currentQuestionIndex === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            <div>
              {selectedAnswers[currentQuestionIndex] !== -1 && !showExplanation && (
                <button
                  onClick={handleShowExplanation}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 mr-3"
                >
                  Show Explanation
                </button>
              )}
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-6">
            <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
              <Award className="w-12 h-12 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
            <p className="text-gray-600">You've completed the {quiz.title} quiz.</p>
          </div>

          <div className="mb-8">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-indigo-600">{score}%</span>
              </div>
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="3"
                  strokeDasharray={`${score}, 100`}
                />
              </svg>
            </div>
            <p className="text-gray-600 mt-4">
              You answered {Math.round((score / 100) * quiz.questions.length)} out of {quiz.questions.length} questions correctly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/quizzes')}
              className="flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Quizzes
            </button>
            <button
              onClick={handleJoinMatch}
              className="flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors"
            >
              <Zap className="w-5 h-5 mr-2" />
              Challenge Others
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDetailPage;