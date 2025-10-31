// components/patient/MedicalHistory.tsx
'use client';

interface MedicalCondition {
  condition: string;
  diagnosedDate: string;
  status: 'Ongoing' | 'Controlled' | 'Seasonal' | 'Resolved';
  severity: 'Mild' | 'Moderate' | 'Severe';
  notes?: string;
}

interface MedicalHistoryProps {
  conditions: MedicalCondition[];
}

export default function MedicalHistory({ conditions }: MedicalHistoryProps) {
  const getStatusStyle = (status: MedicalCondition['status']) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-yellow-100 text-yellow-800 status-ongoing';
      case 'Controlled':
        return 'bg-green-100 text-green-800 status-controlled';
      case 'Seasonal':
        return 'bg-blue-100 text-blue-800 status-seasonal';
      case 'Resolved':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: MedicalCondition['severity']) => {
    switch (severity) {
      case 'Mild':
        return 'text-green-600';
      case 'Moderate':
        return 'text-yellow-600';
      case 'Severe':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (conditions.length === 0) {
    return (
      <div className="animate-slide-up">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Medical History</h3>
          <p className="text-gray-500">Your medical history will appear here once updated by your healthcare provider.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="space-y-4">
        {conditions.map((condition, index) => (
          <div key={index} className="medimitra-card bg-white p-6 rounded-lg border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-800 mr-3">{condition.condition}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(condition.status)}`}>
                    {condition.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Diagnosed:</span>
                    <p className="font-medium text-gray-800">{condition.diagnosedDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Severity:</span>
                    <p className={`font-medium ${getSeverityColor(condition.severity)}`}>
                      {condition.severity}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="font-medium text-gray-800">{condition.status}</p>
                  </div>
                </div>
                {condition.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-600 text-sm">Notes:</span>
                    <p className="text-gray-800 text-sm mt-1">{condition.notes}</p>
                  </div>
                )}
              </div>
              <div className="ml-4">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add New Condition Button */}
      <div className="mt-6">
        <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Medical Condition
        </button>
      </div>
    </div>
  );
}