//@ts-nocheck
"use client";
import React from 'react';
import { Stethoscope } from 'lucide-react';

export default function ProfessionalInformation({ doctorData, setDoctorData, isEditing }) {
  const handleInputChange = (field, value) => {
    setDoctorData({ ...doctorData, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
        Professional Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Medical License Number', field: 'licenseNumber' },
          { label: 'Years of Experience', field: 'experience', type: 'number' },
          { label: 'Primary Specialization', field: 'specialization' },
          { label: 'Secondary Specialization', field: 'secondarySpecialization' },
        ].map((input) => (
          <div key={input.field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{input.label}</label>
            <input
              type={input.type || 'text'}
              value={doctorData[input.field]}
              onChange={(e) => handleInputChange(input.field, e.target.value)}
              disabled={!isEditing}
              placeholder={input.label}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'}`}
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Education & Qualifications</label>
          <textarea
            value={doctorData.education}
            onChange={(e) => handleInputChange('education', e.target.value)}
            disabled={!isEditing}
            rows="2"
            placeholder="e.g., MBBS, MD (Cardiology), DNB"
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'}`}
          />
        </div>
      </div>
    </div>
  );
}
