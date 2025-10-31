//@ts-nocheck
"use client";
import React from 'react';
import { PlusCircle, X } from 'lucide-react';

export default function DailyDosagesSection({ patientData, setPatientData }) {
  const addDailyDosage = () => {
    setPatientData((prev) => ({
      ...prev,
      dailyDosages: [...prev.dailyDosages, { medication: '', dosage: '', frequency: '', time: '' }],
    }));
  };

  const removeDailyDosage = (index) => {
    setPatientData((prev) => {
      const updated = [...prev.dailyDosages];
      updated.splice(index, 1);
      return { ...prev, dailyDosages: updated };
    });
  };

  const updateDailyDosage = (index, field, value) => {
    setPatientData((prev) => {
      const updated = [...prev.dailyDosages];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, dailyDosages: updated };
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <label className="text-lg font-medium text-blue-700">Daily Medication Dosages</label>
        <button onClick={addDailyDosage} className="flex items-center text-blue-600 hover:text-blue-800">
          <PlusCircle size={20} className="mr-1" />
          Add Medication
        </button>
      </div>

      <div className="space-y-4">
        {patientData.dailyDosages.map((dosage, index) => (
          <div key={index} className="p-4 border border-blue-200 rounded bg-blue-50">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Medication #{index + 1}</h3>
              {patientData.dailyDosages.length > 1 && (
                <button onClick={() => removeDailyDosage(index)} className="text-red-500 hover:text-red-700">
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-600 mb-1">Medication Name</label>
                <input
                  type="text"
                  value={dosage.medication}
                  onChange={(e) => updateDailyDosage(index, 'medication', e.target.value)}
                  placeholder="Enter medication name"
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-blue-600 mb-1">Dosage</label>
                <input
                  type="text"
                  value={dosage.dosage}
                  onChange={(e) => updateDailyDosage(index, 'dosage', e.target.value)}
                  placeholder="E.g., 10mg, 1 tablet"
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-blue-600 mb-1">Frequency</label>
                <select
                  value={dosage.frequency}
                  onChange={(e) => updateDailyDosage(index, 'frequency', e.target.value)}
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select frequency</option>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Four times daily">Four times daily</option>
                  <option value="As needed">As needed</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-blue-600 mb-1">Time of Day</label>
                <select
                  value={dosage.time}
                  onChange={(e) => updateDailyDosage(index, 'time', e.target.value)}
                  className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select time</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Bedtime">Bedtime</option>
                  <option value="With meals">With meals</option>
                  <option value="Before meals">Before meals</option>
                  <option value="After meals">After meals</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
