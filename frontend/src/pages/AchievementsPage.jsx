import React from 'react';
import { useApp } from "../state/AppState.jsx"

function AchievementsPage() {
  const badges = [
    { 
      id: '1', 
      name: 'First Goal Complete',
      design: 'src/images/ant-cookie.png', 
      earned: true,
      earnedDate: '2025-08-10'
    },
    { 
      id: '2', 
      name: 'Study Master',
      design: 'src/images/ant-gem.png', 
      earned: true,
      earnedDate: '2025-08-09'
    },
    {
      id: '3',
      name: 'Daily Dynamo',
      design: 'src/images/ant-pie.png', 
      earned: false,
      description: '3-day study streak',
      progress: 50
    }
  ];

  const stats = [
    { label: 'Goals Completed', value: '2' },
    { label: 'Longest Session', value: '3.5h' },
    { label: 'Current Streak', value: '2' },
    { label: 'Total Study Time', value: '25h' }
  ];

  const earnedCount = badges.filter(badge => badge.earned).length;

  // Helper function to render badge design (emoji or image)
  const renderBadgeDesign = (design, earned) => {
    const isImage = design.includes('.png') || design.includes('.jpg') || design.includes('.gif') || design.includes('.svg');
    
    if (isImage) {
      return (
        <img 
          src={design} 
          alt="Badge" 
          className={`w-28 h-38 mx-auto mb-3 ${!earned ? 'grayscale opacity-50' : ''}`}
        />
      );
    } else {
      return (
        <div className={`text-6xl mb-3 ${!earned ? 'grayscale opacity-50' : ''}`}>
          {design}
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold mb-1">Achievements 🏆</h1>
        <p className="text-lg text-gray-700">
          You've earned <span className="font-semibold text-red-600">{earnedCount}</span> out of {badges.length} total badges
        </p>
      </div>

      {/* All Badges */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-red-800 mb-6">🌟 Badges</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {badges.map((badge) => (
            <div key={badge.id} className={`rounded-xl shadow-lg p-6 text-center w-64 flex-shrink-0 ${
              badge.earned ? 'bg-white border-2 border-red-200' : 'bg-red-50 border-2 border-red-100'
            }`}>
              {renderBadgeDesign(badge.design, badge.earned)}
              <p className={`text-lg font-bold ${badge.earned ? 'text-red-800' : 'text-red-600'}`}>
                {badge.name}
              </p>
              {badge.earned ? (
                <p className="text-sm text-gray-600 mt-2">Earned {badge.earnedDate}</p>
              ) : (
                <>
                  <p className="text-sm text-red-500 mt-2">{badge.description}</p>
                  <div className="mt-4">
                    <div className="w-full bg-red-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: `${badge.progress}%`}}></div>
                    </div>
                    <p className="text-xs text-red-500 mt-1">{Math.round(badge.progress)}% complete</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white border-2 border-red-200 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-red-800 mb-6">Your Statistics</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-red-50 border border-red-200 rounded-lg w-40 flex-shrink-0">
              <div className="text-3xl font-bold text-red-600">{stat.value}</div>
              <div className="text-sm text-red-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AchievementsPage;





