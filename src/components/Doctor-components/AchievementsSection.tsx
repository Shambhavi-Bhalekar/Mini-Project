//@ts-nocheck
"use client";
import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export default function AchievementsSection({ achievements, setAchievements, isEditing }) {
  const handleAddAchievement = () => {
    const newAchievement = {
      id: achievements.length + 1,
      title: '',
      organization: '',
      year: new Date().getFullYear().toString(),
    };
    setAchievements([...achievements, newAchievement]);
  };

  const handleAchievementChange = (id, field, value) => {
    setAchievements(achievements.map(ach => ach.id === id ? { ...ach, [field]: value } : ach));
  };

  const handleDeleteAchievement = (id) => {
    setAchievements(achievements.filter(ach => ach.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
          Achievements & Awards
        </h2>
        {isEditing && (
          <button onClick={handleAddAchievement} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add Achievement</span>
          </button>
        )}
      </div>
      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-start justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => handleAchievementChange(achievement.id, 'title', e.target.value)}
                    placeholder="Achievement Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={achievement.organization}
                    onChange={(e) => handleAchievementChange(achievement.id, 'organization', e.target.value)}
                    placeholder="Organization"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={achievement.year}
                    onChange={(e) => handleAchievementChange(achievement.id, 'year', e.target.value)}
                    placeholder="Year"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-800">{achievement.title}</p>
                  <p className="text-xs text-gray-600">{achievement.organization} • {achievement.year}</p>
                </div>
              )}
            </div>
            {isEditing && (
              <button onClick={() => handleDeleteAchievement(achievement.id)} className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
