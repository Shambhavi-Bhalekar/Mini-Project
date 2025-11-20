//@ts-nocheck
"use client";
import React from 'react';
import { PlusCircle, X } from 'lucide-react';

export default function AllergiesSection({ patientData, setPatientData }) {
  const addAllergy = () => {
    setPatientData((prev) => ({ ...prev, allergies: [...prev.allergies, ''] }));
  };

  const removeAllergy = (index) => {
    setPatientData((prev) => {
      const updated = [...prev.allergies];
      updated.splice(index, 1);
      return { ...prev, allergies: updated };
    });
  };

  const updateAllergy = (index, value) => {
    setPatientData((prev) => {
      const updated = [...prev.allergies];
      updated[index] = value;
      return { ...prev, allergies: updated };
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <label className="text-lg font-medium text-blue-700">Allergies</label>
      </div>
      <div className="space-y-3">
        {patientData.allergies.map((allergy, index) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              value={allergy}
              onChange={(e) => updateAllergy(index, e.target.value)}
              className="flex-1 p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter allergy"
            />
            {patientData.allergies.length > 1 && (
              <button onClick={() => removeAllergy(index)} className="ml-2 text-red-500 hover:text-red-700">
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
