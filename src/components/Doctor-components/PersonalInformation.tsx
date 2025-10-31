//@ts-nocheck
"use client";
import React from 'react';
import { User } from 'lucide-react';

export default function PersonalInformation({ doctorData, setDoctorData, isEditing }) {
  const handleInputChange = (field, value) => {
    setDoctorData({ ...doctorData, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-600" />
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Full Name', type: 'text', field: 'name' },
          { label: 'Date of Birth', type: 'date', field: 'dateOfBirth' },
          { label: 'Gender', type: 'select', field: 'gender', options: ['Male', 'Female', 'Other'] },
          { label: 'Phone', type: 'tel', field: 'phone' },
          { label: 'Email', type: 'email', field: 'email' },
          { label: 'Languages Spoken', type: 'text', field: 'languages' },
        ].map((input) => (
          <div key={input.field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{input.label}</label>
            {input.type === 'select' ? (
              <select
                value={doctorData[input.field]}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'}`}
              >
                {input.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input
                type={input.type}
                value={doctorData[input.field]}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'}`}
              />
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={doctorData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            disabled={!isEditing}
            rows="2"
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'}`}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
          <textarea
            value={doctorData.about}
            onChange={(e) => handleInputChange('about', e.target.value)}
            disabled={!isEditing}
            rows="3"
            placeholder="Brief introduction about yourself and your practice..."
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'}`}
          />
        </div>
      </div>
    </div>
  );
}
