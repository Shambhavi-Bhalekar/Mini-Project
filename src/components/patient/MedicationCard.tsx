//@ts-nocheck
// app/patient/dashboard/components/MedicationCard.tsx
import React from 'react';

type Medication = {
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken?: boolean;
};

interface Props {
  medications: Medication[];
}

export default function MedicationCard({ medications }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Dosage</h3>
      {medications.length === 0 ? (
        <p className="text-gray-500 text-sm">No medications due now.</p>
      ) : (
        <div className="space-y-3">
          {medications.map((med, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                med.taken ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div>
                <p className="font-medium text-gray-800">{med.name}</p>
                <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{med.time}</p>
                {med.taken ? (
                  <span className="text-xs text-green-600 font-medium">Taken</span>
                ) : (
                  <span className="text-xs text-yellow-600 font-medium">Due</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}