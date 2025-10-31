//@ts-nocheck
"use client";
import React from 'react';

export default function PersonalInfoForm({ patientData, setPatientData, age }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {['firstName', 'lastName'].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            {field === 'firstName' ? 'First Name' : 'Last Name'}
          </label>
          <input
            type="text"
            name={field}
            value={patientData[field]}
            onChange={handleChange}
            className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={patientData.dateOfBirth}
          onChange={handleChange}
          className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">Age</label>
        <input
          type="text"
          value={age}
          readOnly
          className="w-full p-2 bg-gray-100 border border-blue-200 rounded"
        />
      </div>

      {['height', 'weight'].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            {field === 'height' ? 'Height (cm)' : 'Weight (kg)'}
          </label>
          <input
            type="number"
            name={field}
            value={patientData[field]}
            onChange={handleChange}
            className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}
