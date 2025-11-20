//@ts-nocheck
// components/TabNavigation.tsx
'use client';

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'reports', name: 'Reports' },
    { id: 'allergies', name: 'Allergies' },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
