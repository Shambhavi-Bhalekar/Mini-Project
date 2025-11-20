//@ts-nocheck
// components/ReportsTab.tsx
'use client';

export default function ReportsTab({ reports }) {
  if (reports.length === 0)
    return <p className="text-gray-500">No reports uploaded yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up">
      {reports.map((report, index) => (
        <div key={index} className="medimitra-card bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                📄
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-gray-800">{report.name}</h4>
                <p className="text-xs text-gray-600">
                  {report.type} • {report.date}
                </p>
              </div>
            </div>

            <span
              className={`px-2 py-1 text-xs rounded-full ${
                report.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {report.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
