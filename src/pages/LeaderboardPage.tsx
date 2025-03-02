import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import LeaderboardTable from '../components/LeaderboardTable';
import { Users, Award, Clock, BookOpen } from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  const { leaderboard } = useApp();
  const [activeTab, setActiveTab] = useState<'global' | 'weekly' | 'category'>('global');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(leaderboard.byCategory)[0] || ''
  );

  // Get all categories
  const categories = Object.keys(leaderboard.byCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-8">
        <Users className="w-8 h-8 mr-2 text-indigo-600" />
        Leaderboard
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-4 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'global'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('global')}
        >
          <div className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Global
          </div>
        </button>
        <button
          className={`py-4 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'weekly'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('weekly')}
        >
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            This Week
          </div>
        </button>
        <button
          className={`py-4 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'category'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('category')}
        >
          <div className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            By Category
          </div>
        </button>
      </div>

      {/* Category selector (only visible when category tab is active) */}
      {activeTab === 'category' && (
        <div className="mb-8">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Select Category
          </label>
          <select
            id="category"
            className="w-full sm:w-64 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      )}

      {/* Leaderboard content */}
      {activeTab === 'global' && (
        <LeaderboardTable 
          entries={leaderboard.global} 
          title="Global Leaderboard" 
        />
      )}

      {activeTab === 'weekly' && (
        <LeaderboardTable 
          entries={leaderboard.weekly} 
          title="Weekly Leaderboard" 
        />
      )}

      {activeTab === 'category' && selectedCategory && (
        <LeaderboardTable 
          entries={leaderboard.byCategory[selectedCategory] || []} 
          title={`${selectedCategory} Leaderboard`} 
        />
      )}
    </div>
  );
};

export default LeaderboardPage;