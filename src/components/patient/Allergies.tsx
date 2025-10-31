// components/patient/Allergies.tsx
'use client';

import { useState } from 'react';

interface Allergy {
  id: string;
  name: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  reaction: string;
  notes?: string;
}

interface AllergiesProps {
  allergies: Allergy[];
  onAddAllergy?: (allergy: Omit<Allergy, 'id'>) => void;
  onRemoveAllergy?: (id: string) => void;
}

export default function Allergies({ allergies, onAddAllergy, onRemoveAllergy }: AllergiesProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAllergy, setNewAllergy] = useState({
    name: '',
    severity: 'Mild' as Allergy['severity'],
    reaction: '',
    notes: ''
  });

  const getSeverityColor = (severity: Allergy['severity']) => {
    switch (severity) {
      case 'Mild':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Moderate':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Severe':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSubmitAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAllergy.name && newAllergy.reaction && onAddAllergy) {
      onAddAllergy(newAllergy);
      setNewAllergy({
        name: '',
        severity: 'Mild',
        reaction: '',
        notes: ''
      });
      setShowAddForm(false);
    }
  };

  if (allergies.length === 0 && !showAddForm) {
    return (
      <div className="animate-slide-up">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.152 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Known Allergies</h3>
          <p className="text-gray-500 mb-4">Add any allergies to help healthcare providers give you safer care.</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="medimitra-button-primary px-4 py-2 rounded-lg text-sm font-medium"
          >
            Add First Allergy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allergies.map((allergy) => (
          <div key={allergy.id} className={`allergy-card medimitra-card p-4 rounded-lg border-2 ${getSeverityColor(allergy.severity)}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.152 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800">{allergy.name}</h4>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-gray-600">
                    <span className="font-medium">Severity:</span> {allergy.severity}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Reaction:</span> {allergy.reaction}
                  </p>
                  {allergy.notes && (
                    <p className="text-gray-600">
                      <span className="font-medium">Notes:</span> {allergy.notes}
                    </p>
                  )}
                </div>
              </div>
              {onRemoveAllergy && (
                <button
                  onClick={() => onRemoveAllergy(allergy.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
        
        {/* Add New Allergy Card */}
        {!showAddForm && (
          <div 
            onClick={() => setShowAddForm(true)}
            className="medimitra-card bg-gray-50 border-2 border-dashed border-gray-300 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg className="w-6 h-6 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm text-gray-600">Add Allergy</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Allergy Form */}
      {showAddForm && (
        <div className="mt-6 medimitra-card bg-white p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Allergy</h3>
          <form onSubmit={handleSubmitAllergy} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allergen Name *
                </label>
                <input
                  type="text"
                  value={newAllergy.name}
                  onChange={(e) => setNewAllergy({...newAllergy, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Peanuts, Penicillin"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity *
                </label>
                <select
                  value={newAllergy.severity}
                  onChange={(e) => setNewAllergy({...newAllergy, severity: e.target.value as Allergy['severity']})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reaction *
              </label>
              <input
                type="text"
                value={newAllergy.reaction}
                onChange={(e) => setNewAllergy({...newAllergy, reaction: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Skin rash, Difficulty breathing"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={newAllergy.notes}
                onChange={(e) => setNewAllergy({...newAllergy, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Any additional information..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="medimitra-button-primary px-4 py-2 rounded-lg text-sm font-medium"
              >
                Add Allergy
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="medimitra-button-secondary px-4 py-2 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}