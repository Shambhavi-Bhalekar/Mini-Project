//@ts-nocheck
"use client";
import React from 'react';
import { Building } from 'lucide-react';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WorkDetails({ workDetails, setWorkDetails, isEditing }) {
  const handleChange = (field, value) => setWorkDetails({ ...workDetails, [field]: value });

  const handleWorkingDaysChange = (day) => {
    const days = [...workDetails.workingDays];
    const index = days.indexOf(day);
    if (index > -1) days.splice(index, 1);
    else days.push(day);
    setWorkDetails({ ...workDetails, workingDays: days });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Building className="w-5 h-5 mr-2 text-blue-600" />
        Work Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Hospital/Clinic Name', field: 'hospitalName' },
          { label: 'Department', field: 'department' },
          { label: 'Position', field: 'position' },
          { label: 'Consultation Fee (₹)', field: 'consultationFee', type: 'number' },
        ].map((input) => (
          <div key={input.field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{input.label}</label>
            <input
              type={input.type || 'text'}
              value={workDetails[input.field]}
              onChange={(e) => handleChange(input.field, e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'}`}
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic Address</label>
          <textarea
            value={workDetails.hospitalAddress}
            onChange={(e) => handleChange('hospitalAddress', e.target.value)}
            disabled={!isEditing}
            rows="2"
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'}`}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
          <div className="flex flex-wrap gap-2">
            {weekDays.map((day) => (
              <button
                key={day}
                onClick={() => isEditing && handleWorkingDaysChange(day)}
                disabled={!isEditing}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${workDetails.workingDays.includes(day) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} ${isEditing ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {[
          { label: 'Morning Start Time', field: 'morningStartTime' },
          { label: 'Morning End Time', field: 'morningEndTime' },
          { label: 'Evening Start Time', field: 'eveningStartTime' },
          { label: 'Evening End Time', field: 'eveningEndTime' },
        ].map((input) => (
          <div key={input.field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{input.label}</label>
            <input
              type="time"
              value={workDetails[input.field]}
              onChange={(e) => handleChange(input.field, e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'}`}
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={workDetails.emergencyAvailable}
              onChange={(e) => handleChange('emergencyAvailable', e.target.checked)}
              disabled={!isEditing}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Available for Emergency Consultations</span>
          </label>
        </div>
      </div>
    </div>
  );
}
