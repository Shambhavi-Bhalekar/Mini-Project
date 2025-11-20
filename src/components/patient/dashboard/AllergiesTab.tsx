//@ts-nocheck
// components/AllergiesTab.tsx
'use client';

export default function AllergiesTab({ allergies }) {
  if (allergies.length === 0)
    return <p className="text-gray-500">No allergies added.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
      {allergies.map((allergy, index) => (
        <div key={index} className="medimitra-card bg-red-50 border border-red-200 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              ⚠️
            </div>
            <span className="ml-3 text-sm font-medium text-gray-800">{allergy}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
