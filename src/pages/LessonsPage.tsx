import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import LessonCard from '../components/LessonCard';
import { BookOpen, Search, Filter } from 'lucide-react';

const LessonsPage: React.FC = () => {
  const { user, lessons } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [showCompleted, setShowCompleted] = useState(true);

  // Extract unique categories
  const categories = Array.from(new Set(lessons.map(lesson => lesson.category)));

  // Filter lessons based on search term, category, difficulty, and completion status
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || lesson.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === '' || lesson.difficulty === selectedDifficulty;
    const matchesCompletion = showCompleted || !user.completedLessons.includes(lesson.id);
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesCompletion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
          <BookOpen className="w-8 h-8 mr-2 text-indigo-600" />
          Lessons
        </h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search lessons..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              id="showCompleted"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            <label htmlFor="showCompleted" className="ml-2 block text-sm text-gray-700">
              Show completed lessons
            </label>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.length > 0 ? (
          filteredLessons.map(lesson => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              isCompleted={user.completedLessons.includes(lesson.id)} 
            />
          ))
        ) : (
          <div className="col-span-3 bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">No lessons match your filters.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedDifficulty('');
                setShowCompleted(true);
              }}
              className="text-indigo-600 hover:text-indigo-800 mt-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsPage;