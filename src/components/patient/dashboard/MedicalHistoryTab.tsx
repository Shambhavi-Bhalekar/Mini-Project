//@ts-nocheck
// components/MedicalHistoryTab.tsx
'use client';

export default function MedicalHistoryTab({ medicalHistory }) {
  if (medicalHistory.length === 0)
    return <p className="text-gray-500">No medical history added.</p>;

  return (
    <div className="space-y-4 animate-slide-up">
      {medicalHistory.map((item, index) => (
        <div key={index} className="medimitra-card bg-white p-4 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{item.condition}</h4>
              <p className="text-sm text-gray-600">Diagnosed: {item.diagnosedDate}</p>
            </div>
            <div className="text-right">
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {item.status}
              </span>
              <p className="text-sm text-gray-600 mt-1">Severity: {item.severity}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
